const { expect } = require('chai');
const { ethers } = require('hardhat');

// OLD: ethers.utils.parseUnits
const tokens = (n) => {
    return ethers.parseUnits(n.toString(), 'ether');
};


describe('Escrow', () => {
    let buyer, seller, inspector, lender;
    let realEstate, escrow;

    beforeEach(async() => {
        //setup accounts
        [buyer, seller, inspector, lender] = await ethers.getSigners();

        // console.log({
        //     buyer: buyer.address,
        //     seller: seller.address,
        //     inspector: inspector.address,
        //     lender: lender.address,
        // });
          

        //Deploy Real Estate
        const RealEstate = await ethers.getContractFactory('RealEstate')
        realEstate = await RealEstate.deploy();
        await realEstate.waitForDeployment();

        // console.log(realEstate.target)

        // mint
        let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmQVcpsjrA6cr1iJjZAodYwmPekYgbnXGo4DFubJiLc2EB/1.json");
        await transaction.wait();

        const Escrow = await ethers.getContractFactory('Escrow');
        escrow = await Escrow.deploy(
            realEstate.target,
            seller.address,
            inspector.address,
            lender.address,
        );
        await escrow.waitForDeployment();
        

        //Approve Property
        transaction = await realEstate.connect(seller).approve(escrow.target, 1);
        await transaction.wait();

        //List property
        transaction = await escrow.connect(seller).list(1, buyer.address, tokens(10), tokens(5));
        await transaction.wait();
    })

    describe("Deployment", () => {
        it('Returns NFT address', async() => {
            const result = await escrow.nftAddress();
            expect(result).to.be.equal(realEstate.target);
        })

        it('Returns seller', async() => {
            const result = await escrow.seller();
            expect(result).to.be.equal(seller.address);
        })
        
        it('Returns inspector', async() => {
            const result = await escrow.inspector();
            expect(result).to.be.equal(inspector.address);    
        })
        it('Returns lender', async() => {
            const result = await escrow.lender();
            expect(result).to.be.equal(lender.address);    
        })
    })


    describe("Listing", () => {
        it('Update as Listed', async() => {
            const result = await escrow.isListed(1);
            expect(result).to.be.equal(true);
        })

        it('Updates ownership', async() => {
            expect(await realEstate.ownerOf(1)).to.be.equal(escrow.target);
        })

        it('Returns Buyer', async() => {
            const result = await escrow.buyer(1);
            expect(result).to.be.equal(buyer.address);
        })

        it('Returns Purchase price', async() => {
            const result = await escrow.purchasePrice(1);
            expect(result).to.be.equal(tokens(10));
        })

        it('Returns Escrow amount', async() => {
            const result = await escrow.escrowAmount(1);
            expect(result).to.be.equal(tokens(5));
        })
    })

    describe("Deposits", () => {
        it('Updates contract balance', async() => {
            const transaction = await escrow.connect(buyer).depositEarnest(1, { value: tokens(5)});
            await transaction.wait();
            const result = await escrow.getBalance();
            expect(result).to.be.equal(tokens(5));
        })
    })

    describe("Inspection", () => {
        it('Updates inspection status', async() => {
            const transaction = await escrow.connect(inspector).updateInspectionStatus(1, true);
            await transaction.wait();
            const result = await escrow.inspectionPassed(1);
            expect(result).to.be.equal(true);
        })
    })

    describe("Approval", () => {
        it('Updates approval status', async() => {
            let transaction = await escrow.connect(lender).approveSale(1);
            await transaction.wait();

            transaction = await escrow.connect(buyer).approveSale(1);
            await transaction.wait();

            transaction = await escrow.connect(seller).approveSale(1);
            await transaction.wait();

            expect(await escrow.approval(1, lender.address)).to.be.equal(true);
            expect(await escrow.approval(1, buyer.address)).to.be.equal(true);
            expect(await escrow.approval(1, seller.address)).to.be.equal(true);
        })
    })

    describe('Sale', async() => {
        beforeEach(async() => {
            let transaction = await escrow.connect(buyer).depositEarnest(1, { value: tokens(5)});
            await transaction.wait();

            transaction = await escrow.connect(inspector).updateInspectionStatus(1, true);
            await transaction.wait();

            transaction = await escrow.connect(buyer).approveSale(1);
            await transaction.wait();

            transaction = await escrow.connect(seller).approveSale(1);
            await transaction.wait();

            transaction = await escrow.connect(lender).approveSale(1);
            await transaction.wait();

            await lender.sendTransaction({ to: escrow.target, value: tokens(5) });

            transaction = await escrow.connect(seller).finalizeSale(1);
            await transaction.wait();
        })

        it('Updates ownership', async() => {
            expect(await realEstate.ownerOf(1)).to.be.equal(buyer.address);
        })
        
        it('Updates balance', async() => {
            expect(await escrow.getBalance()).to.be.equal(0);
        })
    })

})

const hre = require("hardhat");
const { ethers } = hre; // This ensures Ethers v6 is used

const tokens = (n) => {
    return ethers.parseUnits(n.toString(), 'ether');
};

async function main() {
  const [buyer, seller, inspector, lender] = await ethers.getSigners();
    
  // Deploy RealEstate NFT contract
  const RealEstate = await ethers.getContractFactory("RealEstate");
  const realEstate = await RealEstate.deploy();
  await realEstate.waitForDeployment();
  console.log(`Deployed Realstate contract at: ${realEstate.target}`);

  console.log("Minting 3 properties...\n");
  for (let i = 0; i < 3; i++) {
    let transaction = await realEstate.connect(seller).mint(`https://ipfs.io/ipfs/QmQVcpsjrA6cr1iJjZAodYwmPekYgbnXGo4DFubJiLc2EB/${i + 1}.json`);
    await transaction.wait();
  }
  
  // Deploy Escrow contract
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(
    realEstate.target,
    seller.address,
    inspector.address,
    lender.address
  );
  await escrow.waitForDeployment();
  console.log(`Deployed Escrow contract at: ${escrow.target}`);

  for (let i = 0; i < 3; i++) {
    //Approve properties
    const transaction = await realEstate.connect(seller).approve(escrow.target, i + 1);
    await transaction.wait();
  }

  //Listing properties
  transaction = await escrow.connect(seller).list(1, buyer.address, tokens(20), tokens(10))
  await transaction.wait();

  transaction = await escrow.connect(seller).list(2, buyer.address, tokens(15), tokens(5))
  await transaction.wait();

  transaction = await escrow.connect(seller).list(3, buyer.address, tokens(10), tokens(5))
  await transaction.wait();

  console.log(`Finished`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

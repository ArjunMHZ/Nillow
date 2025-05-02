import { Contract, BrowserProvider, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import close from '../assets/close.svg';

interface Attribute {
  trait_type: string;
  value: string | number;
}

interface HomeType {
  id: number;
  name: string;
  image: string;
  description: string;
  address: string;
  attributes: Attribute[];
}

// interface HomeProps {
//   home: HomeType;
//   provider: BrowserProvider;
//   account: string | null;
//   escrow: Contract;
//   togglePop: () => void;
// }

const Home = ({ home, provider, account, escrow, togglePop }
    : {home: HomeType, provider: BrowserProvider | null, account: string | null, escrow: any, togglePop: () => void}) => {
    const [hasBought, setHasBought] = useState(false);
    const [hasInspected, setHasInspected] = useState(false);
    const [hasLended, setHasLended] = useState(false);
    const [hasSold, setHasSold] = useState(false);

    const [buyer, setBuyer] = useState(null);
    const [seller, setSeller] = useState(null);
    const [inspector, setInspector] = useState(null);
    const [lender, setLender] = useState(null);

    const [owner, setOwner] = useState<String | null>(null);

    const fetchDetails = async () => {
        //Buyer
        const buyer = await escrow.buyer(home.id);
        setBuyer(buyer);

        const hasBought = await escrow.approval(home.id, buyer);
        setHasBought(hasBought);

        const seller = await escrow.seller();
        setSeller(seller);

        const hasSold = await escrow.approval(home.id, seller);
        setHasSold(hasSold);

        const inspector = await escrow.inspector();
        setInspector(inspector);

        const hasInspected = await escrow.inspectionPassed(home.id);
        setHasInspected(hasInspected);

        const lender = await escrow.lender();
        setLender(lender);

        const hasLended = await escrow.approval(home.id, lender);
        setHasLended(hasLended);

    }

    const fetchOwner = async () => {
        if (await escrow.isListed(home.id)) return;

        const owner = await escrow.buyer(home.id);
        setOwner(owner);
    }

    const buyHandler = async() => {
        const escrowAmount = await escrow.escrowAmount(home.id);
        const signer = await provider?.getSigner()

        //Buyer deposit earnest
        let transaction = await escrow.connect(signer).depositEarnest(home.id, { value: escrowAmount})
        await transaction.wait()

        //Buyer approves
        transaction = await escrow.connect(signer).approveSale(home.id)
        await transaction.wait()

        setHasBought(true)
    }

    const inspectHandler = async() => {
        const signer = await provider?.getSigner();

        //Inspector updates status
        const transaction = await escrow.connect(signer).updateInspectionStatus(home.id, true);
        transaction.wait();

        setHasInspected(true);
    }

    const lendHandler = async() => {
        const signer = await provider?.getSigner();
        
        //Lender approves
        const transaction = await escrow.connect(signer).approveSale(home.id);
        await transaction.wait()

        //Lender sends funds to contract
        const lendAmount = (await escrow.purchasePrice(home.id) - await escrow.escrowAmount(home.id))
        await signer?.sendTransaction({ to: escrow.target, value:lendAmount.toString(), gasLimit: 60000})

        setHasLended(true);
    }

    const sellHandler = async() => {
        const signer = await provider?.getSigner()

        // Seller approves...
        let transaction = await escrow.connect(signer).approveSale(home.id)
        await transaction.wait()

        // Seller finalize...
        transaction = await escrow.connect(signer).finalizeSale(home.id)
        await transaction.wait()

        setHasSold(true)
    }


    useEffect(() => {
        fetchDetails()
        fetchOwner()
    }, [hasSold])

    // 
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative">
                <button 
                    onClick={togglePop}
                    className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
                >
                    <img src={close} alt="Close" className="w-5 h-5" />
                </button>

                <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
                    <img 
                        src={home.image} 
                        alt="Home" 
                        className="max-h-[70vh] w-auto object-contain rounded-lg"
                    />
                </div>

                <div className="md:w-1/2 p-6 overflow-y-auto">
                    <h1 className="text-3xl font-bold text-[#202020]">{home.name}</h1>
                    <p className="text-gray-600 mt-2">
                        <span className="font-semibold">{home.attributes[2].value}</span> bds |{' '}
                        <span className="font-semibold">{home.attributes[3].value}</span> ba |{' '}
                        <span className="font-semibold">{home.attributes[4].value}</span> sqft
                    </p>
                    <p className="text-gray-500 mt-1">{home.address}</p>

                    <h2 className="text-2xl font-bold text-[#6C63FF] mt-4">{home.attributes[0].value} ETH</h2>

                    {owner ? (
                        <div className="bg-[#4fb646] text-white px-4 py-3 rounded-md mt-6 text-center">
                            Owned by {owner.slice(0, 6)}...{owner.slice(38, 42)}
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-4 mt-6">
                            {(account === inspector) ? (
                                <button 
                                    className={`px-6 py-3 rounded-md font-semibold ${hasInspected ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#6C63FF] hover:bg-[#4c46b6] text-white'}`}
                                    onClick={inspectHandler} 
                                    disabled={hasInspected}
                                >
                                    Approve Inspection
                                </button>
                            ) : (account === lender) ? (
                                <button 
                                    className={`px-6 py-3 rounded-md font-semibold ${hasLended ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#6C63FF] hover:bg-[#4c46b6] text-white'}`}
                                    onClick={lendHandler} 
                                    disabled={hasLended}
                                >
                                    Approve & Lend
                                </button>
                            ) : (account === seller) ? (
                                <button 
                                    className={`px-6 py-3 rounded-md font-semibold ${hasSold ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#6C63FF] hover:bg-[#4c46b6] text-white'}`}
                                    onClick={sellHandler} 
                                    disabled={hasSold}
                                >
                                    Approve & Sell
                                </button>
                            ) : (
                                <button 
                                    className={`px-6 py-3 rounded-md font-semibold ${hasBought ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#6C63FF] hover:bg-[#4c46b6] text-white'}`}
                                    onClick={buyHandler} 
                                    disabled={hasBought}
                                >
                                    Buy
                                </button>
                            )}
                            <button className="px-6 py-3 rounded-md font-semibold border border-[#6C63FF] text-[#6C63FF] hover:bg-gray-50 transition-colors">
                                Contact agent
                            </button>
                        </div>
                    )}

                    <hr className="my-6 border-gray-200" />

                    <h2 className="text-xl font-bold text-[#202020]">Overview</h2>
                    <p className="text-gray-600 mt-2">{home.description}</p>

                    <hr className="my-6 border-gray-200" />

                    <h2 className="text-xl font-bold text-[#202020]">Facts and features</h2>
                    <ul className="mt-4 space-y-2">
                        {home.attributes.map((attribute: any, index: number) => (
                            <li key={index} className="text-gray-600">
                                <span className="font-semibold">{attribute.trait_type}</span>: {attribute.value}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;

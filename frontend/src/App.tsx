import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { BrowserProvider, Contract, getAddress } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Search from './components/Search';
import Home from './components/Home';

// ABIs
import RealEstate from './abis/RealEstate.json'
import Escrow from './abis/Escrow.json'

// Define the shape of each network configuration
interface NetworkConfig {
  realEstate: { address: string };
  escrow: { address: string };
}

// Define the config object structure, allowing string keys
interface Config {
  [key: string]: NetworkConfig; // Index signature allowing string-based keys
}
// Config
import rawConfig from './config.json';
import Footer from './components/Footer';
import HowItWorks from './components/HowItWorks';
import StatsSection from './components/StatsSection';
import Testimonials from './components/Testimonials';
import HomeCard from './components/HomeCard';
const config = rawConfig as Config;

// Types
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

declare global {
  interface Window {
    ethereum?: any;
  }
}


function App() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const [escrow, setEscrow] = useState<ethers.Contract | null>(null);
  const [homes, setHomes] = useState<HomeType[]>([]);
  const [home, setHome] = useState<HomeType>()
  const [toggle, setToggle] = useState(false);


  const loadBlockchainData = async () => {
    const provider = new BrowserProvider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    const networkId = Number(network.chainId); // Convert BigInt to number
    const networkIdString = networkId.toString(); // Convert networkId to string

    // Now you can safely index config with networkIdString, as it is a string
    const realEstate = new Contract(config[networkIdString].realEstate.address, RealEstate, provider);
    const totalSupply = await realEstate.totalSupply();

    const homes: HomeType[] = [];

    for (let i = 1; i <= totalSupply; i++) {
      const uri = await realEstate.tokenURI(i);
      const response = await fetch(uri);
      const metadata = await response.json();
      homes.push(metadata);
    }

    setHomes(homes);

    const escrow = new Contract(config[networkIdString].escrow.address, Escrow, provider);
    setEscrow(escrow);

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = getAddress(accounts[0]);
      setAccount(account);
    });
  };



  useEffect(() => {
    loadBlockchainData()
  }, [])

  const togglePop = (home: HomeType) => {
    setHome(home)
    toggle ? setToggle(false) : setToggle(true);
  }

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <Search />

      <main className="flex-grow">
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-dark mb-6">Homes For You</h3>
            <hr className="border-gray-200 mb-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {homes.map((home, index) => (
                <HomeCard
                  key={index}
                  home={home}
                  onClick={() => togglePop(home)}
                />
              ))}
            </div>
          </div>
        </section>

        <StatsSection />
        <HowItWorks />
        <Testimonials />
      </main>

      <Footer />

      {toggle && home && (
        <Home
          home={home}
          provider={provider}
          account={account}
          escrow={escrow}
          togglePop={() => togglePop(home)}
        />

      )}
    </div>
  );
}

export default App;

import { useState } from 'react';
import logo from '../assets/logo.svg';

const Navigation = ({ account, setAccount }: {account: string | null, setAccount: React.Dispatch<React.SetStateAction<string | null>>}) => {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
        setAccount(accounts[0]);
    }
    const[isMenuOpen,setIsMenuOpen] = useState(false);

    return (
<nav className="bg-white shadow-md py-4 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-700 hover:text-[#6C63FF] focus:outline-none"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Brand */}
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="Millow" className="h-12 w-auto" />
                    <h1 className="text-[#6C63FF] text-2xl md:text-3xl font-extrabold">Nillow</h1>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8">
                    <a href="#" className="text-[#202020] hover:text-[#6C63FF] font-medium transition-colors">Buy</a>
                    <a href="#" className="text-[#202020] hover:text-[#6C63FF] font-medium transition-colors">Rent</a>
                    <a href="#" className="text-[#202020] hover:text-[#6C63FF] font-medium transition-colors">Sell</a>
                </div>

                {/* Connect Button */}
                <div className="hidden md:block">
                    {account ? (
                        <button
                            className="bg-[#6C63FF] hover:bg-[#4c46b6] text-white font-semibold py-2 px-4 rounded-md transition-colors"
                        >
                            {`${account.slice(0, 6)}...${account.slice(38, 42)}`}
                        </button>
                    ) : (
                        <button
                            onClick={connectHandler}
                            className="bg-[#6C63FF] hover:bg-[#4c46b6] text-white font-semibold py-2 px-4 rounded-md transition-colors"
                        >
                            Connect
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white py-4 space-y-4">
                    <a href="#" className="block px-4 py-2 text-[#202020] hover:text-[#6C63FF]">Buy</a>
                    <a href="#" className="block px-4 py-2 text-[#202020] hover:text-[#6C63FF]">Rent</a>
                    <a href="#" className="block px-4 py-2 text-[#202020] hover:text-[#6C63FF]">Sell</a>
                    {account ? (
                        <button className="w-full bg-[#6C63FF] text-white font-semibold py-2 px-4 rounded-md">
                            {`${account.slice(0, 6)}...${account.slice(38, 42)}`}
                        </button>
                    ) : (
                        <button
                            onClick={connectHandler}
                            className="w-full bg-[#6C63FF] text-white font-semibold py-2 px-4 rounded-md"
                        >
                            Connect
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navigation;

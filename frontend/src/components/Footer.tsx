const Footer = () => {
    return (
        <footer className="bg-[#202020] text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Millow</h3>
                        <p className="text-gray-300">Decentralized real estate marketplace powered by blockchain technology.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Buy Properties</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sell Properties</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Rentals</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Smart Contract Docs</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-300">support@millow.com</li>
                            <li className="text-gray-300">+1 (555) 123-4567</li>
                            <li className="text-gray-300">123 Blockchain Ave, Crypto City</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} Millow. All rights reserved. Powered by Ethereum.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
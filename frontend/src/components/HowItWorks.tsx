const HowItWorks = () => {
    const steps = [
        {
            title: 'Connect Wallet',
            description: 'Connect your Ethereum wallet to start browsing properties.',
            icon: '🔗',
        },
        {
            title: 'Browse Properties',
            description: 'Explore our decentralized marketplace of verified properties.',
            icon: '🏠',
        },
        {
            title: 'Secure Transaction',
            description: 'Complete your purchase through our smart contract escrow.',
            icon: '🔒',
        },
        {
            title: 'Own Your Property',
            description: 'Receive your property NFT and ownership rights instantly.',
            icon: '🎉',
        },
    ];

    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-[#202020] mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="text-4xl mb-4">{step.icon}</div>
                            <h3 className="text-xl font-semibold text-[#202020] mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
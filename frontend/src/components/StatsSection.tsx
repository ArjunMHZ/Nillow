const StatsSection = () => {
    const stats = [
        { value: '10,000+', label: 'Properties Listed' },
        { value: '5,000+', label: 'Happy Customers' },
        { value: '100%', label: 'Secure Transactions' },
        { value: '24/7', label: 'Customer Support' },
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-[#202020] mb-12">Why Choose Millow?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-110 hover:ring-2 hover:ring-[#4fb646]">
                            <p className="text-4xl font-bold text-[#6C63FF]">{stat.value}</p>
                            <p className="mt-2 text-gray-600">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
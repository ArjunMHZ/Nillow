const Testimonials = () => {
    const testimonials = [
        {
            quote: "Millow made buying my first home with crypto seamless and secure. The smart contract escrow gave me peace of mind throughout the process.",
            name: "Alex Johnson",
            role: "Home Buyer",
        },
        {
            quote: "As a real estate agent, I appreciate how Millow simplifies the transaction process while maintaining all the necessary legal protections.",
            name: "Sarah Williams",
            role: "Real Estate Agent",
        },
        {
            quote: "The transparency of blockchain transactions through Millow has revolutionized how we manage property sales in our agency.",
            name: "Michael Chen",
            role: "Property Developer",
        },
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-[#202020] mb-12">What Our Clients Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                            <p className="font-semibold text-[#202020]">{testimonial.name}</p>
                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
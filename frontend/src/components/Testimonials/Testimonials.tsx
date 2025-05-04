import "./Testimonials.css"; 

const Testimonials = () => {
    const testimonials = [
        {
            quote: "Nillow made buying my first home with crypto seamless and secure. The smart contract escrow gave me peace of mind throughout the process.",
            name: "Alex Johnson",
            role: "Home Buyer",
        },
        {
            quote: "As a real estate agent, I appreciate how Nillow simplifies the transaction process while maintaining all the necessary legal protections.",
            name: "Sarah Williams",
            role: "Real Estate Agent",
        },
        {
            quote: "The transparency of blockchain transactions through Nillow has revolutionized how we manage property sales in our agency.",
            name: "Michael Chen",
            role: "Property Developer",
        },
    ];

    // Duplicate the array for infinite effect
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="py-12 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-[#202020] mb-12">What Our Clients Say</h2>
                <div className="testimonial-marquee">
                    <div className="testimonial-track">
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                                <p className="font-semibold text-[#202020]">{testimonial.name}</p>
                                <p className="text-gray-500 text-sm">{testimonial.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

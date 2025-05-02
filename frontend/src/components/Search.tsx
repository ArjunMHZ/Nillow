import housesImg from '../assets/houses.png';

const Search = () => {
    return (
        <header className="relative bg-cover bg-center h-96" style={{ backgroundImage: `url(${housesImg})` }}>
            <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center px-4">
                <h2 className="text-white text-2xl md:text-4xl font-bold text-center mb-8">
                    Search it. Explore it. Buy it.
                </h2>
                <input
                    type="text"
                    className="w-full max-w-2xl py-4 px-6 rounded-lg shadow-lg focus:outline-none bg-white focus:ring-2 focus:ring-[#6C63FF]"
                    placeholder="Enter an address, neighborhood, city, or ZIP code"
                />
            </div>
        </header>
    );
};

export default Search;
const HomeCard = ({ home, onClick }: { home: any, onClick: () => void }) => {
    return (
        <div 
            className="w-full max-w-sm bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            onClick={onClick}
        >
            <div className="relative h-48 w-full overflow-hidden">
                <img 
                    src={home.image} 
                    alt="Home" 
                    className="absolute h-full w-full object-cover"
                />
            </div>
            <div className="p-4">
                <h4 className="text-xl font-bold text-[#202020]">{home.attributes[0].value} ETH</h4>
                <p className="text-gray-600 mt-2">
                    <span className="font-semibold">{home.attributes[2].value}</span> bds |{' '}
                    <span className="font-semibold">{home.attributes[3].value}</span> ba |{' '}
                    <span className="font-semibold">{home.attributes[4].value}</span> sqft
                </p>
                <p className="text-gray-500 mt-1">{home.address}</p>
            </div>
        </div>
    );
};

export default HomeCard;
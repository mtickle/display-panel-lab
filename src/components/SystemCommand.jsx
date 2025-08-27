const SystemCommand = () => {
    return (
        <div className="space-y-2 text-sm">
            <p>TEMP: <span className="text-yellow-400">98.6 C</span></p>
            <p>PRESSURE: <span className="text-white">101.3 kPa</span></p>
            <p>POWER DRAW: <span className="text-white">1.21 GW</span></p>
            <div className="flex items-center gap-2">
                <span>SHIELDS:</span>
                <div className="w-full bg-gray-700 h-4 border border-green-600">
                    <div className="bg-green-500 h-full" style={{ width: '88%' }}></div>
                </div>
                <span className="text-white">88%</span>
            </div>
        </div>
    );
};

export default SystemCommand;
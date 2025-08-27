import { useEffect, useState } from 'react';

const CoreStatus = () => {

    // --- NEW: State for shield level ---
    const [shieldLevel, setShieldLevel] = useState(68);
    const [temp, setTemp] = useState(98.6);
    const [pressure, setPressure] = useState(101.3);
    const [powerDraw, setPowerDraw] = useState(1.21);

    // --- NEW: Effect to randomly change shield level ---
    useEffect(() => {
        const interval = setInterval(() => {
            setShieldLevel(prevLevel => {
                // Calculate a random change, e.g., between -2 and 2
                const change = (Math.random() * 4) - 2;
                let newLevel = prevLevel + change;

                // Clamp the value between 0 and 100
                if (newLevel > 100) newLevel = 100;
                if (newLevel < 0) newLevel = 0;

                return newLevel;
            });
        }, 200); // Update every half second

        return () => clearInterval(interval);
    }, []); // Run only once on mount

    useEffect(() => {
        const interval = setInterval(() => {
            // Update Shields
            setShieldLevel(prev => {
                const change = (Math.random() * 4) - 2;
                let newLevel = prev + change;
                return Math.max(0, Math.min(100, newLevel)); // Clamp between 0-100
            });

            // Update Temp
            setTemp(prev => {
                const change = (Math.random() * 0.4) - 0.2;
                return prev + change;
            });

            // Update Pressure
            setPressure(prev => {
                const change = (Math.random() * 0.2) - 0.1;
                return prev + change;
            });

            // Update Power Draw
            setPowerDraw(prev => {
                const change = (Math.random() * 0.02) - 0.01;
                return prev + change;
            });

        }, 200); // Update every 200ms

        return () => clearInterval(interval);
    }, []); // Run only once on mount

    // --- NEW: Helper function to get shield color class ---
    const getShieldColorClass = (level) => {
        if (level < 20) return 'bg-red-500';
        if (level < 80) return 'bg-yellow-400';
        return 'bg-green-500';
    };


    return (
        <div className="space-y-2 text-sm">
            <p>TEMP: <span className="text-yellow-400">{temp.toFixed(1)} C</span></p>
            <p>PRESSURE: <span className="text-white">{pressure.toFixed(1)} kPa</span></p>
            <p>POWER DRAW: <span className="text-white">{powerDraw.toFixed(2)} GW</span></p>
            <div className="flex items-center gap-2">
                <span>SHIELDS:</span>
                <div className="w-full bg-gray-700 h-4 border border-green-600">
                    {/* --- UPDATED: Dynamic width and color --- */}
                    <div
                        className={`h-full transition-all duration-300 ${getShieldColorClass(shieldLevel)}`}
                        style={{ width: `${shieldLevel}%` }}>
                    </div>
                </div>
                {/* --- UPDATED: Dynamic percentage text --- */}
                <span className="text-white w-10 text-right">{Math.round(shieldLevel)}%</span>
            </div>
        </div>
    );
};

export default CoreStatus;
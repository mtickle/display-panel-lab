import { useEffect, useRef, useState } from 'react';

// The function now returns an object with the text and an alert status
const generateRandomLine = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const lineLength = Math.floor(Math.random() * 40) + 20;
    let text = `>_ ::${Date.now().toString(16).toUpperCase()}:: `;
    for (let i = 0; i < lineLength; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Decide if this line is an alert. Math.random() < 0.05 gives it a 5% chance.
    const isAlert = Math.random() < 0.05;
    return { text, isAlert };
};

const ScrollingText = () => {
    const [lines, setLines] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const newLine = generateRandomLine();
            setLines(prevLines => [...prevLines, newLine].slice(-100));
        }, 150);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <div ref={containerRef} className="h-full overflow-y-hidden bg-black/30 p-2 font-mono text-xs text-green-400">
            {lines.map((line, index) => (
                // Conditionally apply a red color and a pulse animation for alerts
                <p
                    key={index}
                    className={`whitespace-nowrap ${line.isAlert ? 'text-red-500 animate-pulse' : ''}`}
                >
                    {line.text}
                </p>
            ))}
        </div>
    );
};

export default ScrollingText;
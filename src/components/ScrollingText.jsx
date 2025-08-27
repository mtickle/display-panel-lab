// Scrolling Text Component
import { useEffect, useRef, useState } from 'react';

const generateRandomLine = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const lineLength = Math.floor(Math.random() * 40) + 20;
    let line = `> ${Date.now().toString(16).toUpperCase()}: `;
    for (let i = 0; i < lineLength; i++) {
        line += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return line;
};

const ScrollingText = () => {
    const [lines, setLines] = useState([]);
    const containerRef = useRef(null);

    // Effect to add new lines periodically
    useEffect(() => {
        const interval = setInterval(() => {
            // Add a new line to the end of the array, keeping the last 100 lines for performance
            setLines(prevLines => [...prevLines, generateRandomLine()].slice(-100));
        }, 150);

        return () => clearInterval(interval);
    }, []);

    // Effect to scroll to the bottom when new lines are added
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        // The overflow is hidden, but the component will scroll programmatically
        <div ref={containerRef} className="h-full overflow-y-hidden bg-black/30 p-2 font-mono text-xs text-green-400">
            {lines.map((line, index) => (
                <p key={index} className="whitespace-nowrap">{line}</p>
            ))}
        </div>
    );
};


export default ScrollingText;
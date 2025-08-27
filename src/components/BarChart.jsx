import { useEffect, useRef } from 'react';
const BarChart = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let frame = 0;

        const resizeCanvas = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        };

        const animate = () => {
            frame++;
            resizeCanvas();
            const width = canvas.width;
            const height = canvas.height;

            ctx.clearRect(0, 0, width, height);

            const numBars = 20;
            const barWidth = width / numBars;

            for (let i = 0; i < numBars; i++) {
                // Use a sine wave to calculate the height of each bar, creating a pulsating effect
                const barHeight = (Math.sin(frame * 0.05 + i * 0.5) + 1) / 2 * height;
                const x = i * barWidth;
                const y = height - barHeight;
                const currentBarWidth = barWidth - 2; // Maintain spacing

                // Cycle the color of the bars using HSL
                const hue = (frame + i * 10) % 360;
                const color = `hsl(${hue}, 100%, 50%)`;

                // --- UPDATED DRAWING LOGIC ---

                // Set styles for both the outline and the tip
                ctx.strokeStyle = color;
                ctx.fillStyle = color;
                ctx.shadowColor = color;
                ctx.shadowBlur = 10;
                ctx.lineWidth = 2;

                // 1. Draw the hollow outline of the bar
                if (barHeight > 1) { // Avoid drawing a line at the bottom for zero-height bars
                    ctx.strokeRect(x, y, currentBarWidth, barHeight);
                }

                // 2. Draw the solid tip on top
                const tipHeight = 5;
                if (barHeight > tipHeight) {
                    ctx.fillRect(x, y, currentBarWidth, tipHeight);
                }
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        animate();

        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};


export default BarChart;
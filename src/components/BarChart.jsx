import { useEffect, useRef } from 'react';

const BarChart = () => {
    const canvasRef = useRef(null);
    const speedRef = useRef(0.05);
    const targetSpeedRef = useRef(0.05);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let frame = 0;

        const speedChangeInterval = setInterval(() => {
            targetSpeedRef.current = Math.random() * 0.08 + 0.01;
        }, 3000);

        const resizeCanvas = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        };

        const animate = () => {
            // --- COLOR TWEAKING CONTROLS ---
            // Adjust these values to change the color intensity and brightness
            const saturation = 50; // Percentage (0-100). Lower is less vibrant.
            const lightness = 40;  // Percentage (0-100). 50 is normal, lower is darker.
            // ------------------------------------

            speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.01;

            frame++;
            resizeCanvas();
            const width = canvas.width;
            const height = canvas.height;

            ctx.clearRect(0, 0, width, height);

            const numBars = 20;
            const barWidth = width / numBars;

            for (let i = 0; i < numBars; i++) {
                const barHeight = (Math.sin(frame * speedRef.current + i * 0.5) + 1) / 2 * height;
                const x = i * barWidth;
                const y = height - barHeight;
                const currentBarWidth = barWidth - 12;

                const hue = (frame + i * 10) % 360;
                // Use the new saturation and lightness variables here
                const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

                ctx.strokeStyle = color;
                ctx.fillStyle = color;
                ctx.shadowColor = color;
                ctx.shadowBlur = 10;
                ctx.lineWidth = 2;

                if (barHeight > 1) {
                    ctx.strokeRect(x, y, currentBarWidth, barHeight);
                }

                const tipHeight = 5;
                if (barHeight > tipHeight) {
                    ctx.fillRect(x, y, currentBarWidth, tipHeight);
                }
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            clearInterval(speedChangeInterval);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default BarChart;
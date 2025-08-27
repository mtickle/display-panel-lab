import { useEffect, useRef } from 'react';

const LineChart = () => {
    const canvasRef = useRef(null);
    const dataRef = useRef(Array(50).fill(0).map(() => Math.random()));
    // Ref to hold the current hue value for the color cycle
    const hueRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let frameId;

        const resizeCanvas = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        };

        const draw = () => {
            resizeCanvas();
            const width = canvas.width;
            const height = canvas.height;

            // Increment the hue to cycle through colors. The modulo operator (%) keeps it within 0-360
            hueRef.current = (hueRef.current + 1) % 360;
            const currentColor = `hsl(${hueRef.current}, 100%, 50%)`;

            // Update data
            dataRef.current.shift();
            dataRef.current.push(Math.random());

            ctx.clearRect(0, 0, width, height);

            // Draw grid with a subtle green
            ctx.strokeStyle = 'rgba(0, 255, 0, 0.2)';
            ctx.lineWidth = 0.5;
            ctx.shadowBlur = 0; // No shadow for the grid
            for (let i = 0; i < 10; i++) {
                ctx.beginPath();
                ctx.moveTo(0, (i / 10) * height);
                ctx.lineTo(width, (i / 10) * height);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo((i / 10) * width, 0);
                ctx.lineTo((i / 10) * width, height);
                ctx.stroke();
            }

            // Draw chart line with the new animated color
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 15;
            ctx.shadowColor = currentColor;
            ctx.beginPath();
            dataRef.current.forEach((value, index) => {
                const x = (index / (dataRef.current.length - 1)) * width;
                const y = height - value * height;
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.stroke();

            frameId = setTimeout(() => requestAnimationFrame(draw), 100);
        };

        window.addEventListener('resize', resizeCanvas);
        draw();

        return () => {
            clearTimeout(frameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};


export default LineChart;
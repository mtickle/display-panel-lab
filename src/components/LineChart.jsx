import { useEffect, useRef } from 'react';

const LineChart = () => {
    const canvasRef = useRef(null);
    const dataRef = useRef(Array(50).fill(0.5));
    const hueRef = useRef(0);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let frameCounter = 0;

        const resizeCanvas = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        };

        const animate = () => {
            // --- TWEAK THIS VALUE ---
            // Controls how strongly the line is pulled back to the middle.
            // Higher value = stronger pull. 0.05 is a good starting point.
            const reversionFactor = 0.05;
            // -------------------------

            frameCounter++;
            resizeCanvas();
            const width = canvas.width;
            const height = canvas.height;

            hueRef.current = (hueRef.current + 0.5) % 360;
            const currentColor = `hsl(${hueRef.current}, 100%, 50%)`;

            if (frameCounter % 4 === 0) {
                dataRef.current.shift();
                const lastValue = dataRef.current[dataRef.current.length - 1] || 0.5;

                // --- UPDATED: Mean Reversion Logic ---
                // 1. The random up/down movement
                const randomStep = (Math.random() - 0.5) * 0.2;
                // 2. The "pull" back to the center (0.5)
                const correctionStep = (0.5 - lastValue) * reversionFactor;

                let newValue = lastValue + randomStep + correctionStep;

                newValue = Math.max(0, Math.min(1, newValue)); // Clamp between 0 and 1
                dataRef.current.push(newValue);
            }

            ctx.clearRect(0, 0, width, height);

            // Draw grid
            ctx.strokeStyle = 'rgba(0, 255, 0, 0.2)';
            ctx.lineWidth = 0.5;
            ctx.shadowBlur = 0;
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

            // Draw chart line
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

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default LineChart;
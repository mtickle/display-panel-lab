import { useEffect, useRef } from 'react';
const SineWave = () => {
    const canvasRef = useRef(null);
    // Refs to manage the current and target amplitude for smooth transitions
    const currentAmplitude = useRef(50);
    const targetAmplitude = useRef(50);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let frame = 0;

        // Periodically set a new target amplitude
        const amplitudeInterval = setInterval(() => {
            if (!canvas.parentElement) return;
            // Target a random amplitude between 20% and 80% of the canvas height
            targetAmplitude.current = (Math.random() * 0.6 + 0.2) * (canvas.parentElement.clientHeight / 2);
        }, 2000); // Change amplitude every 2 seconds

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

            // Smoothly move the current amplitude towards the target amplitude
            currentAmplitude.current += (targetAmplitude.current - currentAmplitude.current) * 0.05;

            ctx.clearRect(0, 0, width, height);

            // --- NEW: Draw background grid/crosshairs ---
            ctx.strokeStyle = 'rgba(0, 255, 0, 0.2)';
            ctx.lineWidth = 0.5;
            ctx.shadowBlur = 0; // No glow for the grid

            // Draw horizontal and vertical grid lines
            const gridSize = 30;
            for (let x = gridSize; x < width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = gridSize; y < height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Draw center crosshairs
            ctx.strokeStyle = 'rgba(0, 255, 0, 0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(width / 2, 0);
            ctx.lineTo(width / 2, height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, height / 2);
            ctx.lineTo(width, height / 2);
            ctx.stroke();
            // --- End of new background code ---

            // Restore styles for the main sine wave
            ctx.strokeStyle = '#800080';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 0;
            ctx.shadowColor = '#E6E6FA';

            // Draw the sine wave on top of the grid
            ctx.beginPath();
            for (let x = 0; x < width; x++) {
                // Use the smoothly changing currentAmplitude for the wave's height
                const y = height / 2 + Math.sin(x * 0.05 + frame * 0.1) * currentAmplitude.current;
                ctx.lineTo(x, y);
            }
            ctx.stroke();

            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            clearInterval(amplitudeInterval);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default SineWave;
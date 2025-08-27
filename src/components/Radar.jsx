import React, { useEffect, useRef } from 'react';

const SonarRadar = () => {
    // This is now a standard JavaScript ref
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        let size = Math.min(window.innerWidth, window.innerHeight) * 0.9;
        canvas.width = size;
        canvas.height = size;

        let angle = 0;
        const blips = [];
        let animationFrameId;

        // --- Configuration ---
        const SWEEP_SPEED = 0.015;
        const NUM_RINGS = 5;
        const BLIP_CHANCE = 0.015;
        const BLIP_DURATION = 200;

        const resizeHandler = () => {
            size = Math.min(window.innerWidth, window.innerHeight) * 0.9;
            canvas.width = size;
            canvas.height = size;
        };

        window.addEventListener('resize', resizeHandler);

        class Blip {
            constructor() {
                this.angle = Math.random() * 2 * Math.PI;
                this.distance = Math.random() * (size / 2) * 0.95;
                this.life = BLIP_DURATION;
                this.size = Math.random() * 3 + 2;
                this.coordText = `AZ:${(this.angle * 180 / Math.PI).toFixed(1)} R:${(this.distance).toFixed(0)}`;
            }

            update() {
                this.life--;
            }

            draw(centerX, centerY) {
                const x = centerX + this.distance * Math.cos(this.angle);
                const y = centerY + this.distance * Math.sin(this.angle);
                const opacity = this.life / BLIP_DURATION;

                ctx.beginPath();
                ctx.arc(x, y, this.size, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(127, 255, 0, ${opacity})`;
                ctx.shadowColor = `rgba(127, 255, 0, 1)`;
                ctx.shadowBlur = 10;
                ctx.fill();

                ctx.font = '10px "Courier New", Courier, monospace';
                ctx.fillStyle = `rgba(127, 255, 0, ${opacity * 0.8})`;
                ctx.shadowBlur = 0;
                ctx.fillText(this.coordText, x + 8, y + 4);
            }
        }

        function drawGrid() {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = size / 2;

            ctx.strokeStyle = 'rgba(0, 255, 0, 0.2)';
            ctx.fillStyle = 'rgba(0, 255, 0, 0.4)';
            ctx.lineWidth = 1;
            ctx.shadowBlur = 0;
            ctx.font = '10px "Courier New", Courier, monospace';

            for (let i = 1; i <= NUM_RINGS; i++) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, (radius / NUM_RINGS) * i, 0, 2 * Math.PI);
                ctx.stroke();
            }

            const numLines = 12;
            for (let i = 0; i < numLines; i++) {
                const rad = (i * 2 * Math.PI) / numLines;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(centerX + radius * Math.cos(rad), centerY + radius * Math.sin(rad));
                ctx.stroke();

                const text = `${i * 30}°`;
                const textX = centerX + (radius + 15) * Math.cos(rad);
                const textY = centerY + (radius + 15) * Math.sin(rad);
                ctx.save();
                ctx.translate(textX, textY);
                ctx.rotate(rad + Math.PI / 2);
                ctx.textAlign = 'center';
                ctx.fillText(text, 0, 0);
                ctx.restore();
            }
        }

        function drawSweep() {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = size / 2;

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle);

            const sweepGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            sweepGradient.addColorStop(0, 'rgba(0, 255, 0, 0)');
            sweepGradient.addColorStop(1, 'rgba(0, 255, 0, 0.4)');

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI / 12, false);
            ctx.closePath();

            ctx.fillStyle = sweepGradient;
            ctx.fill();

            ctx.restore();
        }

        const animate = () => {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            ctx.fillStyle = 'rgba(0, 20, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawGrid();

            if (Math.random() < BLIP_CHANCE) {
                blips.push(new Blip());
            }

            for (let i = blips.length - 1; i >= 0; i--) {
                blips[i].update();
                blips[i].draw(centerX, centerY);
                if (blips[i].life <= 0) {
                    blips.splice(i, 1);
                }
            }

            drawSweep();

            angle = (angle + SWEEP_SPEED) % (2 * Math.PI);

            animationFrameId = window.requestAnimationFrame(animate);
        };

        animate();

        // Cleanup function to stop animation and remove event listener
        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeHandler);
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className= "m-0 overflow-hidden bg-black flex justify-center items-center min-h-screen" >
        <canvas 
                ref={ canvasRef }
    className = "bg-[#001a00] rounded-full shadow-[0_0_35px_5px_rgba(0,255,0,0.3)]"
        />
        </div>
    );
};

// You would then export this component to use in your main App
export default SonarRadar;


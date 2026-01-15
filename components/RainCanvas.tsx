import React, { useRef, useEffect, useState } from 'react';
import { RainDrop } from '../types';

interface RainCanvasProps {
  isThundering: boolean;
}

const RainCanvas: React.FC<RainCanvasProps> = ({ isThundering }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  // Lightning visual state
  const lightningOpacityRef = useRef(0);
  const lightningBoltRef = useRef<{ x: number, points: number[][] } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Thunder Trigger
  useEffect(() => {
    if (isThundering) {
      lightningOpacityRef.current = 1.0; // Max brightness
      
      // Generate a random lightning bolt path
      const startX = Math.random() * windowSize.width;
      const points: number[][] = [];
      let currentX = startX;
      let currentY = 0;
      
      while(currentY < windowSize.height) {
        points.push([currentX, currentY]);
        currentY += Math.random() * 50 + 20;
        currentX += (Math.random() - 0.5) * 80; // Zigzag
      }
      lightningBoltRef.current = { x: startX, points };

    }
  }, [isThundering, windowSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize raindrops
    const dropCount = Math.floor((windowSize.width * windowSize.height) / 3000); // Density
    const drops: RainDrop[] = [];

    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 10 + 15,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animationFrameId: number;

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, windowSize.width, windowSize.height);

      // Handle Lightning Flash Fade logic
      if (lightningOpacityRef.current > 0) {
        // Draw Flash Background
        ctx.fillStyle = `rgba(255, 255, 255, ${lightningOpacityRef.current * 0.3})`;
        ctx.fillRect(0, 0, windowSize.width, windowSize.height);

        // Draw Lightning Bolt if opaque enough
        if (lightningOpacityRef.current > 0.5 && lightningBoltRef.current) {
             ctx.beginPath();
             ctx.strokeStyle = `rgba(255, 255, 255, ${lightningOpacityRef.current})`;
             ctx.lineWidth = 3;
             ctx.moveTo(lightningBoltRef.current.points[0][0], lightningBoltRef.current.points[0][1]);
             
             for(let i = 1; i < lightningBoltRef.current.points.length; i++) {
               ctx.lineTo(lightningBoltRef.current.points[i][0], lightningBoltRef.current.points[i][1]);
             }
             ctx.shadowBlur = 15;
             ctx.shadowColor = "white";
             ctx.stroke();
             ctx.shadowBlur = 0; // Reset
        }

        // Decay opacity
        lightningOpacityRef.current -= 0.05;
        if (lightningOpacityRef.current < 0) lightningOpacityRef.current = 0;
      }

      // Draw Raindrops
      ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      drops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.globalAlpha = drop.opacity;
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Update position
        drop.y += drop.speed;
        
        // Reset if off screen
        if (drop.y > windowSize.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * windowSize.width;
          drop.speed = Math.random() * 10 + 15;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [windowSize]);

  return (
    <canvas
      ref={canvasRef}
      width={windowSize.width}
      height={windowSize.height}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default RainCanvas;

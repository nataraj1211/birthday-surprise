import React, { useEffect, useRef } from 'react';
import type { ParticleType } from '../../types/birthday';

interface Props {
  particleType?: ParticleType;
  colors?: string[];
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
  type: string;
}

export const ThemeParticleCanvas: React.FC<Props> = ({
  particleType = 'sakura',
  colors = ['#ffb7c5', '#ff69b4', '#e6e6fa', '#ffffff'],
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      if (!canvas) return;
      const count = window.innerWidth < 768 ? 24 : 45;
      particles = [];

      for (let i = 0; i < count; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)] || '#ffb7c5';
        const isUpward = particleType === 'sunset' || particleType === 'bubbles' || particleType === 'gold';

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (particleType === 'butterflies' ? 10 : 8) + 4,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: isUpward ? -(Math.random() * 0.8 + 0.3) : Math.random() * 0.8 + 0.3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          opacity: Math.random() * 0.6 + 0.3,
          color,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.03 + 0.01,
          type: particleType,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const drawPetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size, -p.size * 1.5, -p.size * 1.5, p.size * 0.5, 0, p.size * 1.8);
      ctx.bezierCurveTo(p.size * 1.5, p.size * 0.5, p.size, -p.size * 1.5, 0, 0);
      ctx.fill();
      ctx.restore();
    };

    const drawStar = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.abs(Math.sin(p.wobble)) * p.opacity;

      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          Math.cos(((18 + i * 72) * Math.PI) / 180) * p.size,
          -Math.sin(((18 + i * 72) * Math.PI) / 180) * p.size
        );
        ctx.lineTo(
          Math.cos(((54 + i * 72) * Math.PI) / 180) * (p.size / 2),
          -Math.sin(((54 + i * 72) * Math.PI) / 180) * (p.size / 2)
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawBubble = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.strokeStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.stroke();

      // Highlight spot
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-p.size * 0.3, -p.size * 0.3, p.size * 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawButterfly = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;

      const wingScale = Math.sin(p.wobble) * 0.5 + 0.7;

      // Left Wing
      ctx.beginPath();
      ctx.ellipse(-p.size * 0.6 * wingScale, -p.size * 0.3, p.size * 0.6 * wingScale, p.size * 0.4, -0.4, 0, Math.PI * 2);
      ctx.fill();

      // Right Wing
      ctx.beginPath();
      ctx.ellipse(p.size * 0.6 * wingScale, -p.size * 0.3, p.size * 0.6 * wingScale, p.size * 0.4, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawCircle = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        p.rotation += p.rotationSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.5;
        p.y += p.speedY;

        // Wrap around screen bounds
        if (p.speedY > 0 && p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        } else if (p.speedY < 0 && p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }

        if (p.x > canvas.width + 20) p.x = -20;
        if (p.x < -20) p.x = canvas.width + 20;

        switch (p.type) {
          case 'sakura':
          case 'roses':
          case 'leaves':
            drawPetal(p);
            break;
          case 'stars':
          case 'fireworks':
            drawStar(p);
            break;
          case 'bubbles':
            drawBubble(p);
            break;
          case 'butterflies':
            drawButterfly(p);
            break;
          default:
            drawCircle(p);
            break;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleType, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};

import React, { useState, useEffect, useCallback } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeartItem {
  id: number;
  x: number; // percentage from left (0 - 100)
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  drift: number; // px horizontal drift
  opacity: number;
  symbol: string;
  color: string;
}

interface Props {
  className?: string;
  autoSpawn?: boolean;
  spawnIntervalMs?: number;
  interactiveButton?: boolean;
  buttonLabel?: string;
}

const HEART_SYMBOLS = ['❤️', '💖', '💝', '💕', '💗', '💓', '🌹'];
const RED_COLORS = ['#ef4444', '#dc2626', '#b91c1c', '#f43f5e', '#e11d48', '#ff4d6d'];

export const FloatingRedHearts: React.FC<Props> = ({
  className = '',
  autoSpawn = true,
  spawnIntervalMs = 900,
  interactiveButton = false,
  buttonLabel = 'Send Red Hearts ❤️',
}) => {
  const [hearts, setHearts] = useState<FloatingHeartItem[]>([]);

  const createHeart = useCallback((customX?: number, customSize?: number): FloatingHeartItem => {
    return {
      id: Date.now() + Math.random(),
      x: customX !== undefined ? customX : Math.random() * 90 + 5,
      size: customSize || Math.floor(Math.random() * 20) + 18,
      duration: Math.random() * 3 + 3.5, // 3.5s - 6.5s
      delay: Math.random() * 0.2,
      drift: (Math.random() - 0.5) * 80,
      opacity: Math.random() * 0.4 + 0.6,
      symbol: HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)],
      color: RED_COLORS[Math.floor(Math.random() * RED_COLORS.length)],
    };
  }, []);

  // Auto spawn hearts
  useEffect(() => {
    if (!autoSpawn) return;

    // Initial batch
    const initialBatch: FloatingHeartItem[] = Array.from({ length: 4 }, () => createHeart());
    setHearts(initialBatch);

    const interval = setInterval(() => {
      setHearts((prev) => {
        const next = [...prev, createHeart()];
        // Keep max 25 active hearts to preserve performance
        if (next.length > 25) {
          return next.slice(next.length - 25);
        }
        return next;
      });
    }, spawnIntervalMs);

    return () => clearInterval(interval);
  }, [autoSpawn, spawnIntervalMs, createHeart]);

  // Handle burst on user interaction
  const triggerHeartBurst = (e?: React.MouseEvent) => {
    const burstHearts: FloatingHeartItem[] = [];
    const clientX = e ? (e.clientX / window.innerWidth) * 100 : 50;

    for (let i = 0; i < 8; i++) {
      const offsetX = Math.max(5, Math.min(95, clientX + (Math.random() - 0.5) * 30));
      burstHearts.push(createHeart(offsetX, Math.floor(Math.random() * 24) + 20));
    }

    setHearts((prev) => [...prev, ...burstHearts]);
  };

  const removeHeart = (id: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <>
      {/* Floating Canvas Layer */}
      <div className={`fixed inset-0 pointer-events-none z-20 overflow-hidden ${className}`}>
        {hearts.map((heart) => (
          <div
            key={heart.id}
            onAnimationEnd={() => removeHeart(heart.id)}
            className="absolute bottom-0 select-none animate-float-heart"
            style={{
              left: `${heart.x}%`,
              fontSize: `${heart.size}px`,
              opacity: heart.opacity,
              animationDuration: `${heart.duration}s`,
              animationDelay: `${heart.delay}s`,
              filter: `drop-shadow(0 0 10px ${heart.color}88)`,
              ['--drift-x' as string]: `${heart.drift}px`,
            }}
          >
            {heart.symbol}
          </div>
        ))}
      </div>

      {/* Optional Interactive Button */}
      {interactiveButton && (
        <button
          type="button"
          onClick={triggerHeartBurst}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer select-none"
        >
          <Heart className="w-4 h-4 fill-white animate-pulse" />
          <span>{buttonLabel}</span>
        </button>
      )}
    </>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, RotateCcw, PackageOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { ThemeConfig, WishCard, ExperienceType } from '../../types/birthday';
import { getExperienceConfig } from '../../config/experienceConfig';

interface Props {
  theme: ThemeConfig;
  experienceType?: ExperienceType;
  customCards?: WishCard[];
}

export const WishCardsGrid: React.FC<Props> = ({ theme, experienceType, customCards }) => {
  const [openedWishes, setOpenedWishes] = useState<Record<string, boolean>>({});

  const defaultCards = experienceType
    ? getExperienceConfig(experienceType).wishCards
    : [
        {
          id: '1',
          title: 'Boundless Happiness 💖',
          subtitle: 'Joy in every single day',
          emoji: '😊',
          message: 'May your days be filled with endless smiles, pure laughter, and comforting moments.',
          gradient: `linear-gradient(135deg, ${theme.colors.primary}18, ${theme.colors.secondary}18)`,
        },
        {
          id: '2',
          title: 'Soaring Success 🌟',
          subtitle: 'Conquer every milestone',
          emoji: '🏆',
          message: 'May every project, passion, and endeavor you touch bloom into grand achievement.',
          gradient: `linear-gradient(135deg, ${theme.colors.secondary}18, ${theme.colors.accent}18)`,
        },
        {
          id: '3',
          title: 'Beautiful Memories ✨',
          subtitle: 'Stories worth remembering',
          emoji: '📸',
          message: 'May this new year bring unforgettable adventures and heartwarming friendship moments.',
          gradient: `linear-gradient(135deg, ${theme.colors.accent}18, ${theme.colors.primary}18)`,
        },
        {
          id: '4',
          title: 'Magic & Dreams 🔮',
          subtitle: 'Believe in your sparkle',
          emoji: '✨',
          message: 'May all your secret wishes come true and your path be guided by luck and grace.',
          gradient: `linear-gradient(135deg, ${theme.colors.primary}18, ${theme.colors.accent}18)`,
        },
      ];

  const cards = customCards && customCards.length > 0 ? customCards : defaultCards;

  const handleOpen = (id: string, e?: React.MouseEvent) => {
    if (openedWishes[id]) return;

    const origin = e
      ? {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        }
      : { x: 0.5, y: 0.6 };

    confetti({
      particleCount: 45,
      spread: 60,
      origin,
      colors: theme.confettiColors,
    });

    setOpenedWishes((prev) => ({ ...prev, [id]: true }));
  };

  const handleOpenAll = () => {
    const all: Record<string, boolean> = {};
    cards.forEach((c) => (all[c.id] = true));
    setOpenedWishes(all);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: theme.confettiColors,
    });
  };

  const handleReset = () => {
    setOpenedWishes({});
  };

  const openedCount = Object.values(openedWishes).filter(Boolean).length;

  return (
    <section className="py-8 sm:py-12 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <div className="text-center space-y-2">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider border"
            style={{
              background: theme.colors.surface,
              color: theme.colors.primary,
              borderColor: theme.colors.border,
            }}
          >
            <Gift className="w-3.5 h-3.5" /> Birthday Wishes ({openedCount}/4 Opened)
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold" style={{ color: theme.colors.text }}>
            Four Wishes For You 🎁
          </h2>
          <p className="text-xs sm:text-sm font-semibold opacity-75">
            Click on each wrapped gift to unwrap and discover your blessing!
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
          {cards.map((card) => {
            const isOpen = !!openedWishes[card.id];

            return (
              <div key={card.id} className="min-h-[140px] sm:min-h-[160px]">
                <AnimatePresence mode="wait">
                  {!isOpen ? (
                    <motion.div
                      key={`closed_${card.id}`}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => handleOpen(card.id, e)}
                      className="h-full p-5 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-xl border-2 border-dashed shadow-md sm:shadow-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group"
                      style={{
                        background: `linear-gradient(135deg, ${theme.colors.cardBg}, ${theme.colors.surface})`,
                        borderColor: theme.colors.primary,
                        boxShadow: `0 10px 30px ${theme.colors.glow}`,
                      }}
                    >
                      {/* Ribbon */}
                      <div
                        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 opacity-25 group-hover:opacity-40 transition-opacity"
                        style={{ background: theme.colors.primary }}
                      />
                      <div
                        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 opacity-25 group-hover:opacity-40 transition-opacity"
                        style={{ background: theme.colors.primary }}
                      />

                      <div className="relative z-10 space-y-2 flex flex-col items-center">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all"
                          style={{ background: theme.colors.buttonBg }}
                        >
                          <Gift className="w-6 h-6 animate-bounce" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-wider text-pink-600">
                          Gift Box #{card.id} (Tap to Open)
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`open_${card.id}`}
                      initial={{ scale: 0.85, opacity: 0, rotateY: 90 }}
                      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                      className="h-full p-6 rounded-3xl backdrop-blur-xl border shadow-xl space-y-3"
                      style={{
                        background: card.gradient,
                        borderColor: theme.colors.border,
                        boxShadow: `0 10px 30px ${theme.colors.glow}`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{card.emoji}</span>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/40 backdrop-blur-md flex items-center gap-1">
                          <PackageOpen className="w-3 h-3 text-pink-500" /> Wish #{card.id}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: theme.colors.text }}>
                        {card.title}
                      </h3>
                      <p className="text-xs font-bold opacity-80" style={{ color: theme.colors.primary }}>
                        {card.subtitle}
                      </p>
                      <p className="text-sm font-medium opacity-85 leading-relaxed">
                        {card.message}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          {openedCount < 4 ? (
            <button
              type="button"
              onClick={handleOpenAll}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-xl hover:scale-105 transition-all cursor-pointer"
              style={{ background: theme.colors.buttonBg }}
            >
              <Gift className="w-4 h-4" /> Unwrap All Wishes 🎁
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold bg-white text-slate-700 shadow-md hover:bg-slate-50 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Wrap Again 🔄
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

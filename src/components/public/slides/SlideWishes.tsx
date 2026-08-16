import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift, RotateCcw, PackageOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { ThemeConfig, WishCard, ExperienceType } from '../../../types/birthday';
import { getExperienceConfig } from '../../../config/experienceConfig';

interface Props {
  theme: ThemeConfig;
  experienceType?: ExperienceType;
  customCards?: WishCard[];
}

export const SlideWishes: React.FC<Props> = ({ theme, experienceType, customCards }) => {
  const [openedWishes, setOpenedWishes] = useState<Record<string, boolean>>({});

  const defaultCards = experienceType
    ? getExperienceConfig(experienceType).wishCards
    : [
        {
          id: '1',
          title: 'Boundless Happiness 💖',
          subtitle: 'Joy in every single day',
          emoji: '😊',
          message: 'May your days be filled with endless smiles, pure laughter, comforting warm hugs, and moments that make your soul dance with delight.',
          gradient: `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.secondary}20)`,
        },
        {
          id: '2',
          title: 'Soaring Success 🌟',
          subtitle: 'Conquer every milestone',
          emoji: '🏆',
          message: 'May every dream, passion project, and endeavor you touch bloom into grand achievement and open doors to amazing opportunities.',
          gradient: `linear-gradient(135deg, ${theme.colors.secondary}20, ${theme.colors.accent}20)`,
        },
        {
          id: '3',
          title: 'Beautiful Memories ✨',
          subtitle: 'Stories worth remembering',
          emoji: '📸',
          message: 'May this upcoming year bring thrilling adventures, peaceful mornings, lifelong friendships, and memories you will cherish forever.',
          gradient: `linear-gradient(135deg, ${theme.colors.accent}20, ${theme.colors.primary}20)`,
        },
        {
          id: '4',
          title: 'Magic & Dreams 🔮',
          subtitle: 'Believe in your sparkle',
          emoji: '✨',
          message: 'May all your secret wishes whispered to the stars come true and your path always be illuminated by good luck and unconditional love.',
          gradient: `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.accent}20)`,
        },
      ];

  const cards = customCards && customCards.length > 0 ? customCards : defaultCards;

  const triggerSingleConfetti = (e?: React.MouseEvent) => {
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
  };

  const handleOpenWish = (id: string, e?: React.MouseEvent) => {
    if (openedWishes[id]) return;

    triggerSingleConfetti(e);
    setOpenedWishes((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const handleOpenAll = () => {
    const allOpened: Record<string, boolean> = {};
    cards.forEach((c) => {
      allOpened[c.id] = true;
    });
    setOpenedWishes(allOpened);

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
    <div className="flex flex-col items-center justify-center min-h-[58vh] sm:min-h-[65vh] text-center px-3 sm:px-4 py-3 max-w-3xl mx-auto select-none space-y-4">
      {/* Title */}
      <div className="space-y-1">
        <span
          className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border shadow-sm backdrop-blur-md"
          style={{
            background: theme.colors.surface,
            color: theme.colors.primary,
            borderColor: theme.colors.border,
          }}
        >
          <Gift className="w-3.5 h-3.5 text-pink-500" /> Birthday Blessings ({openedCount}/4 Unwrapped)
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold" style={{ color: theme.colors.text }}>
          Four Wishes Just For You 🎁
        </h2>
        <p className="text-xs sm:text-sm font-semibold opacity-80">
          Tap each wrapped gift box to unwrap and reveal your secret birthday blessing!
        </p>
      </div>

      {/* Grid of 4 Wrapped / Unwrapped Gift Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
        {cards.map((card) => {
          const isOpen = !!openedWishes[card.id];

          return (
            <div key={card.id} className="relative min-h-[140px] sm:min-h-[155px]">
              <AnimatePresence mode="wait">
                {!isOpen ? (
                  /* WRAPPED GIFT BOX STATE */
                  <motion.div
                    key={`closed_${card.id}`}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => handleOpenWish(card.id, e)}
                    className="h-full p-5 rounded-3xl backdrop-blur-xl border-2 border-dashed shadow-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.cardBg}, ${theme.colors.surface})`,
                      borderColor: theme.colors.primary,
                      boxShadow: `0 10px 30px ${theme.colors.glow}`,
                    }}
                  >
                    {/* Ribbon Cross Lines */}
                    <div
                      className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 opacity-25 group-hover:opacity-40 transition-opacity"
                      style={{ background: theme.colors.primary }}
                    />
                    <div
                      className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 opacity-25 group-hover:opacity-40 transition-opacity"
                      style={{ background: theme.colors.primary }}
                    />

                    {/* Glowing Gift Icon & Badge */}
                    <div className="relative z-10 space-y-2 flex flex-col items-center">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all"
                        style={{ background: theme.colors.buttonBg }}
                      >
                        <Gift className="w-6 h-6 animate-bounce" />
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-[11px] font-black uppercase tracking-wider text-pink-600 dark:text-pink-400 block">
                          Gift Box #{card.id}
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1">
                          <span>Tap to Unwrap</span>
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* UNWRAPPED REVEALED WISH CARD STATE */
                  <motion.div
                    key={`open_${card.id}`}
                    initial={{ scale: 0.85, opacity: 0, rotateY: 90 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                    className="h-full p-4 sm:p-5 rounded-3xl backdrop-blur-xl border shadow-xl space-y-2 text-left transition-all"
                    style={{
                      background: card.gradient,
                      borderColor: theme.colors.border,
                      boxShadow: `0 15px 35px ${theme.colors.glow}`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl sm:text-3xl">{card.emoji}</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-md flex items-center gap-1">
                        <PackageOpen className="w-3 h-3 text-pink-500" /> Wish #{card.id}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold" style={{ color: theme.colors.text }}>
                        {card.title}
                      </h3>
                      <p className="text-xs font-bold" style={{ color: theme.colors.primary }}>
                        {card.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm font-medium opacity-90 leading-relaxed pt-1">
                      {card.message}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Helper Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
        {openedCount < 4 ? (
          <button
            type="button"
            onClick={handleOpenAll}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            style={{ background: theme.colors.buttonBg }}
          >
            <Gift className="w-4 h-4" /> Unwrap All Wishes 🎁
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-white/80 hover:bg-white text-slate-700 shadow-sm border border-slate-200 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Wrap Wishes Again 🔄
          </button>
        )}
      </div>

      <p className="text-xs font-semibold opacity-70 flex items-center justify-center gap-1">
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
        Every wish was sent with endless good vibes & warmth
      </p>
    </div>
  );
};

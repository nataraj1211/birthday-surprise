import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ChevronLeft, ChevronRight, Bookmark, Calendar, ArrowRight } from 'lucide-react';
import type { StoryItem, ThemeConfig } from '../../../types/birthday';

interface Props {
  stories: StoryItem[];
  theme: ThemeConfig;
}

export const SlideStory: React.FC<Props> = ({ stories, theme }) => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  if (!stories || stories.length === 0) {
    return null;
  }

  const currentStory = stories[activeStoryIdx] || stories[0];

  const handleNext = () => {
    setDirection(1);
    setActiveStoryIdx((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveStoryIdx((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const goToChapter = (idx: number) => {
    setDirection(idx > activeStoryIdx ? 1 : -1);
    setActiveStoryIdx(idx);
  };

  // Touch Swipe for mobile inside Story
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  // Motion variants for chapter slide transitions
  const chapterVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.94,
      rotateY: dir > 0 ? 8 : -8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 26 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.94,
      rotateY: dir > 0 ? -8 : 8,
      transition: {
        x: { type: 'spring' as const, stiffness: 280, damping: 26 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[58vh] sm:min-h-[65vh] text-center px-3 sm:px-4 py-3 max-w-xl mx-auto select-none space-y-4"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Title & Badge */}
      <div className="space-y-1">
        <span
          className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border shadow-sm backdrop-blur-md"
          style={{
            background: theme.colors.surface,
            color: theme.colors.primary,
            borderColor: theme.colors.border,
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" />
          <span>Our Beautiful Journey ({activeStoryIdx + 1}/{stories.length})</span>
        </span>

        <h2 className="text-2xl sm:text-4xl font-black tracking-tight" style={{ color: theme.colors.text }}>
          Our Beautiful Journey 🌸
        </h2>
      </div>

      {/* Chapter Progress Track / Milestone Bar */}
      <div className="w-full flex items-center justify-between gap-1.5 px-2 py-1">
        {stories.map((s, idx) => {
          const isCompleted = idx < activeStoryIdx;
          const isCurrent = idx === activeStoryIdx;

          return (
            <button
              key={s.id || idx}
              onClick={() => goToChapter(idx)}
              className="flex-1 group cursor-pointer relative py-1"
              title={`Chapter ${idx + 1}: ${s.title}`}
            >
              <div className="h-2 rounded-full overflow-hidden bg-black/10 dark:bg-white/20 transition-all">
                <div
                  className={`h-full rounded-full transition-all duration-400 ${
                    isCompleted
                      ? 'w-full'
                      : isCurrent
                      ? 'w-full animate-pulse'
                      : 'w-0'
                  }`}
                  style={{
                    background:
                      isCompleted || isCurrent
                        ? theme.colors.primary
                        : 'transparent',
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Animated Story Milestone Card Container */}
      <div className="relative w-full overflow-hidden py-1">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeStoryIdx}
            custom={direction}
            variants={chapterVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full p-6 sm:p-8 rounded-3xl backdrop-blur-xl border shadow-2xl space-y-4 text-left relative overflow-hidden"
            style={{
              background: theme.colors.cardBg,
              borderColor: theme.colors.border,
              boxShadow: `0 20px 50px ${theme.colors.glow}`,
            }}
          >
            {/* Top Node Header */}
            <div className="flex items-center justify-between border-b border-slate-200/40 pb-3">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-md"
                style={{ background: theme.colors.buttonBg }}
              >
                <Bookmark className="w-3.5 h-3.5" /> Chapter {activeStoryIdx + 1}
              </span>

              {currentStory.date && (
                <span className="flex items-center gap-1 text-xs font-bold opacity-70" style={{ color: theme.colors.text }}>
                  <Calendar className="w-3 h-3 text-pink-500" />
                  {currentStory.date}
                </span>
              )}

              <div className="flex items-center gap-1 text-rose-500">
                <Heart className="w-4 h-4 fill-current animate-pulse" />
              </div>
            </div>

            {/* Main Story Content */}
            <div className="space-y-2 py-1">
              <h3 className="text-xl sm:text-2xl font-black leading-tight" style={{ color: theme.colors.text }}>
                {currentStory.title}
              </h3>

              {currentStory.subtitle && (
                <p className="text-xs sm:text-sm font-black uppercase tracking-wider" style={{ color: theme.colors.primary }}>
                  {currentStory.subtitle}
                </p>
              )}

              <div className="min-h-[85px] sm:min-h-[105px] flex items-center">
                <p className="text-sm sm:text-base font-medium opacity-90 leading-relaxed">
                  {currentStory.description}
                </p>
              </div>
            </div>

            {/* Stepper Controls */}
            {stories.length > 1 && (
              <div className="flex items-center justify-between pt-3 border-t border-slate-200/40">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/80 hover:bg-white text-slate-800 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer border border-pink-100"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev Chapter
                </button>

                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {stories.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goToChapter(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === activeStoryIdx
                          ? 'w-6 bg-pink-500 shadow-sm'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to chapter ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  style={{ background: theme.colors.buttonBg }}
                >
                  <span>Next Chapter</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="text-xs font-semibold opacity-70 flex items-center justify-center gap-1.5">
        <ArrowRight className="w-3 h-3 text-pink-500 animate-pulse" />
        Swipe or tap next to continue walking through the journey
      </p>
    </div>
  );
};

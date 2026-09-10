import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  LayoutGrid,
  Layers,
  Sparkles,
} from 'lucide-react';
import type { BirthdayData, ThemeConfig } from '../../types/birthday';
import { SlideHero } from './slides/SlideHero';
import { SlideCountdown } from './slides/SlideCountdown';
import { SlideMemories } from './slides/SlideMemories';
import { SlideStory } from './slides/SlideStory';
import { SlideLetter } from './slides/SlideLetter';
import { SlideWishes } from './slides/SlideWishes';
import { SlideSurpriseFinale } from './slides/SlideSurpriseFinale';

// Also import standard scroll views for optional Scroll Mode
import { BirthdayHero } from './BirthdayHero';
import { LiveCountdown } from './LiveCountdown';
import { MemoryGallery } from './MemoryGallery';
import { StoryTimelineView } from './StoryTimelineView';
import { BirthdayLetterView } from './BirthdayLetterView';
import { WishCardsGrid } from './WishCardsGrid';
import { SurpriseButton } from './SurpriseButton';
import { FinalScreen } from './FinalScreen';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayCurtain?: () => void;
}

export const BirthdaySlideViewer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayCurtain,
}) => {
  // Slide indices configuration
  interface SlideConfig {
    id: string;
    title: string;
    icon: string;
  }

  const slides: SlideConfig[] = useMemo(
    () => [
      { id: 'hero', title: 'Happy Birthday', icon: '🎂' },
      { id: 'countdown', title: 'Countdown', icon: '⏰' },
      ...(birthday.memory_image_urls && birthday.memory_image_urls.length > 0
        ? [{ id: 'memories', title: 'Memories', icon: '📸' }]
        : []),
      ...(birthday.story_data && birthday.story_data.length > 0
        ? [{ id: 'story', title: 'Our Story', icon: '🌸' }]
        : []),
      ...(birthday.birthday_message
        ? [{ id: 'letter', title: 'Letter', icon: '💌' }]
        : []),
      { id: 'wishes', title: 'Wishes', icon: '✨' },
      { id: 'finale', title: 'Grand Finale', icon: '🎁' },
    ],
    [birthday.memory_image_urls, birthday.story_data, birthday.birthday_message]
  );

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [viewMode, setViewMode] = useState<'slides' | 'scroll'>('slides');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const totalSlides = slides.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSlides) return;
      setDirection(index > currentSlideIndex ? 1 : -1);
      setCurrentSlideIndex(index);
    },
    [currentSlideIndex, totalSlides]
  );

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      setDirection(1);
      setCurrentSlideIndex((prev) => prev + 1);
    } else {
      setIsAutoplay(false);
    }
  }, [currentSlideIndex, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex((prev) => prev - 1);
    }
  }, [currentSlideIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (viewMode !== 'slides') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, nextSlide, prevSlide]);

  // Autoplay timer
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isAutoplay && viewMode === 'slides') {
      const isMemoriesSlide = slides[currentSlideIndex]?.id === 'memories';
      const slideDuration = isMemoriesSlide
        ? Math.max(8000, (birthday.memory_image_urls?.length || 1) * 3200)
        : 7000;

      autoplayTimerRef.current = setTimeout(() => {
        if (currentSlideIndex < totalSlides - 1) {
          nextSlide();
        } else {
          setIsAutoplay(false);
        }
      }, slideDuration);
    }

    return () => {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    };
  }, [isAutoplay, currentSlideIndex, totalSlides, viewMode, nextSlide, slides, birthday.memory_image_urls]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  // Slide Animation Variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const currentSlide = slides[currentSlideIndex];

  // Render Scroll Mode if user toggles view
  if (viewMode === 'scroll') {
    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-24 px-4">
        {/* Switch back to slide mode banner */}
        <div className="sticky top-4 z-40 flex justify-center">
          <button
            onClick={() => setViewMode('slides')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-2xl backdrop-blur-xl border border-white/30 hover:scale-105 transition-all cursor-pointer"
            style={{
              background: theme.colors.buttonBg,
              boxShadow: `0 10px 30px ${theme.colors.glow}`,
            }}
          >
            <Layers className="w-4 h-4" /> Switch to Interactive Slide Mode ✨
          </button>
        </div>

        <BirthdayHero birthday={birthday} theme={theme} />
        <LiveCountdown targetDate={birthday.birthday_date} theme={theme} />
        {birthday.memory_image_urls?.length > 0 && (
          <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
        )}
        {birthday.story_data?.length > 0 && (
          <StoryTimelineView stories={birthday.story_data} theme={theme} />
        )}
        {birthday.birthday_message && (
          <BirthdayLetterView
            message={birthday.birthday_message}
            senderName={birthday.sender_name}
            theme={theme}
          />
        )}
        <WishCardsGrid theme={theme} experienceType={birthday.experience_type} />
        <SurpriseButton name={birthday.name} theme={theme} />
        <FinalScreen
          birthday={birthday}
          theme={theme}
          onReplay={() => {
            setViewMode('slides');
            setCurrentSlideIndex(0);
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="relative flex flex-col justify-between min-h-[88vh] sm:min-h-[92vh] max-w-4xl mx-auto px-3 sm:px-6 pt-2 pb-24 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. TOP STORY PROGRESS BAR (Instagram/Story Style) */}
      <div className="sticky top-2 z-30 pt-1 pb-3 space-y-2 max-w-2xl mx-auto w-full">
        {/* Segmented Bars */}
        <div className="flex items-center gap-1.5 w-full px-1">
          {slides.map((s, idx) => {
            const isCompleted = idx < currentSlideIndex;
            const isCurrent = idx === currentSlideIndex;

            return (
              <button
                key={s.id}
                onClick={() => goToSlide(idx)}
                className="flex-1 h-1.5 sm:h-2 rounded-full overflow-hidden transition-all bg-black/15 dark:bg-white/20 cursor-pointer relative group"
                title={`${idx + 1}. ${s.title}`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
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
              </button>
            );
          })}
        </div>

        {/* Current slide indicator pill + view toggle */}
        <div className="flex items-center justify-between px-1 sm:px-2 text-xs font-bold gap-1.5">
          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <span
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider backdrop-blur-md border shadow-sm truncate"
              style={{
                background: theme.colors.surface,
                color: theme.colors.primary,
                borderColor: theme.colors.border,
              }}
            >
              <span className="flex-shrink-0">{currentSlide.icon}</span>
              <span className="truncate hidden sm:inline">
                Slide {currentSlideIndex + 1} of {totalSlides}: {currentSlide.title}
              </span>
              <span className="truncate sm:hidden">
                {currentSlideIndex + 1}/{totalSlides}: {currentSlide.title}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            {/* Auto Play Toggle */}
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold border transition-all cursor-pointer ${
                isAutoplay
                  ? 'bg-pink-500 text-white border-pink-400 shadow-sm'
                  : 'bg-white/70 hover:bg-white text-slate-700 border-slate-200/80'
              }`}
              title={isAutoplay ? 'Pause auto-play' : 'Start auto-play slideshow'}
            >
              {isAutoplay ? (
                <>
                  <Pause className="w-3 h-3 fill-current" />
                  <span className="hidden xs:inline">Playing</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span className="hidden xs:inline">Play</span>
                </>
              )}
            </button>

            {/* View Mode Toggle */}
            <button
              onClick={() => setViewMode('scroll')}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-white/70 hover:bg-white text-slate-700 border border-slate-200/80 transition-all cursor-pointer"
              title="View all as continuous page"
            >
              <LayoutGrid className="w-3 h-3 text-pink-500" />
              <span className="hidden sm:inline">Scroll View</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN SLIDE CONTENT CONTAINER WITH DIRECTIONAL ANIMATIONS */}
      <div className="relative flex-1 flex items-center justify-center my-auto overflow-hidden min-h-[58vh] sm:min-h-[66vh] py-2">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentSlideIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex items-center justify-center"
          >
            {currentSlide.id === 'hero' && (
              <SlideHero
                birthday={birthday}
                theme={theme}
                onNext={nextSlide}
              />
            )}

            {currentSlide.id === 'countdown' && (
              <SlideCountdown
                targetDate={birthday.birthday_date}
                theme={theme}
                name={birthday.name}
              />
            )}

            {currentSlide.id === 'memories' && (
              <SlideMemories
                images={birthday.memory_image_urls}
                theme={theme}
              />
            )}

            {currentSlide.id === 'story' && (
              <SlideStory
                stories={birthday.story_data}
                theme={theme}
              />
            )}

            {currentSlide.id === 'letter' && (
              <SlideLetter
                message={birthday.birthday_message}
                senderName={birthday.sender_name}
                theme={theme}
              />
            )}

            {currentSlide.id === 'wishes' && (
              <SlideWishes theme={theme} experienceType={birthday.experience_type} />
            )}

            {currentSlide.id === 'finale' && (
              <SlideSurpriseFinale
                birthday={birthday}
                theme={theme}
                onReplaySlides={() => goToSlide(0)}
                onReplayAll={onReplayCurtain}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. BOTTOM FLOATING NAVIGATION BAR */}
      <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-md pb-safe">
        <div
          className="p-1.5 sm:p-2.5 rounded-full backdrop-blur-2xl border shadow-2xl flex items-center justify-between"
          style={{
            background: theme.colors.surface,
            borderColor: theme.colors.border,
            boxShadow: `0 15px 40px ${theme.colors.glow}`,
          }}
        >
          {/* Prev Slide Button */}
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className={`flex items-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              currentSlideIndex === 0
                ? 'opacity-30 cursor-not-allowed text-slate-400'
                : 'bg-white/80 hover:bg-white text-slate-800 shadow-sm hover:scale-105 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Dots / Jump Indicators */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentSlideIndex
                    ? 'w-5 sm:w-6 bg-pink-500 shadow-sm'
                    : 'w-1.5 sm:w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next Slide Button */}
          {currentSlideIndex < totalSlides - 1 ? (
            <button
              onClick={nextSlide}
              className="flex items-center gap-1.5 px-5 py-2 sm:py-2.5 rounded-full text-xs font-black text-white shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                background: theme.colors.buttonBg,
                boxShadow: `0 6px 20px ${theme.colors.glow}`,
              }}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => goToSlide(0)}
              className="flex items-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-full text-xs font-black text-white shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                background: theme.colors.buttonBg,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Replay</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, RotateCcw, Heart, Share2, Star } from 'lucide-react';
import type { BirthdayData, ThemeConfig } from '../../../types/birthday';
import { FloatingRedHearts } from '../../common/FloatingRedHearts';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplaySlides?: () => void;
  onReplayAll?: () => void;
}

export const SlideSurpriseFinale: React.FC<Props> = ({
  birthday,
  theme,
  onReplaySlides,
  onReplayAll,
}) => {
  const [hasOpenedSurprise, setHasOpenedSurprise] = useState(false);
  const [heartBurstCount, setHeartBurstCount] = useState(0);

  const triggerConfettiCannons = () => {
    setHasOpenedSurprise(true);
    setHeartBurstCount((c) => c + 1);

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: theme.confettiColors,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Happy Birthday ${birthday.name}! 🎂💕`,
          text: `Check out this special birthday surprise made for ${birthday.name}!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Surprise link copied to clipboard! 📋');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[58vh] sm:min-h-[65vh] text-center px-4 py-4 max-w-xl mx-auto select-none space-y-6">
      {/* Floating Red Hearts when revealed */}
      {hasOpenedSurprise && (
        <FloatingRedHearts autoSpawn={true} spawnIntervalMs={900} key={heartBurstCount} />
      )}

      {/* Title */}
      <div className="space-y-1 relative z-10">
        <span
          className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border shadow-sm backdrop-blur-md"
          style={{
            background: theme.colors.surface,
            color: theme.colors.primary,
            borderColor: theme.colors.border,
          }}
        >
          <Sparkles className="w-3.5 h-3.5" /> Grand Celebration
        </span>
        <h2
          className="text-3xl sm:text-5xl font-black tracking-tight"
          style={{ color: theme.colors.text }}
        >
          Happy Birthday, {birthday.name}! 🎂💖
        </h2>
      </div>

      {/* Surprise Gift Box or Revealed Card */}
      {!hasOpenedSurprise ? (
        <div
          className="w-full p-8 rounded-3xl backdrop-blur-xl border shadow-2xl space-y-5 animate-in zoom-in-95 duration-500 relative z-10"
          style={{
            background: theme.colors.cardBg,
            borderColor: theme.colors.border,
            boxShadow: `0 20px 50px ${theme.colors.glow}`,
          }}
        >
          <p className="text-sm sm:text-base font-semibold opacity-90">
            One final magical surprise is waiting for you...
          </p>

          <button
            type="button"
            onClick={triggerConfettiCannons}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-black text-white shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
            style={{
              background: theme.colors.buttonBg,
              boxShadow: `0 15px 40px ${theme.colors.glow}`,
            }}
          >
            <Gift className="w-6 h-6 animate-bounce" />
            <span>Open Secret Surprise 🎁</span>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      ) : (
        <div
          className="w-full p-6 sm:p-8 rounded-3xl backdrop-blur-xl border shadow-2xl space-y-4 animate-in zoom-in-95 duration-500 relative z-10"
          style={{
            background: theme.colors.cardBg,
            borderColor: theme.colors.border,
            boxShadow: `0 25px 60px ${theme.colors.glow}`,
          }}
        >
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-pink-100 text-pink-500 animate-pulse">
            <Star className="w-8 h-8 fill-current" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold" style={{ color: theme.colors.primary }}>
              You Are Truly One in a Million ✨
            </h3>
            <p className="text-sm sm:text-base font-bold opacity-90 leading-relaxed max-w-md mx-auto">
              "May your days ahead be glowing with health, boundless joy, big dreams, and all the happiness in the universe."
            </p>
          </div>

          {/* Sender sign */}
          <div className="pt-2">
            <span className="block text-[11px] font-bold uppercase tracking-wider opacity-60">Forever by your side,</span>
            <span className="text-xl font-bold font-serif" style={{ color: theme.colors.text }}>
              {birthday.sender_name} 💕
            </span>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={triggerConfettiCannons}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white uppercase tracking-wider shadow-md transition-transform hover:scale-105 cursor-pointer"
              style={{ background: theme.colors.buttonBg }}
            >
              🎉 Confetti Blast
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-800 border border-slate-200 shadow-md hover:bg-slate-50 transition-transform hover:scale-105 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-pink-500" /> Share Surprise
            </button>
          </div>
        </div>
      )}

      {/* Replay Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 relative z-10">
        {onReplaySlides && (
          <button
            type="button"
            onClick={onReplaySlides}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 hover:bg-white text-slate-800 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Replay Slides 🎬
          </button>
        )}
        {onReplayAll && (
          <button
            type="button"
            onClick={onReplayAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 hover:bg-white text-slate-800 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" /> Open From Intro 🎁
          </button>
        )}
      </div>
    </div>
  );
};

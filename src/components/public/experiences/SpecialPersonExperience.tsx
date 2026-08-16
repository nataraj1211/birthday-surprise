import React, { useState } from 'react';
import { Sparkles, Moon, Star, Lock, Unlock, Share2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../types/birthday';
import { LiveCountdown } from '../LiveCountdown';
import { MemoryGallery } from '../MemoryGallery';
import { StoryTimelineView } from '../StoryTimelineView';
import { BirthdayLetterView } from '../BirthdayLetterView';
import { WishCardsGrid } from '../WishCardsGrid';
import { getExperienceConfig } from '../../../config/experienceConfig';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

export const SpecialPersonExperience: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const config = getExperienceConfig('specialPerson');
  const [revealedClues, setRevealedClues] = useState<Record<string, boolean>>({});
  const [finaleRevealed, setFinaleRevealed] = useState(false);

  const toggleClue = (id: string) => {
    setRevealedClues((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const triggerCinematicReveal = () => {
    setFinaleRevealed(true);

    const count = 160;
    const defaults = { origin: { y: 0.65 }, colors: ['#fbbf24', '#f59e0b', '#38bdf8', '#c084fc', '#ffffff'] };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Happy Birthday to someone special, ${birthday.name}! ✨🌌`,
        text: `A cinematic mystery birthday story for ${birthday.name}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Mystery surprise link copied to clipboard! 📋✨');
    }
  };

  return (
    <div className="space-y-16 pb-24 max-w-4xl mx-auto px-4 text-slate-100">
      {/* 1. CINEMATIC MYSTERY HERO */}
      <section className="relative pt-10 pb-8 text-center overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 text-amber-300 font-extrabold text-xs uppercase tracking-widest shadow-xl mb-6 border border-amber-500/40 backdrop-blur-md">
          <Moon className="w-4 h-4 text-amber-400" />
          <span>A CINEMATIC MESSAGE FROM THE STARS</span>
        </div>

        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="relative inline-block">
            <div
              className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 mx-auto relative shadow-2xl transition-transform duration-700 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #1e1b4b, #4c1d95, #d97706)',
                boxShadow: '0 25px 60px rgba(217, 119, 6, 0.35)',
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-amber-300/80 shadow-inner bg-slate-950">
                <img
                  src={birthday.profile_image_url}
                  alt={birthday.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="absolute top-2 -left-3 text-amber-400">
              <Star className="w-7 h-7 fill-amber-400 animate-pulse" />
            </div>
            <div className="absolute bottom-2 -right-3 text-purple-400">
              <Sparkles className="w-7 h-7 fill-current animate-pulse delay-300" />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-amber-300/90">
              {birthday.nickname || 'One In A Million'}
            </span>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
              Happy Birthday,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400">
                {birthday.name}
              </span>{' '}
              ✨
            </h1>

            <p className="text-base sm:text-lg font-medium text-slate-300 max-w-lg mx-auto leading-relaxed">
              "Some people enter our lives like quiet constellations — making everything brighter without even trying."
            </p>
          </div>
        </div>
      </section>

      {/* 2. COUNTDOWN */}
      <LiveCountdown targetDate={birthday.birthday_date} theme={theme} />

      {/* 3. EXCLUSIVE: MYSTERY CLUE CARDS */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-950/80 text-amber-300 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {config.exclusiveFeatures.featureTitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            What Makes You Truly Extraordinary ✨
          </h2>
          <p className="text-sm font-semibold text-slate-400">
            {config.exclusiveFeatures.featureSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.exclusiveFeatures.items?.map((item) => {
            const isRevealed = !!revealedClues[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleClue(item.id)}
                className={`p-6 rounded-3xl backdrop-blur-xl border transition-all duration-500 cursor-pointer select-none group ${
                  isRevealed
                    ? 'bg-slate-900/90 border-amber-400/60 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-700/60 hover:border-amber-400/40 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-purple-600 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-md">
                    {item.icon || '✨'}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-amber-200">{item.title}</h3>
                      <span className="text-xs font-black text-amber-400 flex items-center gap-1">
                        {isRevealed ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                        {isRevealed ? 'Unlocked' : 'Tap to reveal'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                      {isRevealed ? item.description : '•••••••••••••••••••••••••••••••••••••••• (Tap to reveal secret clue)'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. MEMORIES */}
      {birthday.memory_image_urls?.length > 0 && (
        <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
      )}

      {/* 5. TIMELINE */}
      {birthday.story_data?.length > 0 && (
        <StoryTimelineView stories={birthday.story_data} theme={theme} />
      )}

      {/* 6. PERSONAL LETTER */}
      {birthday.birthday_message && (
        <BirthdayLetterView
          message={birthday.birthday_message}
          senderName={birthday.sender_name}
          theme={theme}
        />
      )}

      {/* 7. WISH CARDS */}
      <WishCardsGrid theme={theme} />

      {/* 8. CINEMATIC FINALE */}
      <section className="text-center space-y-6 pt-6">
        {!finaleRevealed ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-amber-500/40 shadow-2xl space-y-6 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full mx-auto bg-gradient-to-tr from-amber-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 animate-pulse">
              <Star className="w-8 h-8 fill-current" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-amber-200">
                A Cinematic Birthday Finale 🌌
              </h3>
              <p className="text-xs font-semibold text-slate-400">
                Tap to unlock the grand celestial stardust celebration!
              </p>
            </div>

            <button
              type="button"
              onClick={triggerCinematicReveal}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reveal Cosmic Birthday Stardust ✨</span>
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-amber-400/50 shadow-2xl space-y-6 max-w-xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-full mx-auto bg-amber-400/20 text-amber-400 flex items-center justify-center">
              <Star className="w-8 h-8 fill-current" />
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black text-amber-300">
                Happy Birthday, {birthday.name}! ✨
              </h3>
              <p className="text-sm sm:text-base font-medium text-slate-200 leading-relaxed max-w-md mx-auto whitespace-pre-line">
                "{birthday.custom_ending_message || config.defaultEndingMessage}"
              </p>
            </div>

            <div className="pt-2">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Forever Appreciating You,</span>
              <span className="text-xl font-bold text-amber-300">
                {birthday.sender_name} ✨
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={triggerCinematicReveal}
                className="px-4 py-2 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-sm hover:bg-amber-400 transition-colors cursor-pointer"
              >
                ✨ Stardust Burst
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-slate-800 text-amber-300 border border-slate-700 shadow-sm hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-400" /> Share Stardust
              </button>
            </div>
          </div>
        )}

        {onReplayIntro && (
          <div className="pt-4">
            <button
              type="button"
              onClick={onReplayIntro}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900/80 hover:bg-slate-900 text-slate-300 border border-slate-700 shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay Mystery Intro 🌌
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

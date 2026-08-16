import React, { useState } from 'react';
import { Heart, Sparkles, Star, Share2, RotateCcw, Smile } from 'lucide-react';
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

export const CrushExperience: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const config = getExperienceConfig('crush');
  const [finaleRevealed, setFinaleRevealed] = useState(false);

  const triggerSoftGlow = () => {
    setFinaleRevealed(true);

    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#f472b6', '#c084fc', '#e879f9', '#a7f3d0', '#ffffff'],
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Happy Birthday, ${birthday.name}! ✨🌸`,
        text: `A sweet birthday note for ${birthday.name}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Birthday surprise link copied to clipboard! 📋✨');
    }
  };

  return (
    <div className="space-y-16 pb-24 max-w-4xl mx-auto px-4">
      {/* 1. SOFT ELEGANT HERO SECTION */}
      <section className="relative pt-10 pb-8 text-center overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="relative inline-block">
            <div
              className="w-44 h-44 sm:w-52 sm:h-52 rounded-full p-2 mx-auto relative shadow-xl transition-transform duration-500 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #f472b6, #c084fc, #e879f9)',
                boxShadow: '0 20px 40px rgba(192, 132, 252, 0.25)',
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner bg-slate-50">
                <img
                  src={birthday.profile_image_url}
                  alt={birthday.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="absolute top-2 -left-3 text-pink-400">
              <Sparkles className="w-6 h-6 fill-current animate-float-slow" />
            </div>
            <div className="absolute bottom-2 -right-3 text-purple-400">
              <Heart className="w-6 h-6 fill-pink-400 text-pink-400 animate-float-slow delay-200" />
            </div>
          </div>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/80 text-purple-700 border border-purple-200 shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              A Sweet Note For You
            </span>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800">
              Happy Birthday,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                {birthday.name}
              </span>{' '}
              🌸✨
            </h1>

            <p className="text-base sm:text-lg font-medium text-slate-600 max-w-md mx-auto leading-relaxed">
              "Your smile lights up every room and brings a quiet warmth to everyone lucky enough to know you."
            </p>
          </div>
        </div>
      </section>

      {/* 2. COUNTDOWN */}
      <LiveCountdown targetDate={birthday.birthday_date} theme={theme} />

      {/* 3. EXCLUSIVE: THINGS I ADMIRE ABOUT YOU */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-50 text-pink-700 border border-pink-200">
            <Smile className="w-3.5 h-3.5 text-pink-500" />
            {config.exclusiveFeatures.featureTitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800">
            A Few Things I Notice & Admire 🌸
          </h2>
          <p className="text-sm font-semibold text-slate-500">
            {config.exclusiveFeatures.featureSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.exclusiveFeatures.items?.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-white/80 backdrop-blur-md border border-purple-100 shadow-sm hover:shadow-md hover:border-pink-300 transition-all flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-400 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-xs">
                {item.icon || '🌸'}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
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

      {/* 6. SMALL MESSAGE LETTER */}
      {birthday.birthday_message && (
        <BirthdayLetterView
          message={birthday.birthday_message}
          senderName={birthday.sender_name}
          theme={theme}
        />
      )}

      {/* 7. WISH CARDS */}
      <WishCardsGrid theme={theme} />

      {/* 8. SUBTLE SWEET FINALE */}
      <section className="text-center space-y-6 pt-6">
        {!finaleRevealed ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white/90 backdrop-blur-xl border border-pink-200 shadow-xl space-y-6 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full mx-auto bg-gradient-to-tr from-pink-400 to-purple-400 text-white flex items-center justify-center shadow-md animate-pulse">
              <Heart className="w-8 h-8 fill-current" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-800">
                A Sweet Final Wish For You ✨
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Tap below for a soft birthday sparkle.
              </p>
            </div>

            <button
              type="button"
              onClick={triggerSoftGlow}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reveal Special Wish 🌸</span>
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-12 rounded-3xl bg-white/95 backdrop-blur-xl border border-pink-200 shadow-xl space-y-6 max-w-xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-full mx-auto bg-pink-100 text-pink-500 flex items-center justify-center">
              <Star className="w-8 h-8 fill-current" />
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
                Happy Birthday! 🌸
              </h3>
              <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed max-w-md mx-auto whitespace-pre-line">
                "{birthday.custom_ending_message || config.defaultEndingMessage}"
              </p>
            </div>

            <div className="pt-2">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">Warmly,</span>
              <span className="text-xl font-bold text-purple-700">
                {birthday.sender_name} ✨
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={triggerSoftGlow}
                className="px-4 py-2 rounded-full text-xs font-bold bg-pink-500 text-white shadow-sm hover:bg-pink-600 transition-colors cursor-pointer"
              >
                🌸 Soft Sparkles
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-pink-500" /> Share Note
              </button>
            </div>
          </div>
        )}

        {onReplayIntro && (
          <div className="pt-4">
            <button
              type="button"
              onClick={onReplayIntro}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 hover:bg-white text-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay From Intro 🌸
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

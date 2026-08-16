import React, { useState } from 'react';
import { Share2, RotateCcw, PartyPopper } from 'lucide-react';
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

export const SiblingExperience: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const config = getExperienceConfig('sibling');
  const [activeToast, setActiveToast] = useState<string | null>(null);
  const [finaleRevealed, setFinaleRevealed] = useState(false);

  const handleSiblingButton = (_id: string, text: string) => {
    setActiveToast(text);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f97316', '#ec4899', '#8b5cf6', '#eab308'],
    });

    setTimeout(() => {
      setActiveToast(null);
    }, 4500);
  };

  const triggerSiblingFinale = () => {
    setFinaleRevealed(true);

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff007f', '#00f0ff', '#ffe600', '#a100ff', '#ff5400'],
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Happy Birthday to my favorite headache, ${birthday.name}! 😂🎂`,
        text: `Check out this sibling birthday surprise for ${birthday.name}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Sibling surprise link copied to clipboard! 📋😂');
    }
  };

  return (
    <div className="space-y-16 pb-24 max-w-4xl mx-auto px-4">
      {/* Sibling Toast Popup Reaction */}
      {activeToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300 w-[90%] max-w-md">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black text-sm shadow-2xl border-2 border-white flex items-center gap-3">
            <span className="text-2xl">😈</span>
            <div className="flex-1">
              <span className="block text-[11px] uppercase tracking-wider text-pink-200">Sibling Fact Verified:</span>
              <span>{activeToast}</span>
            </div>
          </div>
        </div>
      )}

      {/* 1. SIBLING HERO SECTION */}
      <section className="relative pt-10 pb-8 text-center overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500 text-white font-black text-xs uppercase tracking-wider shadow-lg mb-6 rotate-[-2deg]">
          <span>😈 SIBLING RIVALRY CHAMPION 🥊</span>
        </div>

        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="relative inline-block">
            <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-[36px] p-2.5 mx-auto bg-gradient-to-tr from-pink-500 via-amber-400 to-purple-600 shadow-2xl border-4 border-slate-900 rotate-2 hover:rotate-0 transition-transform cursor-pointer">
              <div className="w-full h-full rounded-[28px] overflow-hidden bg-white">
                <img
                  src={birthday.profile_image_url}
                  alt={birthday.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-xl border-2 border-slate-900 shadow-md">
              {birthday.relationship_role || 'Favorite Headache'} 👑
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900">
              Happy Birthday,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-orange-500 to-purple-600">
                {birthday.name}
              </span>{' '}
              😂🎉
            </h1>

            <p className="text-base sm:text-xl font-bold text-slate-700 max-w-md mx-auto leading-relaxed">
              "Unfortunately… you were born on this day! But honestly, life would be empty without our fights."
            </p>
          </div>
        </div>
      </section>

      {/* 2. COUNTDOWN */}
      <LiveCountdown targetDate={birthday.birthday_date} theme={theme} />

      {/* 3. EXCLUSIVE: INTERACTIVE SIBLING BANTER BUTTONS */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-pink-100 text-pink-700 border border-pink-200">
            <span>😈</span>
            {config.exclusiveFeatures.featureTitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Sibling Truth Tests 🥊
          </h2>
          <p className="text-sm font-bold text-slate-500">
            {config.exclusiveFeatures.featureSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {config.exclusiveFeatures.items?.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSiblingButton(item.id, item.description || '')}
              className="p-5 rounded-3xl bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:scale-95 transition-all text-center space-y-2 cursor-pointer group"
            >
              <span className="text-3xl block group-hover:scale-125 transition-transform">
                {item.id === '1' ? '😈' : item.id === '2' ? '💸' : '📸'}
              </span>
              <h3 className="text-sm font-black text-slate-900">{item.title}</h3>
              <span className="text-[11px] font-bold text-pink-600 block">Tap to trigger toast ⚡</span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. SIBLING MEMORIES */}
      {birthday.memory_image_urls?.length > 0 && (
        <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
      )}

      {/* 5. CHILDHOOD FIGHTS TIMELINE */}
      {birthday.story_data?.length > 0 && (
        <StoryTimelineView stories={birthday.story_data} theme={theme} />
      )}

      {/* 6. SIBLING SECRET LETTER */}
      {birthday.birthday_message && (
        <BirthdayLetterView
          message={birthday.birthday_message}
          senderName={birthday.sender_name}
          theme={theme}
        />
      )}

      {/* 7. WISH CARDS */}
      <WishCardsGrid theme={theme} />

      {/* 8. SIBLING FINALE SURPRISE */}
      <section className="text-center space-y-6 pt-6">
        {!finaleRevealed ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] space-y-6 max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-2xl mx-auto bg-amber-400 text-slate-900 flex items-center justify-center border-2 border-slate-900 text-4xl animate-bounce">
              🎁
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                A Secret Sibling Truce... 🤝
              </h3>
              <p className="text-sm font-bold text-slate-600">
                Tap to declare 24 hours of zero fighting!
              </p>
            </div>

            <button
              type="button"
              onClick={triggerSiblingFinale}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-orange-500 to-purple-600 text-white font-black text-lg border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <PartyPopper className="w-5 h-5" />
              <span>Sign Birthday Truce! 🎂🎉</span>
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] space-y-6 max-w-xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 rounded-2xl mx-auto bg-pink-500 text-white flex items-center justify-center border-2 border-slate-900 text-4xl animate-pulse">
              ❤️
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
                You Are My Family Forever ❤️
              </h3>
              <p className="text-base sm:text-lg font-bold text-slate-700 leading-relaxed max-w-md mx-auto whitespace-pre-line">
                "{birthday.custom_ending_message || config.defaultEndingMessage}"
              </p>
            </div>

            <div className="pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Your Favorite Sibling,</span>
              <span className="text-2xl font-black text-pink-600">
                {birthday.sender_name} 👑
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={triggerSiblingFinale}
                className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-slate-900 text-white border border-slate-800 shadow-md hover:bg-slate-800 transition-transform hover:scale-105 cursor-pointer"
              >
                🎉 Confetti Explosion
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200 shadow-sm hover:bg-pink-100 transition-transform hover:scale-105 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-pink-600" /> Share Sibling Card
              </button>
            </div>
          </div>
        )}

        {onReplayIntro && (
          <div className="pt-4">
            <button
              type="button"
              onClick={onReplayIntro}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-white text-slate-800 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay Sibling Intro 📢
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { Award, BookOpen, GraduationCap, Sparkles, Share2, RotateCcw } from 'lucide-react';
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

export const TeacherExperience: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const config = getExperienceConfig('teacher');
  const [finaleRevealed, setFinaleRevealed] = useState(false);

  const triggerGoldConfetti = () => {
    setFinaleRevealed(true);

    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#fbbf24', '#f59e0b', '#d97706', '#1e3a8a', '#ffffff'],
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Happy Birthday, ${birthday.name}! 🎓📜`,
        text: `A respectful tribute for ${birthday.name}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Mentor tribute link copied to clipboard! 📋🎓');
    }
  };

  const teacherRole = birthday.relationship_role || 'Sir / Ma\'am';

  return (
    <div className="space-y-16 pb-24 max-w-4xl mx-auto px-4 font-serif">
      {/* 1. PROFESSIONAL ACADEMIC HERO SECTION */}
      <section className="relative pt-10 pb-8 text-center overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-amber-300 font-extrabold text-xs uppercase tracking-widest shadow-md mb-6 border border-amber-400/40">
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <span>HONORING AN INSPIRING MENTOR</span>
        </div>

        <div className="max-w-2xl mx-auto space-y-6 relative z-10 font-sans">
          <div className="relative inline-block">
            <div
              className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 mx-auto relative shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #1e3a8a, #1e40af, #d97706)',
                boxShadow: '0 20px 50px rgba(30, 58, 138, 0.35)',
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner bg-slate-100">
                <img
                  src={birthday.profile_image_url}
                  alt={birthday.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full shadow-md whitespace-nowrap">
              {teacherRole} 🎓
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-serif">
              Happy Birthday,{' '}
              <span className="text-blue-900">
                {birthday.name}
              </span>{' '}
              🎓
            </h1>

            <p className="text-base sm:text-lg font-medium text-slate-700 max-w-lg mx-auto leading-relaxed font-serif">
              "To a teacher whose wisdom, patience, and guidance continue to inspire our journeys."
            </p>
          </div>
        </div>
      </section>

      {/* 2. COUNTDOWN */}
      <div className="font-sans">
        <LiveCountdown targetDate={birthday.birthday_date} theme={theme} />
      </div>

      {/* 3. EXCLUSIVE: LESSONS & GUIDANCE */}
      <section className="space-y-6 font-sans">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-900 border border-blue-200">
            <BookOpen className="w-3.5 h-3.5 text-blue-700" />
            {config.exclusiveFeatures.featureTitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif">
            The Lessons You Gave Us 📜
          </h2>
          <p className="text-sm font-semibold text-slate-600">
            {config.exclusiveFeatures.featureSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.exclusiveFeatures.items?.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-900 to-indigo-900 text-amber-300 flex items-center justify-center text-xl flex-shrink-0 shadow-xs">
                {item.icon || '📖'}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 font-serif">{item.title}</h3>
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
        <div className="font-sans">
          <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
        </div>
      )}

      {/* 5. TIMELINE */}
      {birthday.story_data?.length > 0 && (
        <div className="font-sans">
          <StoryTimelineView stories={birthday.story_data} theme={theme} />
        </div>
      )}

      {/* 6. THANK YOU LETTER */}
      {birthday.birthday_message && (
        <BirthdayLetterView
          message={birthday.birthday_message}
          senderName={birthday.sender_name}
          theme={theme}
        />
      )}

      {/* 7. WISH CARDS */}
      <div className="font-sans">
        <WishCardsGrid theme={theme} />
      </div>

      {/* 8. ELEGANT GOLDEN FINALE */}
      <section className="text-center space-y-6 pt-6 font-sans">
        {!finaleRevealed ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-amber-200 shadow-xl space-y-6 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full mx-auto bg-gradient-to-tr from-blue-900 to-indigo-900 text-amber-400 flex items-center justify-center shadow-md animate-pulse">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 font-serif">
                A Letter of Gratitude & Respect 🎓
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Tap to present our warmest birthday wishes.
              </p>
            </div>

            <button
              type="button"
              onClick={triggerGoldConfetti}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-900 via-indigo-900 to-amber-600 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Present Birthday Tribute 📜</span>
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-amber-300 shadow-2xl space-y-6 max-w-xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-full mx-auto bg-amber-100 text-amber-700 flex items-center justify-center">
              <GraduationCap className="w-8 h-8" />
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
                Happy Birthday, {teacherRole}! 🎓
              </h3>
              <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed max-w-md mx-auto whitespace-pre-line font-serif">
                "{birthday.custom_ending_message || config.defaultEndingMessage}"
              </p>
            </div>

            <div className="pt-2">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">With Highest Respect & Gratitude,</span>
              <span className="text-xl font-bold text-blue-900 font-serif">
                {birthday.sender_name} 🎓
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={triggerGoldConfetti}
                className="px-4 py-2 rounded-full text-xs font-bold bg-blue-900 text-amber-300 shadow-sm hover:bg-blue-800 transition-colors cursor-pointer"
              >
                ✨ Golden Shower
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-900" /> Share Tribute
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
              <RotateCcw className="w-3.5 h-3.5" /> Replay Mentor Intro 📜
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

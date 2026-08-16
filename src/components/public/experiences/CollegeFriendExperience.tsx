import React, { useState } from 'react';
import { GraduationCap, Award, FileText, Share2, RotateCcw } from 'lucide-react';
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

export const CollegeFriendExperience: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const config = getExperienceConfig('collegeFriend');
  const [finaleRevealed, setFinaleRevealed] = useState(false);

  const triggerGraduationCelebration = () => {
    setFinaleRevealed(true);

    const count = 180;
    const defaults = { origin: { y: 0.65 }, colors: ['#2563eb', '#7c3aed', '#db2777', '#38bdf8', '#fbbf24', '#ffffff'] };

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
        title: `Happy Birthday Campus Legend, ${birthday.name}! 🎓🎉`,
        text: `Check out this college throwback birthday surprise for ${birthday.name}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('College surprise link copied to clipboard! 📋🎓');
    }
  };

  return (
    <div className="space-y-16 pb-24 max-w-4xl mx-auto px-4">
      {/* 1. CAMPUS ID CARD HERO SECTION */}
      <section className="relative pt-10 pb-8 text-center overflow-hidden">
        {/* Campus Header Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 font-extrabold text-xs uppercase tracking-wider shadow-sm mb-6 border border-blue-200">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          <span>CLASS OF EXCELLENCE • OFFICIAL BIRTHDAY CONVOCATION</span>
        </div>

        {/* College Student ID Card Style */}
        <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Lanyard punch hole & gradient top header */}
          <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
          <div className="w-12 h-3 mx-auto bg-slate-200 rounded-full mb-2" />

          <div className="flex flex-col sm:flex-row items-center gap-5 text-left">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-blue-500 shadow-lg flex-shrink-0 bg-slate-100">
              <img
                src={birthday.profile_image_url}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                STUDENT ID: #BDAY-2026
              </span>
              <h2 className="text-2xl font-black text-slate-900">{birthday.name}</h2>
              <p className="text-xs font-bold text-slate-500">
                {birthday.nickname ? `Major in: ${birthday.nickname}` : 'Major in: Causing Trouble & Missing 8AMs'}
              </p>
              <div className="pt-1 flex items-center justify-center sm:justify-start gap-1 text-[11px] font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Status: Birthday VIP Allowed
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>ISSUED BY: {birthday.sender_name}</span>
            <span>VALID: FOREVER</span>
          </div>
        </div>

        <div className="pt-6 space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
            Happy Birthday,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              {birthday.name}
            </span>{' '}
            🎓🎉
          </h1>
          <p className="text-base sm:text-lg font-semibold text-slate-600 max-w-md mx-auto">
            "Attendance: 0% • Birthday Celebration: 100%!"
          </p>
        </div>
      </section>

      {/* 2. COUNTDOWN */}
      <LiveCountdown targetDate={birthday.birthday_date} theme={theme} />

      {/* 3. EXCLUSIVE: FAKE COLLEGE REPORT CARD */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            {config.exclusiveFeatures.featureTitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Semester Grade Breakdown 📝
          </h2>
          <p className="text-sm font-semibold text-slate-500">
            {config.exclusiveFeatures.featureSubtitle}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {config.exclusiveFeatures.items?.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
                    <p className="text-[10px] text-slate-500">{item.description}</p>
                  </div>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                  {item.score}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-center text-xs font-black text-blue-800">
            OVERALL CGPA: 10.0/10.0 IN LEGENDARY FRIENDSHIP 🌟
          </div>
        </div>
      </section>

      {/* 4. CAMPUS MEMORIES */}
      {birthday.memory_image_urls?.length > 0 && (
        <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
      )}

      {/* 5. SEMESTER TIMELINE */}
      {birthday.story_data?.length > 0 && (
        <StoryTimelineView stories={birthday.story_data} theme={theme} />
      )}

      {/* 6. COLLEGE LETTER */}
      {birthday.birthday_message && (
        <BirthdayLetterView
          message={birthday.birthday_message}
          senderName={birthday.sender_name}
          theme={theme}
        />
      )}

      {/* 7. WISH CARDS */}
      <WishCardsGrid theme={theme} />

      {/* 8. GRADUATION FINALE CELEBRATION */}
      <section className="text-center space-y-6 pt-6">
        {!finaleRevealed ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-blue-200 shadow-2xl space-y-6 max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 animate-bounce">
              <GraduationCap className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Official Birthday Convocation 🎓
              </h3>
              <p className="text-sm font-semibold text-slate-500">
                Tap to toss the graduation caps into the sky!
              </p>
            </div>

            <button
              type="button"
              onClick={triggerGraduationCelebration}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black text-lg shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Graduate To Another Amazing Year! 🎓🎉</span>
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-blue-300 shadow-2xl space-y-6 max-w-xl mx-auto animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 rounded-full mx-auto bg-blue-100 text-blue-600 flex items-center justify-center animate-bounce">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
                Happy Birthday, Campus Legend! 🎓❤️
              </h3>
              <p className="text-base sm:text-lg font-bold text-slate-700 leading-relaxed max-w-md mx-auto whitespace-pre-line">
                "{birthday.custom_ending_message || config.defaultEndingMessage}"
              </p>
            </div>

            <div className="pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Batchmate For Life,</span>
              <span className="text-2xl font-black text-blue-600">
                {birthday.sender_name} 🎓
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={triggerGraduationCelebration}
                className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-transform hover:scale-105 cursor-pointer"
              >
                🎓 Toss Caps Again!
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 shadow-sm hover:bg-blue-100 transition-transform hover:scale-105 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-600" /> Share Campus Surprise
              </button>
            </div>
          </div>
        )}

        {onReplayIntro && (
          <div className="pt-4">
            <button
              type="button"
              onClick={onReplayIntro}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 hover:bg-white text-slate-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay Notice Board Intro 🎓
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

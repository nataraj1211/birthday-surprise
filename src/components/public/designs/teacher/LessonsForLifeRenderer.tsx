import React, { useState } from 'react';
import { Compass, Lightbulb, Sparkles, Share2, RotateCcw, BookCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';
import { MemoryGallery } from '../../MemoryGallery';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

const LIFE_LESSONS = [
  {
    icon: <Lightbulb className="w-6 h-6 text-amber-600" />,
    number: 'Lesson 01',
    title: 'Lead With Integrity',
    desc: 'Doing what is right even when no one is watching. You modeled this every single day.',
  },
  {
    icon: <Compass className="w-6 h-6 text-emerald-600" />,
    number: 'Lesson 02',
    title: 'Stay Curious Always',
    desc: 'The greatest learners are the ones who stay humble enough to keep exploring.',
  },
  {
    icon: <BookCheck className="w-6 h-6 text-blue-600" />,
    number: 'Lesson 03',
    title: 'Resilience in Adversity',
    desc: 'Transforming setbacks into stepping stones for greater achievements.',
  },
];

export const LessonsForLifeRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [lessonsCelebrated, setLessonsCelebrated] = useState(false);

  const triggerTorchBurst = () => {
    setLessonsCelebrated(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#0d9488', '#0284c7', '#f59e0b', '#10b981'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-serif text-slate-800">
      {/* Hero: Editorial Wisdom Scroll */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6 font-sans"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-emerald-800 via-teal-600 to-amber-300 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <Lightbulb className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-emerald-100 text-emerald-800 border border-emerald-300">
            <Compass className="w-3.5 h-3.5" /> Wisdom & Principles
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-serif">
            Happy Birthday, <span className="text-emerald-700">{birthday.relationship_role || birthday.name}</span>! 🌿
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic font-serif">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Your life lessons will forever guide our journey."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section className="font-sans">
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Life Lessons Cards */}
      <section className="space-y-6">
        <div className="text-center space-y-1 font-sans">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Core Philosophies
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            Lessons That Shaped Our Lives 💡
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {LIFE_LESSONS.map((l, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-3xl bg-white border-2 border-emerald-200/80 shadow-lg space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                {l.icon}
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest block">
                {l.number}
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-serif">{l.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                {l.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Memory Gallery */}
      {birthday.memory_image_urls && birthday.memory_image_urls.length > 0 && (
        <section className="font-sans">
          <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
        </section>
      )}

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-emerald-50/50 p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-sm max-w-2xl mx-auto space-y-3 font-serif">
          <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-700" /> A Tribute of Gratitude
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-sans font-bold text-emerald-800 mt-4">
            — Respectfully, {birthday.sender_name} 🎓
          </p>
        </section>
      )}

      {/* Finale */}
      <section className="text-center space-y-5 pt-6 pb-8 font-sans">
        {!lessonsCelebrated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerTorchBurst}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-600 text-white font-black text-base shadow-xl shadow-emerald-800/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Honour With Torch of Wisdom 🌟</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-950 text-white border-2 border-emerald-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center font-serif"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center text-2xl font-black shadow-md font-sans">
              🌟
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-200">
              {birthday.custom_ending_message || `Happy Birthday, Respected Mentor ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans font-medium leading-relaxed">
              Your mentorship is a blessing that keeps on giving. Wishing you health, joy, and peace.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 font-sans">
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Replay Curtain
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: `Happy Birthday ${birthday.name}!`, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="px-5 py-2 rounded-full text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" /> Share Birthday Link
              </button>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};

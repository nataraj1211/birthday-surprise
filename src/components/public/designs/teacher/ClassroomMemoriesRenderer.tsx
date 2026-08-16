import React, { useState } from 'react';
import { BookOpen, Sparkles, Share2, RotateCcw, PenTool } from 'lucide-react';
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

const CHALK_LESSONS = [
  { id: '1', title: 'Lesson 01: Curiosity 🔬', desc: 'Never stop asking questions. The greatest breakthroughs begin with wonder.' },
  { id: '2', title: 'Lesson 02: Character 📚', desc: 'Knowledge without character is empty. Always stand firm for the truth.' },
  { id: '3', title: 'Lesson 03: Perseverance 🧗', desc: 'Failure is not the end of the lesson; it is where real learning begins.' },
  { id: '4', title: 'Lesson 04: Kindness 💖', desc: 'The most lasting legacy is the warmth and patience you share with others.' },
];

export const ClassroomMemoriesRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [chalkDustCelebrated, setChalkDustCelebrated] = useState(false);

  const triggerChalkDust = () => {
    setChalkDustCelebrated(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#fef08a', '#86efac', '#93c5fd'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-mono text-slate-100 bg-[#1e293b] rounded-3xl p-4 sm:p-6 my-4 border-4 border-amber-800/80 shadow-2xl">
      {/* Hero: Green/Slate Chalkboard Header */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6 font-sans"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-2xl p-2 bg-gradient-to-tr from-amber-700 to-amber-900 shadow-2xl flex items-center justify-center border-4 border-amber-600">
            <div className="w-full h-full rounded-xl overflow-hidden border-2 border-white/80 shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto font-mono">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-950 text-emerald-300 border border-emerald-500/40">
            <PenTool className="w-3.5 h-3.5" /> Chalkboard Classroom Edition
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-serif">
            Happy Birthday, <span className="text-yellow-300">{birthday.relationship_role || birthday.name}</span>! 📝
          </h1>
          <p className="text-sm text-slate-300 italic font-mono">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Written in chalk, remembered for a lifetime."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section className="bg-slate-900/80 rounded-2xl p-4 border border-slate-700 font-sans">
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Chalkboard Notes Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1 font-sans">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-yellow-300 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
            Classroom Blackboard
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
            Lessons Written on Our Hearts 📋
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CHALK_LESSONS.map((lesson) => (
            <motion.div
              key={lesson.id}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-3xl bg-slate-900/90 border-2 border-dashed border-slate-600 shadow-md space-y-2"
            >
              <h3 className="font-bold text-lg text-yellow-300 font-mono">{lesson.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                {lesson.desc}
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
        <section className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-sm max-w-2xl mx-auto space-y-3 font-serif">
          <h3 className="text-lg font-bold text-yellow-300 flex items-center gap-2 font-mono">
            <BookOpen className="w-4 h-4 text-yellow-400" /> Note from the Class
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-200 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-mono font-bold text-emerald-400 mt-4">
            — Respectfully, {birthday.sender_name} 📚
          </p>
        </section>
      )}

      {/* Finale: Chalk Dust & Bells */}
      <section className="text-center space-y-5 pt-6 pb-8 font-sans">
        {!chalkDustCelebrated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerChalkDust}
            className="px-8 py-4 rounded-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-base shadow-xl cursor-pointer inline-flex items-center gap-3 transition-all font-mono"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Ring The Birthday Bell & Celebrate 🔔</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-900 border-2 border-yellow-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center font-mono"
          >
            <div className="text-4xl text-yellow-400">🔔 📚 🏆</div>
            <h3 className="text-2xl sm:text-3xl font-black text-yellow-300">
              {birthday.custom_ending_message || `Happy Birthday, Respected ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              May this year bring you immense happiness, radiant health, and pride in all the students you have nurtured.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 font-sans">
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5 transition-all cursor-pointer"
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
                className="px-5 py-2 rounded-full text-xs font-black bg-yellow-400 hover:bg-yellow-300 text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

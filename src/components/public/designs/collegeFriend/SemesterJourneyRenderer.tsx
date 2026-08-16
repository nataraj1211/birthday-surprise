import React, { useState } from 'react';
import { BookOpen, Award, Sparkles, Share2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

const SEMESTERS = [
  { sem: 'Semester 1', title: 'Freshers & Awkward First Days 🌱', desc: 'Finding our classrooms, getting lost on campus, and instantly realizing we were going to be best friends.' },
  { sem: 'Semester 2', title: 'Finals Panic & Chai Runs ☕', desc: 'Surviving all-night study sessions fueled by black coffee, panic, and laughing at memes at 4 AM.' },
  { sem: 'Semester 3', title: 'College Fest & Unfiltered Chaos 🎪', desc: 'Competing in events, dancing in the rain, and taking the wildest pictures that will stay in the vault.' },
  { sem: 'Final Year', title: 'Graduation & Legends Forever 🎓', desc: 'Submitting final projects at 11:59 PM, tossing our graduation caps, and knowing our friendship is for life.' },
];

export const SemesterJourneyRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [selectedSem, setSelectedSem] = useState<number>(0);
  const [semCompleted, setSemCompleted] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const triggerGradCelebration = () => {
    setSemCompleted(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#0284c7', '#38bdf8', '#059669', '#facc15'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-800">
      {/* Hero: Academic Syllabus Roadmap */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-cyan-600 via-blue-500 to-indigo-700 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
              <img
                src={birthday.profile_image_url || images[0]}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-cyan-100 text-cyan-800 border border-cyan-300">
            <BookOpen className="w-3.5 h-3.5" /> Semester Journey Roadmap
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Happy Birthday, <span className="text-cyan-600">{birthday.name}</span>! 🎒
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}From Semester 1 freshers to lifelong graduates of friendship."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Semester Stepper Progression */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            Curriculum
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Semester-by-Semester Memories 📚
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SEMESTERS.map((sem, idx) => {
            const isSelected = selectedSem === idx;
            return (
              <button
                key={sem.sem}
                type="button"
                onClick={() => setSelectedSem(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-700 text-white border-cyan-400 shadow-xl shadow-cyan-900/20 scale-[1.02]'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-cyan-300'
                }`}
              >
                <span className={`text-[10px] font-black uppercase tracking-wider block ${isSelected ? 'text-cyan-200' : 'text-cyan-600'}`}>
                  {sem.sem}
                </span>
                <span className="text-xs sm:text-sm font-bold block mt-1 line-clamp-1">
                  {sem.title.split(' ')[0]} {sem.title.split(' ')[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Semester Highlight */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-cyan-200 shadow-xl flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-full sm:w-64 h-56 rounded-2xl overflow-hidden shadow-inner border border-slate-100 flex-shrink-0">
            <img src={images[selectedSem % images.length]} alt="sem" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-600">
              {SEMESTERS[selectedSem].sem.toUpperCase()} HIGHLIGHT
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">{SEMESTERS[selectedSem].title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {SEMESTERS[selectedSem].desc}
            </p>
          </div>
        </div>
      </section>

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-cyan-50/60 p-6 sm:p-8 rounded-3xl border border-cyan-200 shadow-sm max-w-2xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-cyan-950 flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-700" /> College Bestie Note
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-bold text-cyan-800 mt-4">
            — {birthday.sender_name} 🎓
          </p>
        </section>
      )}

      {/* Finale */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!semCompleted ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerGradCelebration}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white font-black text-base shadow-xl shadow-cyan-600/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Complete Degree in Lifelong Friendship 🎓</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-cyan-950 text-white border-2 border-cyan-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="text-4xl">🎓 📜 🌟</div>
            <h3 className="text-2xl sm:text-3xl font-black text-cyan-200">
              {birthday.custom_ending_message || `Happy Birthday, College Legend ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-cyan-100/90 font-medium leading-relaxed">
              Every semester with you was an unforgettable chapter. Here is to our lifelong alumni club!
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
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
                className="px-5 py-2 rounded-full text-xs font-black bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

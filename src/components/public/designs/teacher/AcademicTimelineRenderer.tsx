import React, { useState } from 'react';
import { Award, GraduationCap, Share2, RotateCcw, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

const ACADEMIC_MILESTONES = [
  { era: 'Phase I', title: 'The Calling & Early Mentorship 🌱', desc: 'Starting with passion and igniting curiosity in the first batches of students.' },
  { era: 'Phase II', title: 'Mastery & Research Excellence 🔬', desc: 'Authoring publications, mentoring honors theses, and setting the benchmark in education.' },
  { era: 'Phase III', title: 'Guiding Generations of Leaders 🏛️', desc: 'Countless alumni across the globe achieving their dreams thanks to your foundational teaching.' },
  { era: 'Today', title: 'A Lifetime of Impact & Honor 👑', desc: 'Celebrating a legacy that will echo for decades to come.' },
];

export const AcademicTimelineRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [activePhase, setActivePhase] = useState<number>(0);
  const [torchLit, setTorchLit] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const triggerTorchLighting = () => {
    setTorchLit(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ca8a04', '#d97706', '#2563eb', '#facc15'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-serif text-slate-800">
      {/* Hero: Scholarly Timeline Portrait */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6 font-sans"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-blue-900 via-indigo-600 to-amber-300 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
              <img
                src={birthday.profile_image_url || images[0]}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-blue-900 text-amber-300 flex items-center justify-center shadow-lg border-2 border-white">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-blue-100 text-blue-900 border border-blue-300">
            <Award className="w-3.5 h-3.5" /> Scholarly Impact Timeline
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-serif">
            Happy Birthday, <span className="text-blue-900">{birthday.relationship_role || birthday.name}</span>! 🎓
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic font-serif">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}A celebrated journey of knowledge, honor, and inspiration."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section className="font-sans">
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Academic Milestone Stepper */}
      <section className="space-y-6">
        <div className="text-center space-y-1 font-sans">
          <span className="text-xs font-black uppercase tracking-widest text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Milestones
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            Chronicles of Academic Impact 📜
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans">
          {ACADEMIC_MILESTONES.map((m, idx) => {
            const isSelected = activePhase === idx;
            return (
              <button
                key={m.era}
                type="button"
                onClick={() => setActivePhase(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-950 text-white border-blue-400 shadow-xl scale-[1.02]'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                }`}
              >
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${isSelected ? 'text-amber-300' : 'text-blue-600'}`}>
                  {m.era}
                </span>
                <span className="text-xs sm:text-sm font-bold block mt-1 line-clamp-1">
                  {m.title.split(' ')[0]} {m.title.split(' ')[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-blue-200 shadow-xl flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-full sm:w-64 h-56 rounded-2xl overflow-hidden shadow-inner border border-slate-100 flex-shrink-0">
            <img src={images[activePhase % images.length]} alt="milestone" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700 font-sans">
              {ACADEMIC_MILESTONES[activePhase].era.toUpperCase()}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">{ACADEMIC_MILESTONES[activePhase].title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium">
              {ACADEMIC_MILESTONES[activePhase].desc}
            </p>
          </div>
        </div>
      </section>

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-blue-50/50 p-6 sm:p-8 rounded-3xl border border-blue-200 shadow-sm max-w-2xl mx-auto space-y-3 font-serif">
          <h3 className="text-lg font-bold text-blue-950 flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-700" /> Letter of Honor
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-sans font-bold text-blue-900 mt-4">
            — {birthday.sender_name} 🎓
          </p>
        </section>
      )}

      {/* Finale: Torch of Knowledge */}
      <section className="text-center space-y-5 pt-6 pb-8 font-sans">
        {!torchLit ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerTorchLighting}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-950 via-indigo-900 to-amber-600 text-white font-black text-base shadow-xl cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Flame className="w-5 h-5 animate-pulse text-amber-400" />
            <span>Light The Torch of Academic Honor 🕯️</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-950 text-white border-2 border-amber-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center font-serif"
          >
            <div className="w-14 h-14 rounded-full bg-blue-900 text-amber-300 mx-auto flex items-center justify-center text-2xl font-black shadow-md font-sans">
              🕯️
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-amber-200">
              {birthday.custom_ending_message || `Happy Birthday, Honored Mentor ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans font-medium leading-relaxed">
              Your dedication to teaching continues to brighten the world with every mind you shape.
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
                className="px-5 py-2 rounded-full text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

import React, { useState } from 'react';
import { FileSpreadsheet, Award, Sparkles, Share2, RotateCcw, AlertCircle } from 'lucide-react';
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

const REPORT_CARDS = [
  { subject: 'Lecture Attendance 🏃', score: '32%', grade: 'F (Detained)', comment: 'Always found at the canteen instead' },
  { subject: 'Fun & Good Vibes 🥳', score: '99.9%', grade: 'A+ (Gold Medal)', comment: 'Life of the entire college batch' },
  { subject: 'Assignment Deadlines 📝', score: '41%', grade: 'D (Barely)', comment: 'Submitted at 11:59:58 PM' },
  { subject: 'Gossip & Chai Sessions ☕', score: '100%', grade: 'O (Distinction)', comment: 'Unstoppable yap masters' },
  { subject: 'Sleep Schedule 😴', score: '5%', grade: 'F- (Terminal)', comment: 'Operating on 3 hours of sleep' },
  { subject: 'Friendship Loyalty 💖', score: '100%', grade: 'A++ (Legend)', comment: 'The best friend anyone could ever ask for' },
];

export const AttendanceZeroRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [reportMedaled, setReportMedaled] = useState(false);

  const triggerReportMedal = () => {
    setReportMedaled(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ea580c', '#facc15', '#f43f5e', '#3b82f6'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-mono text-slate-800">
      {/* Hero: Official Fake College Transcript */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="text-center space-y-6 pt-6 font-sans"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-400 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-yellow-100 text-amber-900 border border-yellow-300">
            <AlertCircle className="w-3.5 h-3.5 text-orange-600" /> Official Transcript of Chaos
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Happy Birthday, <span className="text-orange-600">{birthday.name}</span>! 📝
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Attendance may be 0%, but your friendship is 100% distinction."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section className="font-sans">
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Fake Report Card Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1 font-sans">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Grade Sheet
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Official Backbencher Report Card 📋
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPORT_CARDS.map((rc, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-3xl bg-white border-2 border-orange-200/80 shadow-md space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{rc.subject}</span>
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                  {rc.score}
                </span>
              </div>
              <p className="text-lg font-black text-slate-900 font-sans">{rc.grade}</p>
              <p className="text-xs text-slate-500 font-sans">{rc.comment}</p>
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
        <section className="bg-orange-50/60 p-6 sm:p-8 rounded-3xl border border-orange-200 shadow-sm max-w-2xl mx-auto space-y-3 font-sans">
          <h3 className="text-lg font-bold text-orange-950 flex items-center gap-2">
            <Award className="w-4 h-4 text-orange-600" /> Dean's Special Birthday Note
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-bold text-orange-800 mt-4 font-mono">
            — {birthday.sender_name} 🎓
          </p>
        </section>
      )}

      {/* Finale: Dean's Medal */}
      <section className="text-center space-y-5 pt-6 pb-8 font-sans">
        {!reportMedaled ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerReportMedal}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-slate-950 font-black text-base shadow-xl shadow-orange-500/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Award The Gold Medal of Chaos 🏅</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-950 text-white border-2 border-yellow-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center font-mono"
          >
            <div className="text-4xl text-yellow-400">🏅 🎓 👑</div>
            <h3 className="text-2xl sm:text-3xl font-black text-yellow-300">
              {birthday.custom_ending_message || `Dean's List Legend: Happy Birthday ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Certified Valedictorian in Fun, Loyalty, and Laughter. Happy Birthday!
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

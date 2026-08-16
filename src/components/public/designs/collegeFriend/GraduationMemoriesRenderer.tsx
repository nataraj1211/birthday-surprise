import React, { useState } from 'react';
import { GraduationCap, Share2, RotateCcw, Quote } from 'lucide-react';
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

const SUPERLATIVES = [
  { award: 'Most Likely to Sleep in 8 AM Lecture 😴', recipient: 'Undisputed Champion' },
  { award: 'Best Laugh in the Entire Hall 😂', recipient: 'Loud & Infectious' },
  { award: 'Chief Chai & Snack Connoisseur ☕', recipient: 'Gold Medalist' },
  { award: 'Most Loyal Friend for Life 💖', recipient: 'Unmatched 10/10' },
];

export const GraduationMemoriesRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [capTossed, setCapTossed] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const triggerCapToss = () => {
    setCapTossed(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#0f172a', '#3b82f6', '#f59e0b', '#10b981'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-serif text-slate-800">
      {/* Hero: Graduation Yearbook Spread */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="p-4 bg-white rounded-3xl shadow-2xl border-4 border-slate-900 max-w-xs sm:max-w-sm mx-auto space-y-3">
            <div className="w-60 h-60 sm:w-68 sm:h-68 rounded-2xl overflow-hidden border-2 border-slate-200 mx-auto shadow-inner">
              <img
                src={birthday.profile_image_url || images[0]}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pt-2">
              <h3 className="font-bold text-lg text-slate-900">{birthday.name}</h3>
              <p className="text-xs font-sans text-slate-500 italic">"Class of Legends • Lifetime VIP"</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto font-sans">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-slate-900 text-white shadow-md">
            <GraduationCap className="w-3.5 h-3.5" /> Official Yearbook Edition
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Happy Birthday, <span className="text-blue-600">{birthday.name}</span>! 🎓
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}A toast to the moments that turned college friends into family."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section className="font-sans">
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Senior Superlatives Grid */}
      <section className="space-y-6 font-sans">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Yearbook Awards
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Class of 2026 Superlatives 🏆
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUPERLATIVES.map((sup, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-md space-y-2"
            >
              <h3 className="font-bold text-base text-slate-900">{sup.award}</h3>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Winner: {birthday.name} ({sup.recipient})
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Memory Gallery */}
      {birthday.memory_image_urls && birthday.memory_image_urls.length > 0 && (
        <section>
          <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
        </section>
      )}

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-3 font-sans">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Quote className="w-4 h-4 text-blue-600" /> Senior Dedication Letter
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic font-serif">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-bold text-slate-800 mt-4">
            — {birthday.sender_name} 🎓
          </p>
        </section>
      )}

      {/* Finale: Cap Toss */}
      <section className="text-center space-y-5 pt-6 pb-8 font-sans">
        {!capTossed ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerCapToss}
            className="px-8 py-4 rounded-full bg-slate-900 hover:bg-black text-white font-black text-base shadow-xl cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <GraduationCap className="w-5 h-5" />
            <span>Toss Caps Into The Sky & Celebrate 🎓</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-950 text-white border-2 border-blue-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="text-4xl">🎓 🌟 🍾</div>
            <h3 className="text-2xl sm:text-3xl font-black text-blue-200">
              {birthday.custom_ending_message || `Congratulations & Happy Birthday ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Graduating into another year of excellence, happiness, and unforgettable moments.
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
                className="px-5 py-2 rounded-full text-xs font-black bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

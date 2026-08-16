import React, { useState } from 'react';
import { Star, Moon, Sparkles, Share2, RotateCcw } from 'lucide-react';
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

const STARRY_POINTS = [
  { star: 'Star Alpha', title: 'The Spark ✨', desc: 'That quiet moment when you first caught my attention in the crowd.' },
  { star: 'Star Beta', title: 'The Orbit 🌌', desc: 'How naturally my day gets better whenever you are around.' },
  { star: 'Star Gamma', title: 'The Constellation 💫', desc: 'Every conversation building into something special and unforgettable.' },
  { star: 'Star Delta', title: 'The Cosmic Wish 🌠', desc: 'Wishing upon the brightest shooting star for your happiness today.' },
];

export const StarryCrushRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [constellationDrawn, setConstellationDrawn] = useState(false);

  const triggerStarBurst = () => {
    setConstellationDrawn(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ec4899', '#38bdf8', '#fbbf24'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-100">
      {/* Hero: Constellation Glow */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="absolute -inset-4 rounded-full bg-purple-600/30 blur-2xl animate-pulse" />

          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-indigo-900 via-purple-600 to-pink-500 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-purple-300/40 shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-purple-600 text-amber-300 flex items-center justify-center shadow-lg border-2 border-purple-400">
              <Star className="w-5 h-5 fill-current" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-purple-950/80 text-purple-300 border border-purple-500/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Starry Crush Constellation
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Happy Birthday, <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">{birthday.name}</span>! 🌌
          </h1>
          <p className="text-sm sm:text-base font-semibold text-purple-200/80 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Out of a galaxy of billions, you shine the brightest."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Starry Constellation Points */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-pink-400 bg-pink-950/60 px-3 py-1 rounded-full border border-pink-800">
            Stellar Map
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Constellation of Thoughts 💫
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STARRY_POINTS.map((pt, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/30 shadow-lg space-y-2 backdrop-blur-md"
            >
              <div className="flex items-center justify-between text-xs text-amber-300 font-mono">
                <span>{pt.star}</span>
                <Star className="w-4 h-4 fill-current" />
              </div>
              <h3 className="font-bold text-lg text-white">{pt.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {pt.desc}
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
        <section className="bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-sm max-w-2xl mx-auto space-y-3 font-serif">
          <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2">
            <Moon className="w-4 h-4 text-amber-300" /> A Note Under The Stars
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-purple-100 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-sans font-bold text-pink-400 mt-4">
            — {birthday.sender_name} ✨
          </p>
        </section>
      )}

      {/* Finale: Starry Burst */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!constellationDrawn ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerStarBurst}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-black text-base shadow-2xl shadow-purple-600/40 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin text-amber-300" />
            <span>Illuminate The Starry Birthday Wish 🌌</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-950 text-white border-2 border-purple-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="text-4xl">🌌 ✨ 🌠</div>
            <h3 className="text-2xl sm:text-3xl font-black text-purple-200">
              {birthday.custom_ending_message || `Happy Birthday, My Star ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              May the universe align to grant you endless happiness, adventure, and beauty this year.
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
                className="px-5 py-2 rounded-full text-xs font-black bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

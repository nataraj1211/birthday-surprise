import React, { useState } from 'react';
import { Sun, Sparkles, Share2, RotateCcw, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

export const GoldenMemoriesRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [activePhoto, setActivePhoto] = useState<number>(0);
  const [goldenDust, setGoldenDust] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const triggerGoldenParticles = () => {
    setGoldenDust(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ca8a04', '#eab308', '#fef08a', '#d97706'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-serif text-amber-950">
      {/* Hero: Vintage Sepia Framed Portrait */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="relative p-4 bg-[#fbf8f0] rounded-3xl shadow-2xl border-4 border-[#e2d5bd] max-w-xs sm:max-w-sm mx-auto">
            <div className="w-64 h-64 sm:w-72 sm:h-72 overflow-hidden rounded-2xl border-2 border-[#cfbe9e] shadow-inner">
              <img
                src={birthday.profile_image_url || images[0]}
                alt={birthday.name}
                className="w-full h-full object-cover sepia-[0.25] contrast-[1.05]"
              />
            </div>
            <p className="mt-3 text-sm font-bold text-amber-900 italic">
              Priceless Memories • Golden Years
            </p>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-sans font-black uppercase tracking-widest bg-amber-100 text-amber-900 border border-amber-300">
            <Sun className="w-3.5 h-3.5 text-amber-600" /> Golden Memories Collection
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-amber-950">
            Happy Birthday, <span className="text-amber-700">{birthday.relationship_role || birthday.name}</span> ✨
          </h1>
          <p className="text-sm sm:text-base text-amber-900/80 italic">
            "Treasured moments printed in gold and forever etched in our hearts."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Vintage Film Strip Gallery */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-sans font-black uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Vintage Album
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-950">
            Our Golden Photo Archive 🎞️
          </h2>
          <p className="text-xs sm:text-sm text-amber-800/80 font-sans">
            Tap a memory below to view it through our warm vintage lens.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActivePhoto(idx)}
              className={`p-3 bg-[#fdfbf6] rounded-2xl border-2 shadow-md cursor-pointer transition-all ${
                activePhoto === idx ? 'border-amber-500 ring-2 ring-amber-400' : 'border-[#dfd3bc]'
              }`}
            >
              <div className="w-full h-56 rounded-xl overflow-hidden bg-amber-50 border border-amber-200">
                <img src={img} alt={`Memory ${idx + 1}`} className="w-full h-full object-cover sepia-[0.2]" />
              </div>
              <p className="text-center text-xs font-sans font-bold text-amber-900 mt-2">
                Photo #{idx + 1} • Golden Treasure
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Love Message */}
      {birthday.birthday_message && (
        <section className="bg-[#fefcf8] p-6 sm:p-8 rounded-3xl border-2 border-amber-200 shadow-md max-w-2xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-amber-950 flex items-center gap-2">
            <Heart className="w-4 h-4 text-amber-600 fill-current" /> A Note Written in Warm Gold
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-sans font-bold text-amber-900 mt-4">
            — With all our warmth, {birthday.sender_name}
          </p>
        </section>
      )}

      {/* Finale: Golden Particle Dust */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!goldenDust ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerGoldenParticles}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white font-sans font-black text-base shadow-xl shadow-amber-800/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Shower With Golden Blessings ✨</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-[#fffefc] border-2 border-amber-400 shadow-2xl space-y-4 max-w-xl mx-auto"
          >
            <div className="w-14 h-14 rounded-full bg-amber-500 text-white mx-auto flex items-center justify-center text-2xl shadow-md">
              ☀️
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-950">
              {birthday.custom_ending_message || `Wishing You A Golden & Blessed Birthday!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans font-medium leading-relaxed">
              May every coming year shine with golden health, peace, laughter, and family warmth.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 font-sans">
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center gap-1.5 transition-all cursor-pointer"
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
                className="px-5 py-2 rounded-full text-xs font-black bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

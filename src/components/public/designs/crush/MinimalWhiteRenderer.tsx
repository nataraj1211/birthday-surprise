import React, { useState } from 'react';
import { Share2, RotateCcw, Flower } from 'lucide-react';
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

const ELEGANT_POETRY = [
  { line: 'In a noisy world, your presence is quiet grace.' },
  { line: 'Your smile brings a light that words could never capture.' },
  { line: 'May every step ahead lead you to boundless joy and peace.' },
  { line: 'Happy Birthday to someone truly one-of-a-kind.' },
];

export const MinimalWhiteRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [minimalRevealed, setMinimalRevealed] = useState(false);

  const triggerMinimalGlow = () => {
    setMinimalRevealed(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#e2e8f0', '#cbd5e1', '#fbcfe8', '#fef08a'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-3xl mx-auto px-4 font-serif text-slate-900 bg-[#fafafa] rounded-3xl p-6 my-4 border border-slate-200">
      {/* Hero: Ultra Minimalist Luxury Circle */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden border border-slate-300 mx-auto shadow-sm p-1 bg-white">
            <img
              src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
              alt={birthday.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
            Refined Devotion
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-slate-900">
            Happy Birthday, <span className="font-normal italic">{birthday.name}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-sans tracking-wide">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Quiet moments, timeless thoughts, and pure elegance."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section className="font-sans">
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Minimal Poetry Sequence */}
      <section className="space-y-4 max-w-xl mx-auto text-center">
        {ELEGANT_POETRY.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs"
          >
            <p className="text-sm sm:text-base text-slate-700 italic font-medium">
              "{p.line}"
            </p>
          </motion.div>
        ))}
      </section>

      {/* Memory Gallery */}
      {birthday.memory_image_urls && birthday.memory_image_urls.length > 0 && (
        <section>
          <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
        </section>
      )}

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto space-y-3">
          <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-slate-400">
            A Quiet Birthday Message
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-800 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-sans font-bold text-slate-600 mt-4">
            — {birthday.sender_name}
          </p>
        </section>
      )}

      {/* Finale: Clean White Bloom */}
      <section className="text-center space-y-5 pt-6 pb-8 font-sans">
        {!minimalRevealed ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerMinimalGlow}
            className="px-8 py-4 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-sm shadow-md cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Flower className="w-4 h-4 text-pink-300" />
            <span>Send Elegant Birthday Blessings 🌸</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-white border border-slate-300 shadow-xl space-y-4 max-w-md mx-auto text-center"
          >
            <h3 className="text-2xl font-light text-slate-900 font-serif">
              {birthday.custom_ending_message || `Happy Birthday, ${birthday.name}.`}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Wishing you a year filled with calm joy, great adventures, and wonderful memories.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
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
                className="px-5 py-2 rounded-full text-xs font-black bg-slate-900 hover:bg-black text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

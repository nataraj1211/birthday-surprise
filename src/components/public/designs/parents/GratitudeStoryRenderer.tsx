import React, { useState } from 'react';
import { Sparkles, Share2, RotateCcw, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

const GRATITUDE_STATEMENTS = [
  {
    step: '01',
    highlight: 'You taught me to walk.',
    subtext: 'Holding my tiny hands when my steps were wobbly and the world seemed vast.',
  },
  {
    step: '02',
    highlight: 'You taught me to dream.',
    subtext: 'Believing in my passions when nobody else understood what I was reaching for.',
  },
  {
    step: '03',
    highlight: 'You taught me to never give up.',
    subtext: 'Showing me that courage is not the absence of fear, but standing back up after every fall.',
  },
  {
    step: '04',
    highlight: 'You taught me how to love.',
    subtext: 'By demonstrating unconditional patience, kindness, and selflessness every single day.',
  },
];

export const GratitudeStoryRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [gratitudeCompleted, setGratitudeCompleted] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const triggerGratitudeFinale = () => {
    setGratitudeCompleted(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#059669', '#10b981', '#34d399', '#fef08a'],
    });
  };

  return (
    <div className="relative space-y-20 pb-20 max-w-3xl mx-auto px-4 font-serif text-slate-800">
      {/* Hero: Minimalist Editorial Typography Tribute */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-slate-900 mx-auto shadow-2xl">
            <img
              src={birthday.profile_image_url || images[0]}
              alt={birthday.name}
              className="w-full h-full object-cover grayscale-[0.3] contrast-[1.05]"
            />
          </div>
        </div>

        <div className="space-y-3 max-w-lg mx-auto">
          <span className="text-xs font-sans font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Editorial Tribute
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-slate-950">
            A Story of Gratitude for <span className="font-bold underline decoration-emerald-500">{birthday.relationship_role || birthday.name}</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 italic">
            "Everything I am, and everything I will be, began with you."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Editorial Scroll Statements */}
      <section className="space-y-12">
        {GRATITUDE_STATEMENTS.map((stmt, idx) => (
          <motion.div
            key={stmt.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-xs font-sans font-black tracking-widest text-emerald-600">
              <span>STATEMENT {stmt.step}</span>
              <Quote className="w-4 h-4 text-emerald-400 opacity-60" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              "{stmt.highlight}"
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans font-medium">
              {stmt.subtext}
            </p>
            {images[idx % images.length] && (
              <div className="pt-4">
                <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-inner border border-slate-100">
                  <img src={images[idx % images.length]} alt="memory" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </section>

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-emerald-50/50 p-8 sm:p-10 rounded-3xl border border-emerald-200 space-y-4">
          <span className="text-xs font-sans font-black uppercase tracking-widest text-emerald-800">
            A Child's Lifelong Letter
          </span>
          <p className="whitespace-pre-line text-base sm:text-lg text-slate-800 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-sans font-bold text-emerald-700">
            — {birthday.sender_name} ❤️
          </p>
        </section>
      )}

      {/* Finale: Minimalist Golden Words */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!gratitudeCompleted ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerGratitudeFinale}
            className="px-8 py-4 rounded-full bg-slate-900 hover:bg-black text-white font-sans font-black text-base shadow-xl cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin text-emerald-400" />
            <span>Thank You, {birthday.relationship_role || 'Mom & Dad'} ❤️</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-10 rounded-3xl bg-slate-950 text-white border-2 border-emerald-400 shadow-2xl space-y-4 max-w-xl mx-auto"
          >
            <h3 className="text-2xl sm:text-4xl font-normal text-emerald-100">
              {birthday.custom_ending_message || `Thank You For Everything.`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans font-medium leading-relaxed">
              May you be blessed with infinite peace, radiant health, and immense pride in the life you have built.
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

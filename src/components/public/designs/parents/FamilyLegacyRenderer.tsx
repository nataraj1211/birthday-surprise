import React, { useState } from 'react';
import { Heart, Sparkles, Share2, RotateCcw, Shield, Award } from 'lucide-react';
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

const LEGACY_CARDS = [
  {
    icon: <Shield className="w-6 h-6 text-amber-500" />,
    title: 'My First Heroes 🛡️',
    description: 'You built a world of unconditional protection, warm guidance, and endless love around me since the day I opened my eyes.',
  },
  {
    icon: <Award className="w-6 h-6 text-amber-500" />,
    title: 'Your Sacrifices 🌟',
    description: 'The countless silent sacrifices, late nights, and quiet efforts you made just so our dreams could take flight.',
  },
  {
    icon: <Heart className="w-6 h-6 text-amber-500" />,
    title: 'Our Family Foundation 🏡',
    description: 'The values, empathy, kindness, and moral courage that you instilled in our hearts will be passed down for generations.',
  },
];

export const FamilyLegacyRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [legacyCelebrated, setLegacyCelebrated] = useState(false);

  const triggerGoldenBurst = () => {
    setLegacyCelebrated(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d97706', '#f59e0b', '#fbbf24', '#fef08a'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-serif text-slate-800">
      {/* Hero: Regal Family Crest & Hero Portrait */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-amber-700 via-amber-400 to-yellow-200 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/80 shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <Shield className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-sans font-black uppercase tracking-widest bg-amber-100 text-amber-800 border border-amber-300">
            <Award className="w-3.5 h-3.5" /> Family Legacy & Honor
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-amber-950">
            Happy Birthday, <span className="text-amber-700">{birthday.relationship_role || birthday.name}</span> ❤️
          </h1>
          <p className="text-sm sm:text-base text-amber-900/80 italic">
            "Everything I am, and everything I ever hope to be, started with you."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Legacy Tribute Cards */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-sans font-black uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Pillars of Strength
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Honoring Our Family Heroes 🏛️
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {LEGACY_CARDS.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-3xl bg-[#fffefc] border-2 border-amber-200/80 shadow-lg space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shadow-xs">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-amber-950">{card.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium">
                {card.description}
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

      {/* Thank You Letter */}
      {birthday.birthday_message && (
        <section className="bg-[#fffdfa] p-6 sm:p-8 rounded-3xl border-2 border-amber-200 shadow-md max-w-2xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
            <Heart className="w-4 h-4 text-amber-700 fill-current" /> A Child's Letter of Eternal Gratitude
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-sans font-bold text-amber-800 mt-4">
            — With boundless gratitude, {birthday.sender_name} ❤️
          </p>
        </section>
      )}

      {/* Finale: Golden Light Shower */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!legacyCelebrated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerGoldenBurst}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 text-white font-sans font-black text-base shadow-xl shadow-amber-800/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Celebrate Our Family Legacy & Blessings 🌟</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-[#fffefc] border-2 border-amber-300 shadow-2xl space-y-4 max-w-xl mx-auto"
          >
            <div className="w-14 h-14 rounded-full bg-amber-600 text-amber-100 mx-auto flex items-center justify-center text-2xl shadow-md">
              👑
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-950">
              {birthday.custom_ending_message || `Happy Birthday to My Greatest Inspiration!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans font-medium leading-relaxed">
              May this year shower you with robust health, boundless peace, laughter, and lifelong pride.
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
                className="px-5 py-2 rounded-full text-xs font-black bg-amber-700 hover:bg-amber-600 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

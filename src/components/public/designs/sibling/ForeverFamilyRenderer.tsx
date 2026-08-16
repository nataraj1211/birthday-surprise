import React, { useState } from 'react';
import { Heart, Sparkles, Share2, RotateCcw, Users } from 'lucide-react';
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

const FAMILY_BONDS = [
  {
    title: 'Born To Be A Team 🛡️',
    text: 'Before the outside world knew us, we were already partners navigating childhood together.',
  },
  {
    title: 'Unspoken Understanding 🤝',
    text: 'A single look across the table that explains everything without uttering a single syllable.',
  },
  {
    title: 'Safe Harbor in Storms 🌊',
    text: 'Knowing that whatever challenges arise, having you as a sibling means never facing the world alone.',
  },
  {
    title: 'Lifelong Anchor ⚓',
    text: 'Friends may come and go, but the bond we share by blood and soul will stand strong forever.',
  },
];

export const ForeverFamilyRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [bondCelebrated, setBondCelebrated] = useState(false);

  const triggerFamilyBond = () => {
    setBondCelebrated(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fda4af', '#f43f5e', '#ffe4e6'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-800">
      {/* Hero: Minimalist Sibling Silhouette & Quote */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-rose-700 via-pink-500 to-rose-200 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-rose-100 text-rose-800 border border-rose-300">
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" /> Forever Family Edition
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Happy Birthday, <span className="text-rose-600">{birthday.relationship_role || birthday.name}</span>! ❤️
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "No matter how much we fight, you will always be my person."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Sibling Bond Pillars */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Our Lifelong Promise
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Why You Are Irreplaceable 💖
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FAMILY_BONDS.map((bond, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-3xl bg-white border border-rose-200 shadow-md space-y-2"
            >
              <h3 className="font-bold text-lg text-slate-900">{bond.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {bond.text}
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

      {/* Letter */}
      {birthday.birthday_message && (
        <section className="bg-rose-50/50 p-6 sm:p-8 rounded-3xl border border-rose-200 shadow-sm max-w-2xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-rose-950 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-600 fill-current" /> A Heartfelt Sibling Letter
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-bold text-rose-800 mt-4">
            — Forever your sibling, {birthday.sender_name} ❤️
          </p>
        </section>
      )}

      {/* Finale */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!bondCelebrated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerFamilyBond}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-black text-base shadow-xl shadow-rose-600/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Celebrate Our Lifelong Sibling Bond 💖</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-rose-950 to-slate-950 text-white border-2 border-rose-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="w-14 h-14 rounded-full bg-rose-600 text-white mx-auto flex items-center justify-center text-2xl shadow-md">
              ❤️
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-rose-100">
              {birthday.custom_ending_message || `Happy Birthday to My Person, ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-rose-200/90 font-medium leading-relaxed">
              No matter where life takes us or how far we travel, you will always have a special home in my heart.
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
                className="px-5 py-2 rounded-full text-xs font-black bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

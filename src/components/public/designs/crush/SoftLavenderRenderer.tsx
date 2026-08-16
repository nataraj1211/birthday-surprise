import React, { useState } from 'react';
import { Heart, Sparkles, Share2, RotateCcw, Feather } from 'lucide-react';
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

const SWEET_ADMIRATIONS = [
  { id: '1', title: 'Your Soft Laughter 🌸', desc: 'The most calming melody that instantly turns any stressful day around.' },
  { id: '2', title: 'The Kindness in Your Eyes ✨', desc: 'How genuinely you look at the world, always finding the good in people.' },
  { id: '3', title: 'Unfiltered Grace 🌿', desc: 'The effortless way you carry yourself with warmth, humility, and charm.' },
  { id: '4', title: 'Every Shared Glance 💫', desc: 'Those quiet fleeting seconds where time seems to slow down just for a beat.' },
];

export const SoftLavenderRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [petalsBloomed, setPetalsBloomed] = useState(false);

  const triggerPetalShower = () => {
    setPetalsBloomed(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c084fc', '#e879f9', '#f472b6', '#fed7aa'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-800">
      {/* Hero: Dreamy Lavender Halo */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="absolute -inset-4 rounded-full bg-purple-300/30 blur-2xl animate-pulse" />

          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-purple-400 via-pink-300 to-indigo-300 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <Feather className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-purple-100 text-purple-800 border border-purple-300">
            <Heart className="w-3.5 h-3.5 fill-purple-500 text-purple-500" /> Soft Lavender Dreams
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Happy Birthday, <span className="text-purple-600">{birthday.name}</span> 🌸
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}A gentle birthday wish for someone truly extraordinary."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Sweet Admirations Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Quiet Thoughts
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Things That Make You Special ✨
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SWEET_ADMIRATIONS.map((adm) => (
            <motion.div
              key={adm.id}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-3xl bg-white border border-purple-200 shadow-md space-y-2"
            >
              <h3 className="font-bold text-lg text-purple-950">{adm.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {adm.desc}
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
        <section className="bg-purple-50/50 p-6 sm:p-8 rounded-3xl border border-purple-200 shadow-sm max-w-2xl mx-auto space-y-3 font-serif">
          <h3 className="text-lg font-bold text-purple-950 flex items-center gap-2">
            <Heart className="w-4 h-4 text-purple-600 fill-current" /> A Note From the Heart
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-sans font-bold text-purple-800 mt-4">
            — {birthday.sender_name} 🌸
          </p>
        </section>
      )}

      {/* Finale: Lavender Bloom */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!petalsBloomed ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerPetalShower}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-400 text-white font-black text-base shadow-xl shadow-purple-500/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Send a Soft Lavender Petal Bloom 🌸</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-purple-950 text-white border-2 border-purple-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="w-14 h-14 rounded-full bg-purple-600 text-white mx-auto flex items-center justify-center text-2xl shadow-md">
              🌸
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-purple-100">
              {birthday.custom_ending_message || `Happy Birthday, ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/90 font-medium leading-relaxed">
              May your special day be as sweet, radiant, and wonderful as your presence is to everyone around you.
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

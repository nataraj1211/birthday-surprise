import React, { useState } from 'react';
import { Globe, Orbit, Sparkles, Share2, RotateCcw } from 'lucide-react';
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

const COSMIC_ORBITS = [
  { orbit: 'Orbit I', planet: 'Planet Radiance 🪐', desc: 'Emitting warmth, brilliance, and positive energy to everyone within lightyears.' },
  { orbit: 'Orbit II', planet: 'Nebula of Kindness ✨', desc: 'A boundless heart that provides comfort and peace in a chaotic galaxy.' },
  { orbit: 'Orbit III', planet: 'Pulsar of Ambition 🚀', desc: 'A drive and passion that propels you toward achieving every single dream.' },
  { orbit: 'Orbit IV', planet: 'Solar Core of Joy ☀️', desc: 'The central star whose presence brightens up our entire universe.' },
];

export const GalaxyUniverseRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [nebulaExploded, setNebulaExploded] = useState(false);

  const triggerSupernova = () => {
    setNebulaExploded(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ec4899', '#38bdf8', '#fbbf24', '#ffffff'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-100 bg-slate-950 rounded-3xl p-4 sm:p-6 my-4 border border-purple-500/30">
      {/* Hero: Planetary Rings & Stellar Core */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          {/* Planet Orbit Ring */}
          <div className="absolute -inset-8 rounded-full border-2 border-dashed border-purple-400/40 animate-spin" style={{ animationDuration: '30s' }} />

          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-indigo-900 via-purple-600 to-pink-500 shadow-2xl flex items-center justify-center shadow-purple-900/80">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-purple-200 shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-purple-600 text-amber-300 flex items-center justify-center shadow-lg border-2 border-slate-950">
              <Orbit className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-purple-950 text-purple-300 border border-purple-500/40">
            <Globe className="w-3.5 h-3.5" /> Cosmic Galaxy Expedition
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Happy Birthday, <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">{birthday.name}</span>! 🌌
          </h1>
          <p className="text-sm sm:text-base font-semibold text-purple-200/80 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}The center of our universe on your special day."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section className="bg-slate-900 rounded-2xl p-4 border border-purple-500/20">
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Cosmic Orbits Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-400 bg-pink-950 px-3 py-1 rounded-full border border-pink-800">
            Celestial Bodies
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Planetary Highlights of Your Aura 🪐
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {COSMIC_ORBITS.map((orb, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/30 shadow-lg space-y-2 backdrop-blur-md"
            >
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest block">
                {orb.orbit}
              </span>
              <h3 className="font-bold text-lg text-white">{orb.planet}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {orb.desc}
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
        <section className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-purple-500/30 space-y-3 font-serif">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> Cosmic Message Transmission
          </div>
          <p className="whitespace-pre-line text-sm sm:text-base text-purple-100 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-sans font-bold text-pink-400 mt-4">
            — {birthday.sender_name} 🌌
          </p>
        </section>
      )}

      {/* Finale: Supernova Nebula */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!nebulaExploded ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerSupernova}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-black text-base shadow-2xl shadow-purple-600/40 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin text-amber-300" />
            <span>Ignite The Birthday Supernova Nebula 🌠</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-900 border-2 border-purple-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="text-4xl text-amber-300">🌌 🌠 🪐</div>
            <h3 className="text-2xl sm:text-3xl font-black text-purple-200">
              {birthday.custom_ending_message || `Happy Birthday, My Star ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              May your orbit be full of peace, wonder, and endless astronomical joy.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
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

import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Sparkles, Share2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

const MAP_STOPS = [
  { id: '1', name: 'Stop 01: The Day We Met 📍', coordinates: 'Ground Zero', desc: 'Where the journey kicked off. Two complete strangers destined to become best friends.' },
  { id: '2', name: 'Stop 02: Favorite Hangout Spot ☕', coordinates: 'Our Secret HQ', desc: 'The café corner where hundreds of hours were spent gossiping, planning trips, and laughing.' },
  { id: '3', name: 'Stop 03: The Epic Road Trip 🚗', coordinates: 'Wanderlust Highway', desc: 'Blasting our playlist with windows rolled down and making wrong turns that turned into the best adventures.' },
  { id: '4', name: 'Stop 04: Next Destination 🚀', coordinates: 'Future & Beyond', desc: 'The world is wide open and our next epic journey is already loading on the map.' },
];

export const AdventureMapRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [activeStop, setActiveStop] = useState<number>(0);
  const [compassCelebrated, setCompassCelebrated] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const triggerAdventureFinale = () => {
    setCompassCelebrated(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#0d9488', '#0284c7', '#f59e0b', '#10b981'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-800">
      {/* Hero: Travel Adventure Roadmap */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-teal-700 via-cyan-500 to-amber-300 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
              <img
                src={birthday.profile_image_url || images[0]}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg border-2 border-white animate-spin" style={{ animationDuration: '15s' }}>
              <Compass className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-teal-100 text-teal-800 border border-teal-300">
            <Navigation className="w-3.5 h-3.5" /> Friendship Adventure Roadmap
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Happy Birthday, <span className="text-teal-600">{birthday.name}</span>! 🗺️
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Here is to every waypoint and every horizon we cross together."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Interactive Map Stops */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Waypoints
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Our Journey Stops On The Map 📌
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MAP_STOPS.map((stop, idx) => {
            const isSelected = activeStop === idx;
            return (
              <motion.div
                key={stop.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveStop(idx)}
                className={`p-5 rounded-3xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-teal-900 text-white border-teal-400 shadow-xl shadow-teal-950/20'
                    : 'bg-white border-slate-200 hover:border-teal-300 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${isSelected ? 'bg-teal-700 text-teal-100' : 'bg-slate-100 text-slate-600'}`}>
                    {stop.coordinates}
                  </span>
                  <MapPin className={`w-4 h-4 ${isSelected ? 'text-amber-300 fill-current' : 'text-teal-600'}`} />
                </div>
                <h3 className="font-extrabold text-base mb-1">{stop.name}</h3>
                <p className={`text-xs leading-relaxed font-medium ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                  {stop.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Stop Photo Spotlight */}
        <div className="p-6 rounded-3xl bg-white border border-teal-200 shadow-lg flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-full sm:w-64 h-52 rounded-2xl overflow-hidden shadow-inner border border-slate-100 flex-shrink-0">
            <img src={images[activeStop % images.length]} alt="adventure" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-teal-600">
              FEATURED WAYPOINT #{activeStop + 1}
            </span>
            <h3 className="text-xl font-bold text-slate-900">{MAP_STOPS[activeStop].name}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {MAP_STOPS[activeStop].desc}
            </p>
            <p className="text-xs font-bold text-teal-700 pt-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Next Adventure Loading in 2026...
            </p>
          </div>
        </div>
      </section>

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-teal-50/50 p-6 sm:p-8 rounded-3xl border border-teal-200 shadow-sm max-w-2xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-teal-950 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-teal-700" /> Travel Log Letter
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-bold text-teal-800 mt-4">
            — Your co-explorer, {birthday.sender_name} 🌍
          </p>
        </section>
      )}

      {/* Finale */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!compassCelebrated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerAdventureFinale}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 text-white font-black text-base shadow-xl shadow-teal-600/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Compass className="w-5 h-5 animate-spin" />
            <span>Spin The Compass to New Adventures 🧭</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-teal-950 text-white border-2 border-teal-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="w-14 h-14 rounded-full bg-teal-500 text-slate-950 mx-auto flex items-center justify-center text-2xl font-black shadow-md">
              📍
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-teal-200">
              {birthday.custom_ending_message || `Happy Birthday, My Travel Partner ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-teal-100/90 font-medium leading-relaxed">
              Every turn on this map has been memorable because of you. Ready for the next coordinates!
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
                className="px-5 py-2 rounded-full text-xs font-black bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

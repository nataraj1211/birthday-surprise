import React, { useState } from 'react';
import { MapPin, Navigation, Sparkles, Share2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

const CAMPUS_SPOTS = [
  { id: '1', name: 'The College Canteen ☕', tag: 'Food & Gossip HQ', desc: 'Where half of our college fees actually went. Endless plates of samosas, maggi, and laughing until class was over.' },
  { id: '2', name: 'The Back Benches 😴', tag: 'Stealth Nap Zone', desc: 'The most coveted real estate in every lecture hall. Perfect for whisper jokes and pretending to take notes.' },
  { id: '3', name: 'The Library Naps 📚', tag: 'Air Conditioned Haven', desc: 'We came to study for 5 minutes and ended up having the deepest nap of the semester.' },
  { id: '4', name: 'The Main Gate Bunk 🏃', tag: 'Freedom Escape Route', desc: 'Sneaking out after attendance to grab street food and make memories that were never in the syllabus.' },
];

export const CampusMapRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [activeSpot, setActiveSpot] = useState<number>(0);
  const [campusCelebrated, setCampusCelebrated] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const triggerCampusPinExplosion = () => {
    setCampusCelebrated(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#0d9488', '#0284c7', '#10b981', '#f59e0b'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-800">
      {/* Hero: Blueprint Campus Aerial Map */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-teal-700 via-emerald-500 to-cyan-400 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
              <img
                src={birthday.profile_image_url || images[0]}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <Navigation className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-teal-100 text-teal-800 border border-teal-300">
            <MapPin className="w-3.5 h-3.5" /> Campus Blueprint Navigator
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Happy Birthday, <span className="text-teal-600">{birthday.name}</span>! 🏫
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Revisiting every landmark where we made campus history."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Campus Map Spots */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Campus Hotspots
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Our Campus Blueprint 🗺️
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CAMPUS_SPOTS.map((spot, idx) => {
            const isSelected = activeSpot === idx;
            return (
              <motion.div
                key={spot.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveSpot(idx)}
                className={`p-5 rounded-3xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-teal-900 text-white border-teal-400 shadow-xl'
                    : 'bg-white border-slate-200 hover:border-teal-300 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${isSelected ? 'bg-teal-700 text-teal-100' : 'bg-slate-100 text-slate-600'}`}>
                    {spot.tag}
                  </span>
                  <MapPin className={`w-4 h-4 ${isSelected ? 'text-amber-300 fill-current' : 'text-teal-600'}`} />
                </div>
                <h3 className="font-extrabold text-base mb-1">{spot.name}</h3>
                <p className={`text-xs leading-relaxed font-medium ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                  {spot.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Campus Spot Feature */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-teal-200 shadow-lg flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-full sm:w-64 h-56 rounded-2xl overflow-hidden shadow-inner border border-slate-100 flex-shrink-0">
            <img src={images[activeSpot % images.length]} alt="spot" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-teal-600">
              CAMPUS HOTSPOT #{activeSpot + 1}
            </span>
            <h3 className="text-xl font-bold text-slate-900">{CAMPUS_SPOTS[activeSpot].name}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {CAMPUS_SPOTS[activeSpot].desc}
            </p>
          </div>
        </div>
      </section>

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-teal-50/60 p-6 sm:p-8 rounded-3xl border border-teal-200 shadow-sm max-w-2xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-teal-950 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-teal-700" /> Campus Memoirs Letter
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-bold text-teal-800 mt-4">
            — {birthday.sender_name} 🏫
          </p>
        </section>
      )}

      {/* Finale */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!campusCelebrated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerCampusPinExplosion}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 text-white font-black text-base shadow-xl shadow-teal-600/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Award Campus Legend Certificate 🎓</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-teal-950 text-white border-2 border-teal-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="text-4xl">🏫 🏆 🎉</div>
            <h3 className="text-2xl sm:text-3xl font-black text-teal-200">
              {birthday.custom_ending_message || `Happy Birthday to My Campus Partner ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-teal-100/90 font-medium leading-relaxed">
              Every corner of the university was more fun because you were there with me.
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

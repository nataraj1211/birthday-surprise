import React, { useState } from 'react';
import { History, Clock, Sparkles, Share2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

const TIME_ERAS = [
  { era: 'Childhood', years: 'The Early Days', title: 'Diapers, Toys & Stolen Snacks 🍼', desc: 'When our biggest worry was who got to hold the TV remote and fighting over toys on the carpet.' },
  { era: 'School Days', years: 'Growing Up', title: 'School Bus Chaos & Homework Help 🎒', desc: 'Covering up for each other at home, walking to the bus stop, and pretending we were innocent.' },
  { era: 'Teenage Years', years: 'Chaos & Rebellion', title: 'Late Night Talks & Drama 🎸', desc: 'Surviving teenage angst, sharing playlists, laughing at old photos, and becoming each other\'s safe haven.' },
  { era: 'Today', years: 'Inseparable Adults', title: 'Lifelong Best Friends 👑', desc: 'We grew up into adults, but whenever we are in the same room, we instantly become those same silly kids again.' },
];

export const ChildhoodTimeMachineRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [selectedEra, setSelectedEra] = useState<number>(0);
  const [warpCelebrated, setWarpCelebrated] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const triggerTimeWarp = () => {
    setWarpCelebrated(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#0284c7', '#38bdf8', '#fbbf24', '#f43f5e'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-800">
      {/* Hero: Retro Time Scrubber */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-sky-600 via-blue-500 to-indigo-700 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
              <img
                src={birthday.profile_image_url || images[0]}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-lg border-2 border-white animate-spin" style={{ animationDuration: '20s' }}>
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-sky-100 text-sky-800 border border-sky-300">
            <History className="w-3.5 h-3.5" /> Sibling Time Machine
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Happy Birthday, <span className="text-sky-600">{birthday.relationship_role || birthday.name}</span>! ⏳
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}A journey through time from childhood mischief to today."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Interactive Time Eras */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Decade Scrubber
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Scrub Through Our Growing Up Eras 🕰️
          </h2>
        </div>

        {/* Era Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TIME_ERAS.map((era, idx) => {
            const isSelected = selectedEra === idx;
            return (
              <button
                key={era.era}
                type="button"
                onClick={() => setSelectedEra(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-sky-600 text-white border-sky-400 shadow-xl shadow-sky-600/30 scale-[1.02]'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-sky-300'
                }`}
              >
                <span className={`text-[10px] font-black uppercase tracking-wider block ${isSelected ? 'text-sky-100' : 'text-sky-600'}`}>
                  {era.years}
                </span>
                <span className="text-sm font-black block mt-1">
                  {era.era}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Era Spotlight */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-sky-200 shadow-xl flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-full sm:w-64 h-56 rounded-2xl overflow-hidden shadow-inner border border-slate-100 flex-shrink-0">
            <img src={images[selectedEra % images.length]} alt="era" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-sky-600">
              ERA {selectedEra + 1} OF {TIME_ERAS.length}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">{TIME_ERAS[selectedEra].title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {TIME_ERAS[selectedEra].desc}
            </p>
          </div>
        </div>
      </section>

      {/* Birthday Message */}
      {birthday.birthday_message && (
        <section className="bg-sky-50/60 p-6 sm:p-8 rounded-3xl border border-sky-200 shadow-sm max-w-2xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-sky-950 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600" /> A Lifelong Sibling Message
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-bold text-sky-800 mt-4">
            — Forever your sibling, {birthday.sender_name} ❤️
          </p>
        </section>
      )}

      {/* Finale */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!warpCelebrated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerTimeWarp}
            className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white font-black text-sm sm:text-base shadow-xl shadow-sky-600/30 cursor-pointer inline-flex items-center justify-center gap-2.5 max-w-full text-center transition-all"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-spin flex-shrink-0" />
            <span>Engage Sibling Time Warp 🚀</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-950 text-white border-2 border-sky-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="w-14 h-14 rounded-full bg-sky-500 text-slate-950 mx-auto flex items-center justify-center text-2xl font-black shadow-md">
              ⏳
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-sky-200">
              {birthday.custom_ending_message || `Happy Birthday, My Lifelong Sibling ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Decades may pass, but our childhood memories will always remain timeless and golden.
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
                className="px-5 py-2 rounded-full text-xs font-black bg-sky-500 hover:bg-sky-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

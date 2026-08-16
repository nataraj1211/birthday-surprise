import React, { useState } from 'react';
import { Moon, Star, Sparkles, Share2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';
import { MemoryGallery } from '../../MemoryGallery';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

const MIDNIGHT_SECTIONS = [
  {
    id: 'met',
    badge: 'Chapter 01',
    title: 'The Day I Met You 🌙',
    quote: 'Under a sky full of stars, my universe shifted the moment you walked in.',
    detail: 'I still remember the exact feelings, the nervous smiles, and the way ordinary time seemed to freeze. You brought colors into my world that I never knew existed.',
  },
  {
    id: 'journey',
    badge: 'Chapter 02',
    title: 'Our Midnight Journey 🌌',
    quote: 'From spontaneous late night drives to whispering our deepest secrets.',
    detail: 'Every single midnight conversation, long call, and shared song has woven into a constellation of memories that I cherish every single day.',
  },
  {
    id: 'moments',
    badge: 'Chapter 03',
    title: 'Moments I Never Forget ✨',
    quote: 'Small, quiet moments that hold more weight than a million grand gestures.',
    detail: 'The gentle smiles across the room, comforting handholds, quiet laughter, and knowing that having you by my side makes anywhere feel like home.',
  },
  {
    id: 'future',
    badge: 'Chapter 04',
    title: 'Things I Want To Tell You 💫',
    quote: 'You are my favorite thought before falling asleep and my brightest reason to wake up.',
    detail: 'May this birthday remind you how deeply treasured, admired, and loved you are. I promise to stand by your side under every starry sky ahead.',
  },
];

export const MidnightLoveRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [activeChapter, setActiveChapter] = useState<string>('met');
  const [revealedStars, setRevealedStars] = useState(false);

  const triggerNightSkyBurst = () => {
    setRevealedStars(true);
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ec4899', '#38bdf8', '#fbbf24', '#ffffff'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 text-slate-100 font-sans">
      {/* Ambient Starlight Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
      <div className="absolute top-96 right-10 w-72 h-72 rounded-full bg-pink-600/15 blur-3xl pointer-events-none" />

      {/* Hero: Glowing Moon & Celestial Halo */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6 relative z-10"
      >
        <div className="relative inline-block mx-auto">
          {/* Orbiting Moon & Star Halo */}
          <div className="absolute -inset-6 rounded-full border-2 border-dashed border-purple-400/30 animate-spin" style={{ animationDuration: '40s' }} />
          <div className="absolute -top-3 -right-2 w-8 h-8 rounded-full bg-gradient-to-tr from-amber-200 to-yellow-400 flex items-center justify-center text-slate-950 shadow-lg shadow-yellow-400/50 animate-pulse">
            <Moon className="w-4 h-4 fill-current" />
          </div>

          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-indigo-900 via-purple-700 to-pink-500 shadow-2xl shadow-purple-900/60 flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-purple-200/50 shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-purple-950/80 text-purple-300 border border-purple-500/40 backdrop-blur-md shadow-lg shadow-purple-950/50">
            <Star className="w-3.5 h-3.5 fill-purple-400 text-purple-400" /> Midnight Love Constellation
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Happy Birthday, <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">{birthday.name}</span> 🌌
          </h1>
          <p className="text-sm sm:text-base font-medium text-purple-200/80 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Written in the midnight stars, just for you."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* 4 Themed Chapters: Met, Journey, Moments, Future */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-pink-400 bg-pink-950/60 px-3 py-1 rounded-full border border-pink-800">
            Midnight Chronicles
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Our Constellation of Moments 💫
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Click any chapter below to explore our starry journey together.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {MIDNIGHT_SECTIONS.map((sec) => {
            const isSelected = activeChapter === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveChapter(sec.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-900 to-indigo-950 border-purple-400 shadow-lg shadow-purple-950/80 text-white scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-purple-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-[10px] font-black uppercase tracking-wider block opacity-70">
                  {sec.badge}
                </span>
                <span className="text-xs sm:text-sm font-bold truncate block mt-0.5">
                  {sec.title.split(' ')[0]} {sec.title.split(' ')[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Details Card */}
        <AnimatePresence mode="wait">
          {(() => {
            const active = MIDNIGHT_SECTIONS.find((s) => s.id === activeChapter) || MIDNIGHT_SECTIONS[0];
            return (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900/90 via-purple-950/60 to-slate-950/90 border border-purple-500/30 shadow-2xl backdrop-blur-xl space-y-4"
              >
                <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/20">
                    {active.badge}
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">{active.title}</h3>
                <p className="text-sm font-semibold text-purple-200 italic leading-relaxed">
                  "{active.quote}"
                </p>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed pt-2 border-t border-purple-900/50">
                  {active.detail}
                </p>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </section>

      {/* Memory Gallery */}
      {birthday.memory_image_urls && birthday.memory_image_urls.length > 0 && (
        <section>
          <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
        </section>
      )}

      {/* Real-time Love Letter */}
      {birthday.birthday_message && (
        <section className="bg-slate-900/70 rounded-3xl p-2 border border-purple-900/40">
          <div className="text-center py-4">
            <span className="text-xs font-black uppercase tracking-widest text-purple-400 bg-purple-950 px-3 py-1 rounded-full border border-purple-800">
              Midnight Letter
            </span>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-950/30 to-slate-950/60 border border-purple-500/20">
            <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-purple-100 font-medium font-serif">
              {birthday.birthday_message}
            </p>
            <p className="text-right text-xs font-bold text-pink-400 mt-4">
              — With endless love, {birthday.sender_name} ❤️
            </p>
          </div>
        </section>
      )}

      {/* Surprise Finale: Night Sky Stardust Reveal */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!revealedStars ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerNightSkyBurst}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-black text-base sm:text-lg shadow-2xl shadow-purple-600/50 hover:shadow-purple-600/70 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Star className="w-5 h-5 fill-current animate-pulse text-amber-300" />
            <span>Illuminate Your Midnight Constellation 🌌</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white border-2 border-purple-400/50 shadow-2xl space-y-4 max-w-xl mx-auto"
          >
            <div className="w-14 h-14 rounded-full bg-purple-600 text-amber-300 mx-auto flex items-center justify-center text-2xl shadow-lg shadow-purple-500/50">
              <Moon className="w-7 h-7 fill-current" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-purple-100">
              {birthday.custom_ending_message || `Happy Birthday, My Star ${birthday.name}! ✨`}
            </h3>
            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed font-medium">
              You make my midnight sky brighter than a billion stars. Here is to another magical year together.
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

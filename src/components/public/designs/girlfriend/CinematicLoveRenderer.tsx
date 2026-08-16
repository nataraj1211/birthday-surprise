import React, { useState } from 'react';
import { Film, Clapperboard, Star, Share2, RotateCcw, Play } from 'lucide-react';
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

const CINEMATIC_CHAPTERS = [
  {
    chapter: '01',
    title: 'The Beginning',
    tagline: 'Scene 1: When Destiny Wrote Our First Frame',
    description: 'Two worlds collided in the most serendipitous plot twist. The moment our eyes met, the music started playing in the background.',
  },
  {
    chapter: '02',
    title: 'The Memories',
    tagline: 'Scene 2: Unfiltered Laughter & Road Trips',
    description: 'A montage of unforgettable scenes: singing songs out of key, late night conversations, and golden hour sunsets together.',
  },
  {
    chapter: '03',
    title: 'The Journey',
    tagline: 'Scene 3: Through Thick, Thin & Every Plot Turn',
    description: 'Supporting each other through every challenge, growing closer with each scene, and building a bond stronger than cinema.',
  },
  {
    chapter: '04',
    title: 'Forever & Beyond',
    tagline: 'Scene 4: The Sequel That Never Ends',
    description: 'Here is to the infinite sequels ahead — more adventures, deeper love, and a story that only gets better with every passing year.',
  },
];

export const CinematicLoveRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [creditsRolling, setCreditsRolling] = useState(false);

  const triggerCredits = () => {
    setCreditsRolling(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#f59e0b', '#fbbf24', '#ffffff'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 text-slate-100 font-sans">
      {/* Hero: Movie Poster Aesthetic */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative rounded-3xl overflow-hidden border-2 border-rose-500/30 shadow-2xl bg-zinc-950 max-w-md mx-auto group">
          {/* Film Grain & Top Badge */}
          <div className="p-3 bg-gradient-to-r from-zinc-900 via-rose-950 to-zinc-900 border-b border-rose-500/20 flex items-center justify-between text-[11px] font-mono font-bold tracking-widest text-rose-300">
            <span className="flex items-center gap-1">
              <Clapperboard className="w-3.5 h-3.5 text-rose-400" /> PRODUCTION NO. {birthday.birthday_date.replace(/-/g, '')}
            </span>
            <span className="text-amber-400">★ ★ ★ ★ ★</span>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden bg-black">
            <img
              src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
              alt={birthday.name}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

            <div className="absolute bottom-6 inset-x-6 space-y-1 text-left">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-600/80 text-white backdrop-blur-md inline-block">
                STARRING {birthday.name.toUpperCase()}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight font-serif tracking-wide">
                A LOVE STORY LIKE NO OTHER
              </h2>
              <p className="text-xs text-rose-200 font-mono">DIRECTED BY {birthday.sender_name.toUpperCase()}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-rose-950/80 text-rose-300 border border-rose-500/30">
            <Film className="w-3.5 h-3.5 text-rose-400" /> Cinematic Love Premiere
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Happy Birthday, <span className="text-rose-400">{birthday.name}</span>! 🎬
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-rose-200/80 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}In the movie of my life, you are the leading lady."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* 35mm Film Chapters: Chapter 01 to 04 */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800">
            Film Sequence
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Our Chapters in Cinema 🎞️
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Click through our movie chapters to revisit our storyline.
          </p>
        </div>

        {/* Chapter Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CINEMATIC_CHAPTERS.map((chap, idx) => {
            const isSelected = activeChapter === idx;
            return (
              <button
                key={chap.chapter}
                type="button"
                onClick={() => setActiveChapter(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-rose-950 to-zinc-900 border-rose-500 shadow-xl shadow-rose-950 text-white scale-[1.02]'
                    : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest block">
                  CHAPTER {chap.chapter}
                </span>
                <span className="text-sm font-black text-white block mt-1">
                  {chap.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Details */}
        {(() => {
          const current = CINEMATIC_CHAPTERS[activeChapter];
          return (
            <motion.div
              key={current.chapter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-rose-950 border border-rose-500/30 shadow-2xl space-y-3"
            >
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  SCENE {current.chapter} / 04
                </span>
                <Play className="w-4 h-4 text-rose-400 fill-current" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-serif">{current.tagline}</h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">
                {current.description}
              </p>
            </motion.div>
          );
        })()}
      </section>

      {/* Memory Gallery */}
      {birthday.memory_image_urls && birthday.memory_image_urls.length > 0 && (
        <section>
          <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
        </section>
      )}

      {/* Real-time Letter */}
      {birthday.birthday_message && (
        <section className="bg-zinc-900/90 p-6 sm:p-8 rounded-3xl border border-rose-500/20 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Film className="w-4 h-4" /> Director's Special Note
          </div>
          <p className="whitespace-pre-line text-sm sm:text-base text-zinc-200 font-serif leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-mono font-bold text-rose-400">
            — {birthday.sender_name} ❤️
          </p>
        </section>
      )}

      {/* Finale: Movie Credit Rolling */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!creditsRolling ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerCredits}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white font-black text-base shadow-2xl shadow-rose-600/50 hover:shadow-rose-600/70 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Star className="w-5 h-5 fill-current animate-pulse text-yellow-300" />
            <span>Roll Cinematic Birthday Credits 🎬</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-black border-2 border-rose-500/40 shadow-2xl space-y-4 max-w-xl mx-auto font-mono text-center"
          >
            <div className="text-amber-400 text-xs uppercase tracking-widest">
              ★ OFFICIAL BIRTHDAY CREDITS ★
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-serif">
              {birthday.custom_ending_message || `Happy Birthday to the Star of My Life, ${birthday.name}!`}
            </h3>
            <div className="space-y-1 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
              <p>Best Smile Award: <strong>{birthday.name}</strong></p>
              <p>Kindest Soul Award: <strong>{birthday.name}</strong></p>
              <p>Forever Co-Star: <strong>{birthday.sender_name}</strong></p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-4">
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-1.5 transition-all cursor-pointer font-sans"
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
                className="px-5 py-2 rounded-full text-xs font-black bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer font-sans"
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

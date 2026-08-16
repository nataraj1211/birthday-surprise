import React, { useState } from 'react';
import { Sparkles, Share2, RotateCcw, Heart, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

const MEMORY_BUBBLES = [
  { id: '1', title: 'Golden Laughter 🌟', text: 'Those moments where time stopped and laughter took over the entire room.' },
  { id: '2', title: 'Quiet Understanding 💫', text: 'Knowing you are always there with comforting words and genuine empathy.' },
  { id: '3', title: 'Shared Dreams 🌙', text: 'Talking about our wildest hopes and encouraging each other along the way.' },
  { id: '4', title: 'Endless Inspiration 🚀', text: 'How your passion, curiosity, and drive continuously inspire everyone.' },
];

export const MemoryUniverseRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [poppedBubbles, setPoppedBubbles] = useState<Record<string, boolean>>({});
  const [universeCelebrated, setUniverseCelebrated] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const popBubble = (id: string) => {
    setPoppedBubbles((p) => ({ ...p, [id]: true }));
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#818cf8', '#c084fc', '#f472b6'],
    });
  };

  const triggerUniverseFinale = () => {
    setUniverseCelebrated(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#c084fc', '#f472b6', '#fde047'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-100 bg-slate-950 rounded-3xl p-4 sm:p-6 my-4 border border-cyan-500/30">
      {/* Hero: Floating Orb & Cosmic Glow */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="absolute -inset-6 rounded-full bg-cyan-500/20 blur-2xl animate-pulse" />

          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-cyan-600 via-indigo-600 to-pink-500 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-200 shadow-inner">
              <img
                src={birthday.profile_image_url || images[0]}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg border-2 border-white">
              <Radio className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-cyan-950 text-cyan-300 border border-cyan-500/40">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Floating Memory Universe
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Happy Birthday, <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{birthday.name}</span>! 🫧
          </h1>
          <p className="text-sm sm:text-base font-semibold text-cyan-200/80 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Pop each memory bubble to explore our universe."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section className="bg-slate-900 rounded-2xl p-4 border border-cyan-500/20">
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Interactive Floating Memory Bubbles */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            Memory Sphere
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Tap Bubbles to Pop & Unfold 🎈
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MEMORY_BUBBLES.map((bubble) => {
            const isPopped = !!poppedBubbles[bubble.id];
            return (
              <motion.div
                key={bubble.id}
                onClick={() => popBubble(bubble.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${
                  isPopped
                    ? 'bg-gradient-to-br from-cyan-950 via-slate-900 to-purple-950 border-cyan-400 shadow-xl shadow-cyan-950/40 text-white'
                    : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    ORB #{bubble.id}
                  </span>
                  <span className="text-xs font-mono">{isPopped ? 'POPPED 💥' : 'FLOAT 🫧'}</span>
                </div>
                <h3 className="font-extrabold text-base mb-1 text-white">{bubble.title}</h3>
                {isPopped ? (
                  <p className="text-xs sm:text-sm text-cyan-100 pt-2 border-t border-cyan-800/50 leading-relaxed">
                    {bubble.text}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 font-mono mt-1">Tap to pop memory orb 🫧</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-3 font-serif">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            <Heart className="w-4 h-4 text-cyan-400 fill-current" /> Universe Dedication Letter
          </div>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-200 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-mono font-bold text-cyan-400 mt-4">
            — {birthday.sender_name} 🫧
          </p>
        </section>
      )}

      {/* Finale */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!universeCelebrated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerUniverseFinale}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white font-black text-base shadow-2xl shadow-cyan-500/40 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Illuminate The Grand Memory Cosmos 🌌</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-900 border-2 border-cyan-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="text-4xl text-cyan-300">🫧 🌌 💖</div>
            <h3 className="text-2xl sm:text-3xl font-black text-cyan-200">
              {birthday.custom_ending_message || `Happy Birthday to My Favorite Person ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              May your memory universe always be full of happiness, radiant milestones, and genuine love.
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
                className="px-5 py-2 rounded-full text-xs font-black bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

import React, { useState } from 'react';
import { Zap, PartyPopper, Share2, RotateCcw, Flame } from 'lucide-react';
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

const INSIDE_JOKES = [
  { id: '1', title: 'The "5 Minutes Away" Lie 🚗', punchline: 'When you say you are leaving now but haven\'t even gotten in the shower.' },
  { id: '2', title: 'Late Night Snack Raids 🍕', punchline: 'Ordering 2 AM pizza and pretending we are living our healthiest lifestyle.' },
  { id: '3', title: 'Telepathic Eye Contact 👀', punchline: 'Looking at each other across the room and instantly knowing what the tea is.' },
  { id: '4', title: 'The Shared 1 Braincell 🧠', punchline: 'Operating on pure chaotic energy and miraculously surviving every bad idea.' },
];

export const ChaosModeRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [openedJokes, setOpenedJokes] = useState<Record<string, boolean>>({});
  const [chaosExploded, setChaosExploded] = useState(false);

  const toggleJoke = (id: string) => {
    setOpenedJokes((p) => ({ ...p, [id]: !p[id] }));
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ea580c', '#db2777', '#facc15', '#06b6d4'],
    });
  };

  const triggerChaosBlast = () => {
    setChaosExploded(true);
    const end = Date.now() + 2500;
    (function frame() {
      confetti({
        particleCount: 15,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors: ['#f43f5e', '#a855f7', '#3b82f6', '#eab308'],
      });
      confetti({
        particleCount: 15,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors: ['#f43f5e', '#a855f7', '#3b82f6', '#eab308'],
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-900">
      {/* Hero: Sticker Bomb & Chaotic Streetwear Banner */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          {/* Sticker Bomb Badges */}
          <div className="absolute -top-4 -left-6 bg-yellow-400 text-black font-black text-xs px-3 py-1 rounded-full -rotate-12 shadow-lg z-20 border-2 border-black">
            🚨 WARNING: BESTIE BIRTHDAY
          </div>
          <div className="absolute -bottom-3 -right-4 bg-pink-500 text-white font-black text-xs px-3 py-1 rounded-full rotate-6 shadow-lg z-20 border-2 border-white">
            100% UNHINGED 🔥
          </div>

          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl p-3 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 shadow-2xl flex items-center justify-center -rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-inner bg-black">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-yellow-400 text-slate-950 border-2 border-black shadow-md">
            <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600" /> Chaos Mode Activated
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Happy Birthday, <span className="bg-gradient-to-r from-pink-600 via-orange-500 to-purple-600 bg-clip-text text-transparent">{birthday.name}</span>! 🤪
          </h1>
          <p className="text-sm sm:text-base font-bold text-slate-600">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Another year of being partners in crime."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Inside Jokes Decoder Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-pink-600 bg-pink-100 px-3 py-1 rounded-full border border-pink-300">
            Classified Files
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Inside Jokes & Chaos Logs 📜
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Tap to decode the memories only we understand.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INSIDE_JOKES.map((joke) => {
            const isOpen = !!openedJokes[joke.id];
            return (
              <motion.div
                key={joke.id}
                onClick={() => toggleJoke(joke.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-5 rounded-3xl cursor-pointer transition-all border-2 shadow-lg ${
                  isOpen
                    ? 'bg-slate-950 text-white border-yellow-400'
                    : 'bg-white border-slate-200 hover:border-pink-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-pink-500">
                    File #{joke.id}
                  </span>
                  <Zap className={`w-4 h-4 ${isOpen ? 'text-yellow-400 fill-current' : 'text-slate-400'}`} />
                </div>
                <h3 className="font-extrabold text-base mb-1">{joke.title}</h3>
                {isOpen ? (
                  <p className="text-xs sm:text-sm font-semibold text-yellow-300 pt-2 border-t border-slate-800">
                    {joke.punchline}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 font-bold mt-1">Tap to decrypt 🔓</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Memory Gallery */}
      {birthday.memory_image_urls && birthday.memory_image_urls.length > 0 && (
        <section>
          <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
        </section>
      )}

      {/* Real-time Birthday Message */}
      {birthday.birthday_message && (
        <section className="bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 p-6 sm:p-8 rounded-3xl border-2 border-pink-300 shadow-md">
          <div className="flex items-center gap-2 text-pink-700 text-xs font-black uppercase tracking-wider mb-2">
            <PartyPopper className="w-4 h-4" /> Message From Your Partner in Crime
          </div>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-800 font-bold leading-relaxed">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-black text-pink-600 mt-4">
            — {birthday.sender_name} 💥
          </p>
        </section>
      )}

      {/* Finale: Unhinged Emoji Cannon Blast */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!chaosExploded ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerChaosBlast}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 via-pink-600 to-purple-600 text-white font-black text-base shadow-2xl shadow-pink-500/40 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <PartyPopper className="w-5 h-5 animate-bounce" />
            <span>Detonate The Ultimate Bestie Emoji Cannon 💥</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-950 text-white border-4 border-yellow-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="text-5xl animate-bounce">🥳 🍕 🏆 💣</div>
            <h3 className="text-2xl sm:text-3xl font-black text-yellow-300">
              {birthday.custom_ending_message || `Happy Birthday to the Absolute Legend, ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-bold leading-relaxed">
              Never grow up, never stop being crazy, and always remember we are in this friendship for life.
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
                className="px-5 py-2 rounded-full text-xs font-black bg-yellow-400 hover:bg-yellow-300 text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

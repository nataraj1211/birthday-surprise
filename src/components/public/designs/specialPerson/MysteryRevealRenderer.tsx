import React, { useState } from 'react';
import { Eye, Key, Sparkles, Share2, RotateCcw, Lock } from 'lucide-react';
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

const MYSTERY_CLUES = [
  { id: '1', clue: 'Clue 01: The Mystery Factor 🎭', text: 'Someone who brings unexpected joy, unmatched magnetism, and captivating energy into every room.' },
  { id: '2', clue: 'Clue 02: The Unforgettable Impact ⚡', text: 'A rare soul who leaves an indelible impression on everyone lucky enough to cross paths with them.' },
  { id: '3', clue: 'Clue 03: The VIP Target 🎯', text: 'Today marks the official anniversary of this legendary person arriving on Earth.' },
  { id: '4', clue: 'Clue 04: The Identity Revealed 💎', text: 'The one and only extraordinary human being: ' },
];

export const MysteryRevealRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [unlockedClues, setUnlockedClues] = useState<Record<string, boolean>>({});
  const [mysteryUnlocked, setMysteryUnlocked] = useState(false);

  const toggleClue = (id: string) => {
    setUnlockedClues((p) => ({ ...p, [id]: !p[id] }));
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ca8a04', '#eab308', '#facc15', '#ffffff'],
    });
  };

  const triggerMysteryGrandReveal = () => {
    setMysteryUnlocked(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#d97706', '#f59e0b', '#fbbf24', '#ffffff', '#a855f7'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-100 bg-slate-950 rounded-3xl p-4 sm:p-6 my-4 border border-amber-500/30">
      {/* Hero: Mysterious Gold Halo & Portrait */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="absolute -inset-4 rounded-full bg-amber-500/20 blur-2xl animate-pulse" />

          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-800 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-amber-200 shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg border-2 border-slate-950 font-black">
              <Eye className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-amber-950 text-amber-300 border border-amber-500/40">
            <Key className="w-3.5 h-3.5 text-amber-400" /> Classified Birthday Dossier
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Happy Birthday, <span className="text-amber-400">{birthday.name}</span>! 💎
          </h1>
          <p className="text-sm sm:text-base font-semibold text-amber-200/80 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}An enigmatic celebration for someone truly rare."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section className="bg-slate-900 rounded-2xl p-4 border border-amber-500/20">
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Mystery Clues Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
            Confidential Files
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Decrypt The Mystery Dossier 🕵️
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Tap each file below to reveal clues about this VIP.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MYSTERY_CLUES.map((clue) => {
            const isOpen = !!unlockedClues[clue.id];
            return (
              <motion.div
                key={clue.id}
                onClick={() => toggleClue(clue.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${
                  isOpen
                    ? 'bg-slate-900 border-amber-400 shadow-lg text-white'
                    : 'bg-slate-950 border-slate-800 hover:border-amber-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                    DOSSIER #{clue.id}
                  </span>
                  {isOpen ? <Key className="w-4 h-4 text-amber-400" /> : <Lock className="w-4 h-4 text-slate-500" />}
                </div>
                <h3 className="font-extrabold text-base mb-1 text-white">{clue.clue}</h3>
                {isOpen ? (
                  <p className="text-xs sm:text-sm text-slate-300 pt-2 border-t border-slate-800 leading-relaxed">
                    {clue.text} {clue.id === '4' && <strong className="text-amber-300">{birthday.name}!</strong>}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 font-mono mt-1">Tap to decrypt file 🔓</p>
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

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-3 font-serif">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles className="w-4 h-4" /> Personal Dedication Note
          </div>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-200 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-mono font-bold text-amber-400 mt-4">
            — {birthday.sender_name} 💎
          </p>
        </section>
      )}

      {/* Finale */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!mysteryUnlocked ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerMysteryGrandReveal}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-black text-base shadow-2xl shadow-amber-500/40 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Unlock The Final Grand Birthday Secret 💎</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-900 border-2 border-amber-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="text-4xl text-amber-400 font-black">💎 ✨ 👑</div>
            <h3 className="text-2xl sm:text-3xl font-black text-amber-200">
              {birthday.custom_ending_message || `Happy Birthday to the Incomparable ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              May this year unlock unparalleled success, radiant health, peace, and unforgettable moments.
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
                className="px-5 py-2 rounded-full text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

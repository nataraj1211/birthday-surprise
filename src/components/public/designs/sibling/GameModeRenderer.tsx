import React, { useState } from 'react';
import { Gamepad2, Trophy, Share2, RotateCcw } from 'lucide-react';
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

const GAME_LEVELS = [
  { level: '01', title: 'The Origin Quest 🐣', xp: '+500 EXP', desc: 'Tutorial Stage: Learning to share toys, stealing food when the other isn\'t looking, and co-op living.' },
  { level: '02', title: 'School Bus PvP Arena 🎒', xp: '+1,200 EXP', desc: 'Stage 2: Competitive sibling showdowns, fighting for the front passenger seat, and teaming up against parents.' },
  { level: '03', title: 'Boss Fight: Sibling Arguments 🥊', xp: '+3,000 EXP', desc: 'Stage 3: Epic battles over who took the charger and who ate the last slice of pizza. (Boss HP Defeated!)' },
  { level: 'MAX', title: 'LEVEL UP: Birthday Victory 👑', xp: 'MAX EXP', desc: 'Boss Stage Clear! Unlocking the Legendary Sibling Trophy and endless birthday bragging rights.' },
];

export const GameModeRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [victoryRoyale, setVictoryRoyale] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const triggerVictoryRoyale = () => {
    setVictoryRoyale(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#a855f7', '#facc15', '#f43f5e'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-mono text-cyan-400 bg-slate-950 rounded-3xl p-4 sm:p-6 my-4 border-2 border-cyan-500/30">
      {/* Hero: 8-Bit Arcade Screen Header */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="p-4 rounded-3xl bg-zinc-900 border-4 border-cyan-500 shadow-2xl shadow-cyan-950 max-w-xs sm:max-w-sm mx-auto space-y-3">
            <div className="flex items-center justify-between text-[11px] text-yellow-400">
              <span>PLAYER 1: {birthday.name.toUpperCase()}</span>
              <span>HP: 100/100</span>
            </div>

            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl overflow-hidden border-2 border-cyan-400 mx-auto shadow-inner bg-black">
              <img
                src={birthday.profile_image_url || images[0]}
                alt={birthday.name}
                className="w-full h-full object-cover pixelated"
              />
            </div>

            <div className="flex justify-between items-center text-xs text-cyan-300">
              <span>LVL: BIRTHDAY BOSS</span>
              <span className="text-yellow-400">SCORE: 99999</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto font-sans">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-cyan-500 text-slate-950 shadow-md">
            <Gamepad2 className="w-3.5 h-3.5 fill-black" /> 8-Bit Sibling Arcade Mode
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-mono">
            Happy Birthday, <span className="text-cyan-400">{birthday.relationship_role || birthday.name}</span>! 🎮
          </h1>
          <p className="text-sm font-mono text-slate-400">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Achievement Unlocked: Surviving Another Level!"
          </p>
        </div>
      </motion.section>

      {/* Live Countdown Clock */}
      <section className="bg-zinc-900 rounded-2xl p-4 border border-cyan-500/20 font-sans">
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Level Quests Progression */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-800">
            Quest Log
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-mono">
            Sibling Level Progression 🕹️
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GAME_LEVELS.map((lvl, idx) => {
            const isSelected = currentLevel === idx;
            return (
              <motion.div
                key={lvl.level}
                whileHover={{ scale: 1.02 }}
                onClick={() => setCurrentLevel(idx)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-zinc-900 border-cyan-400 shadow-lg shadow-cyan-950 text-white'
                    : 'bg-zinc-950 border-zinc-800 hover:border-cyan-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="font-bold text-yellow-400">LEVEL {lvl.level}</span>
                  <span className="bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded-full text-[10px] font-bold border border-cyan-800">
                    {lvl.xp}
                  </span>
                </div>
                <h3 className="font-bold text-base text-white mb-1 font-mono">{lvl.title}</h3>
                <p className="text-xs leading-relaxed font-sans text-slate-300">
                  {lvl.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Memory Gallery */}
      {birthday.memory_image_urls && birthday.memory_image_urls.length > 0 && (
        <section className="font-sans">
          <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
        </section>
      )}

      {/* Birthday Message */}
      {birthday.birthday_message && (
        <section className="bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-3 font-sans">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-yellow-400 uppercase tracking-widest">
            <Trophy className="w-4 h-4" /> Co-Op Player 2 Letter
          </div>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-200 font-medium leading-relaxed font-mono">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-mono font-bold text-cyan-400">
            — {birthday.sender_name} 🕹️
          </p>
        </section>
      )}

      {/* Finale: Victory Royale */}
      <section className="text-center space-y-5 pt-6 pb-8 font-sans">
        {!victoryRoyale ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerVictoryRoyale}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white font-mono font-black text-base shadow-2xl shadow-cyan-500/40 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Trophy className="w-5 h-5 animate-bounce text-yellow-300" />
            <span>TRIGGER VICTORY ROYALE FIREWORKS 🏆</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-zinc-900 border-2 border-yellow-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center font-mono"
          >
            <div className="text-4xl text-yellow-400 font-black">★ VICTORY ROYALE ★</div>
            <h3 className="text-2xl font-black text-cyan-300">
              {birthday.custom_ending_message || `Level MAX Achieved! Happy Birthday ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              +10,000 EXP for being the best sibling in the universe. Ready for Level 2026!
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 font-sans">
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-1.5 transition-all cursor-pointer"
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
                className="px-5 py-2 rounded-full text-xs font-black bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

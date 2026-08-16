import React, { useState } from 'react';
import { Award, Star, Sparkles, Share2, RotateCcw, Crown } from 'lucide-react';
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

const RED_CARPET_AWARDS = [
  { category: 'Best Person in the World 🏆', winner: 'Undisputed Champion of Hearts' },
  { category: 'Most Radiant Energy ✨', winner: 'Illuminating Every Room' },
  { category: 'Unmatched Kindness Award 💖', winner: 'Pure & Boundless Soul' },
  { category: 'Lifetime VIP Award 👑', winner: 'Special Beyond Measure' },
];

export const GoldenCinematicRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [awardPresented, setAwardPresented] = useState(false);

  const triggerOscarShower = () => {
    setAwardPresented(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ca8a04', '#eab308', '#facc15', '#ffffff'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-serif text-slate-100 bg-black rounded-3xl p-4 sm:p-6 my-4 border-2 border-amber-500/40">
      {/* Hero: Hollywood Red Carpet & Gold Statuette */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6 font-sans"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-700 shadow-2xl flex items-center justify-center shadow-yellow-500/30">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-amber-200 shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg border-2 border-white">
              <Crown className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto font-serif">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-amber-950 text-amber-300 border border-amber-500/40 font-sans">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Golden Gala Premiere
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Happy Birthday, <span className="text-amber-400">{birthday.name}</span>! 🏆
          </h1>
          <p className="text-sm sm:text-base text-amber-200/80 italic font-serif">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}The spotlight shines on you, today and forever."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section className="bg-zinc-950 rounded-2xl p-4 border border-amber-500/20 font-sans">
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Red Carpet Awards Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1 font-sans">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
            Academy Nominations
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
            Official Birthday Honors 🌟
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
          {RED_CARPET_AWARDS.map((aw, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-3xl bg-zinc-900 border border-amber-500/30 shadow-lg space-y-2"
            >
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                CATEGORY #{idx + 1}
              </span>
              <h3 className="font-bold text-lg text-white font-serif">{aw.category}</h3>
              <p className="text-xs sm:text-sm text-amber-200/80 font-medium">
                WINNER: {birthday.name} ({aw.winner})
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Memory Gallery */}
      {birthday.memory_image_urls && birthday.memory_image_urls.length > 0 && (
        <section className="font-sans">
          <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
        </section>
      )}

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-3 font-serif">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest font-sans">
            <Star className="w-4 h-4" /> Gala Dedication Note
          </div>
          <p className="whitespace-pre-line text-sm sm:text-base text-zinc-200 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-mono font-bold text-amber-400 mt-4 font-sans">
            — {birthday.sender_name} 🏆
          </p>
        </section>
      )}

      {/* Finale: Award Presentation */}
      <section className="text-center space-y-5 pt-6 pb-8 font-sans">
        {!awardPresented ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerOscarShower}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-black font-black text-base shadow-2xl shadow-yellow-500/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Present The Golden Statuette 🏆</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-zinc-950 border-2 border-amber-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="text-4xl text-amber-400">🏆 🌟 👑</div>
            <h3 className="text-2xl sm:text-3xl font-black text-amber-200 font-serif">
              {birthday.custom_ending_message || `Happy Birthday to the Star of the Night, ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed font-sans">
              Awarded for excellence in being the most wonderful, genuine, and cherished person.
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
                className="px-5 py-2 rounded-full text-xs font-black bg-amber-500 hover:bg-amber-400 text-black flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

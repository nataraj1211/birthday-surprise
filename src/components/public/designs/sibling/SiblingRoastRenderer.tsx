import React, { useState } from 'react';
import { Flame, ShieldCheck, Sparkles, Share2, RotateCcw } from 'lucide-react';
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

const SIBLING_ROASTS = [
  { id: '1', title: 'Most Annoying Habit 😤', roast: 'Stealing clothes/chargers and pretending you have never seen them before in your life.' },
  { id: '2', title: 'Biggest Argument Ever 💥', roast: 'Fighting over who gets the front passenger seat and who ate the last slice of cake.' },
  { id: '3', title: 'Who Mom & Dad Like More 👑', roast: 'We both know it\'s me, but today is your birthday so I\'ll let you have the spotlight!' },
  { id: '4', title: 'Things You Still Owe Me 💸', roast: '14 ice creams, 5 rides, 3 shirts, and unconditional respect for being the cooler sibling.' },
];

export const SiblingRoastRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [openedRoasts, setOpenedRoasts] = useState<Record<string, boolean>>({});
  const [truceSigned, setTruceSigned] = useState(false);

  const toggleRoast = (id: string) => {
    setOpenedRoasts((p) => ({ ...p, [id]: !p[id] }));
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#ea580c', '#e11d48', '#facc15'],
    });
  };

  const triggerTruce = () => {
    setTruceSigned(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#3b82f6', '#10b981', '#f59e0b'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-900">
      {/* Hero: Sibling Warning Banner */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full z-20 shadow-md">
            OFFICIAL ROAST EDITION 🔥
          </div>

          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-3xl p-3 bg-gradient-to-tr from-amber-600 via-orange-500 to-rose-600 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-orange-100 text-orange-800 border border-orange-300">
            <Flame className="w-3.5 h-3.5 fill-orange-600 text-orange-600" /> Sibling Banter & Roast
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Happy Birthday, <span className="text-orange-600">{birthday.relationship_role || birthday.name}</span>! 🤪
          </h1>
          <p className="text-sm sm:text-base font-bold text-slate-600 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Proof that sharing genes can be hilarious and chaotic."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Sibling Roast Cards */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-orange-700 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
            Truth Bombs
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            The Official Sibling Roast Records 📜
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Tap each card to reveal the truth about growing up together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SIBLING_ROASTS.map((roast) => {
            const isOpen = !!openedRoasts[roast.id];
            return (
              <motion.div
                key={roast.id}
                onClick={() => toggleRoast(roast.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-5 rounded-3xl cursor-pointer transition-all border-2 shadow-lg ${
                  isOpen
                    ? 'bg-slate-900 text-white border-orange-400'
                    : 'bg-white border-slate-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase text-orange-500">
                    Roast #{roast.id}
                  </span>
                  <Flame className={`w-4 h-4 ${isOpen ? 'text-orange-400 fill-current' : 'text-slate-400'}`} />
                </div>
                <h3 className="font-extrabold text-base mb-1">{roast.title}</h3>
                {isOpen ? (
                  <p className="text-xs sm:text-sm font-semibold text-orange-200 pt-2 border-t border-slate-800 leading-relaxed">
                    {roast.roast}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 font-bold mt-1">Tap to reveal roast 🔥</p>
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
        <section className="bg-orange-50/60 p-6 sm:p-8 rounded-3xl border border-orange-200 shadow-md">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-700 mb-2">
            <ShieldCheck className="w-4 h-4" /> Sibling Love Beneath The Banter
          </div>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-800 font-bold leading-relaxed">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-black text-orange-600 mt-4">
            — Your favorite sibling, {birthday.sender_name} ❤️
          </p>
        </section>
      )}

      {/* Finale: Official Signed Sibling Truce */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!truceSigned ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerTruce}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 text-white font-black text-base shadow-xl shadow-orange-600/40 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Sign The 24-Hour Birthday Sibling Truce 📜</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-950 text-white border-2 border-orange-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="text-4xl">📜 🤝 👑</div>
            <h3 className="text-2xl font-black text-orange-300">
              {birthday.custom_ending_message || `Happy Birthday to My Partner in Crime ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-bold leading-relaxed">
              Official Sibling Truce signed. No roasts for the next 24 hours. (After that, all bets are off!)
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
                className="px-5 py-2 rounded-full text-xs font-black bg-orange-500 hover:bg-orange-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

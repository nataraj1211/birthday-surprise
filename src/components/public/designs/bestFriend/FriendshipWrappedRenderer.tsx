import React, { useState } from 'react';
import { Music, Zap, Sparkles, Share2, RotateCcw, Award } from 'lucide-react';
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

const WRAPPED_STATS = [
  { label: 'Friendship Duration', val: '4,380+ Days', sub: 'Top 0.01% Worldwide' },
  { label: 'Uncontrollable Laughs', val: '12,450', sub: 'New High Score 🏆' },
  { label: 'Late Night Gossip Calls', val: '840 Hrs', sub: 'Chief Yap Officers' },
  { label: 'Arguments Won by You', val: '99.9%', sub: '(I let you win 😉)' },
  { label: 'Shared Braincells', val: '0.5', sub: 'Operating on pure luck' },
  { label: 'Friendship Rating', val: '10/10 MAX', sub: 'Never Expiring Bond' },
];

export const FriendshipWrappedRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [wrappedShared, setWrappedShared] = useState(false);

  const triggerWrappedShare = () => {
    setWrappedShared(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#10b981', '#06b6d4', '#facc15', '#ec4899'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-white bg-slate-950 rounded-3xl p-4 sm:p-6 my-4 border border-emerald-500/20">
      {/* Hero: Spotify Wrapped Top Duo Card */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="p-6 rounded-3xl bg-gradient-to-tr from-emerald-950 via-teal-900 to-slate-900 border-2 border-emerald-400 shadow-2xl shadow-emerald-950 max-w-xs sm:max-w-sm mx-auto space-y-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-400">
              <span className="flex items-center gap-1"><Music className="w-3.5 h-3.5" /> WRAPPED #1 DUO</span>
              <span>TOP 0.01%</span>
            </div>

            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-emerald-400/60 mx-auto shadow-md">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1 text-left pt-1">
              <h3 className="text-xl font-black text-white">{birthday.name}</h3>
              <p className="text-xs font-mono text-emerald-300">#1 Most Played Best Friend of All Time</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-emerald-500 text-slate-950 shadow-md">
            <Zap className="w-3.5 h-3.5 fill-black" /> Friendship Wrapped Annual Recap
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Happy Birthday, <span className="text-emerald-400">{birthday.name}</span>! 🎧
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-400">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Your top streaming partner in life since day one."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section className="bg-slate-900 rounded-3xl p-4 border border-emerald-500/20">
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Spotify Wrapped Stats Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Official Metrics
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Your Friendship Stats Recap 📊
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WRAPPED_STATS.map((st, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 shadow-lg space-y-2"
            >
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                {st.label}
              </span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {st.val}
              </p>
              <p className="text-xs text-slate-300 font-semibold">{st.sub}</p>
            </motion.div>
          ))}
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
        <section className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            <Award className="w-4 h-4" /> Lifetime Duo Tribute Note
          </div>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-mono font-bold text-emerald-400">
            — {birthday.sender_name} 💚
          </p>
        </section>
      )}

      {/* Finale: Share Wrapped Card */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!wrappedShared ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerWrappedShare}
            className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base shadow-2xl shadow-emerald-500/40 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Generate Official Wrapped Bestie Certificate 🏆</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-900 border-2 border-emerald-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-500 text-slate-950 mx-auto flex items-center justify-center text-2xl font-black shadow-lg">
              ★
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-300">
              {birthday.custom_ending_message || `Happy Birthday to My #1 Bestie, ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Certified Platinum Best Friend Status. Unbreakable bond for 2026 and beyond.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5 transition-all cursor-pointer font-sans"
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
                className="px-5 py-2 rounded-full text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer font-sans"
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

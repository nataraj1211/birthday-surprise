import React, { useState } from 'react';
import { Lock, Unlock, Sparkles, Share2, RotateCcw, Heart } from 'lucide-react';
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

const SECRET_CARDS = [
  { id: '1', title: 'The First Thing I Noticed 👀', secret: 'How your eyes genuinely crinkle and light up with warmth whenever you smile at someone.' },
  { id: '2', title: 'A Secret I Never Said Out Loud 🤫', secret: 'Every time you enter the room, you naturally become the brightest person there without even trying.' },
  { id: '3', title: 'My Favorite Little Habit of Yours ✨', secret: 'The excited, passionate tone in your voice when you talk about something you truly care about.' },
  { id: '4', title: 'My Wish for You Today 💌', secret: 'That this birthday brings you as much quiet happiness and warmth as you effortlessly bring into my life.' },
];

export const SecretNoteRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [unlockedSecrets, setUnlockedSecrets] = useState<Record<string, boolean>>({});
  const [allRevealed, setAllRevealed] = useState(false);

  const toggleSecret = (id: string) => {
    setUnlockedSecrets((p) => ({ ...p, [id]: !p[id] }));
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#ec4899', '#fda4af'],
    });
  };

  const triggerSecretFinale = () => {
    setAllRevealed(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fda4af', '#f43f5e', '#fef08a'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-800">
      {/* Hero: Wax-Sealed Secret Card */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-pink-600 via-rose-400 to-amber-200 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <Lock className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-pink-100 text-pink-800 border border-pink-300">
            <Lock className="w-3.5 h-3.5" /> Confidential Birthday Note
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Happy Birthday, <span className="text-pink-600">{birthday.name}</span>! 💌
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}A few quiet secrets I have kept just for your birthday."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Scratch-off / Unlockable Secret Cards */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-pink-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
            Peel & Reveal
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Secrets I've Wanted To Tell You 🤫
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Tap each locked envelope to peel open the secret message.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SECRET_CARDS.map((card) => {
            const isUnlocked = !!unlockedSecrets[card.id];
            return (
              <motion.div
                key={card.id}
                onClick={() => toggleSecret(card.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-400 shadow-lg text-slate-900'
                    : 'bg-white border-slate-200 hover:border-pink-300 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase text-pink-600">
                    Secret #{card.id}
                  </span>
                  {isUnlocked ? (
                    <Unlock className="w-4 h-4 text-rose-500" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <h3 className="font-extrabold text-base mb-1">{card.title}</h3>
                {isUnlocked ? (
                  <p className="text-xs sm:text-sm text-slate-700 font-serif italic pt-2 border-t border-pink-200 leading-relaxed">
                    "{card.secret}"
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 font-semibold mt-1">Tap to unlock envelope 🔓</p>
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
        <section className="bg-pink-50/50 p-6 sm:p-8 rounded-3xl border border-pink-200 shadow-sm max-w-2xl mx-auto space-y-3 font-serif">
          <h3 className="text-lg font-bold text-pink-950 flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-600 fill-current" /> A Secret Birthday Message
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-sans font-bold text-pink-800 mt-4">
            — {birthday.sender_name} 💌
          </p>
        </section>
      )}

      {/* Finale: Sealed Envelope Reveal */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!allRevealed ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerSecretFinale}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-black text-base shadow-xl shadow-rose-500/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Unseal The Grand Final Secret 💌</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-950 text-white border-2 border-pink-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="w-14 h-14 rounded-full bg-rose-600 text-white mx-auto flex items-center justify-center text-2xl shadow-md">
              💌
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-pink-200">
              {birthday.custom_ending_message || `Happy Birthday to My Secret Favorite Person, ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Every day is a little brighter knowing you are in this world. Wishing you the happiest birthday!
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
                className="px-5 py-2 rounded-full text-xs font-black bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

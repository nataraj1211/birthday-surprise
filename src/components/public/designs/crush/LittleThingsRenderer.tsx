import React, { useState } from 'react';
import { CheckSquare, Square, Sparkles, Share2, RotateCcw, Heart, Smile } from 'lucide-react';
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

const LITTLE_THINGS = [
  { id: '1', trait: 'The way your eyes light up when you laugh at silly jokes ✨' },
  { id: '2', trait: 'How effortlessly kind you are to everyone you meet 🌿' },
  { id: '3', trait: 'Your music taste and how you always know the best songs 🎶' },
  { id: '4', trait: 'The subtle head tilt whenever you are listening closely 👂' },
  { id: '5', trait: 'How you make even ordinary moments feel cozy and memorable ☕' },
  { id: '6', trait: 'The positive energy you bring into every room you enter 💫' },
];

export const LittleThingsRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    '1': true,
    '2': true,
    '3': true,
    '4': true,
    '5': true,
    '6': true,
  });
  const [thingsCelebrated, setThingsCelebrated] = useState(false);

  const toggleItem = (id: string) => {
    setCheckedItems((p) => ({ ...p, [id]: !p[id] }));
  };

  const triggerThingsFinale = () => {
    setThingsCelebrated(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#f43f5e', '#a855f7', '#fde047'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-800">
      {/* Hero: Cute Checklist Aesthetics */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-pink-400 via-rose-300 to-amber-200 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <Smile className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-pink-100 text-pink-800 border border-pink-300">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" /> The Little Things About You
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Happy Birthday, <span className="text-pink-600">{birthday.name}</span>! 🌸
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}It is all the little subtle things that make you unforgettable."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Little Things Checklist */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-pink-700 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
            Admiration Checklist
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Every Little Detail I Adore 📋
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {LITTLE_THINGS.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-2xl bg-white border border-pink-200 shadow-sm flex items-start gap-3 cursor-pointer"
            >
              <div className="mt-0.5">
                {checkedItems[item.id] ? (
                  <CheckSquare className="w-5 h-5 text-pink-500 fill-pink-100" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300" />
                )}
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                {item.trait}
              </p>
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

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-pink-50/60 p-6 sm:p-8 rounded-3xl border border-pink-200 shadow-sm max-w-2xl mx-auto space-y-3 font-serif">
          <h3 className="text-lg font-bold text-pink-950 flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-600 fill-current" /> A Note of Appreciation
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-sans font-bold text-pink-800 mt-4">
            — {birthday.sender_name} 🌸
          </p>
        </section>
      )}

      {/* Finale */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!thingsCelebrated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerThingsFinale}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-black text-base shadow-xl shadow-pink-500/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Send Warm Birthday Wishes 💖</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-pink-950 text-white border-2 border-pink-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="w-14 h-14 rounded-full bg-pink-600 text-white mx-auto flex items-center justify-center text-2xl shadow-md">
              💖
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-pink-100">
              {birthday.custom_ending_message || `Wishing You The Brightest Birthday, ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-pink-200/90 font-medium leading-relaxed">
              May every single dream of yours come true this year. You deserve all the joy in the world.
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
                className="px-5 py-2 rounded-full text-xs font-black bg-pink-600 hover:bg-pink-500 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

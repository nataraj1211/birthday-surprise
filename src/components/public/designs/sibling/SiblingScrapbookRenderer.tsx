import React, { useState } from 'react';
import { Paperclip, Sparkles, Share2, RotateCcw, Smile } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

const SCRAPBOOK_NOTES = [
  { id: '1', title: 'Stolen Snacks 🍪', text: 'Eating the last cookie and blaming the dog.', color: 'bg-yellow-100 border-yellow-300' },
  { id: '2', title: 'Secret Nicknames 🤫', text: 'The ridiculous nicknames only we call each other at home.', color: 'bg-pink-100 border-pink-300' },
  { id: '3', title: 'TV Remote Wars 📺', text: 'Sitting 2 inches away from the TV just to block the infrared sensor.', color: 'bg-blue-100 border-blue-300' },
  { id: '4', title: 'Forever Teammates 🤝', text: 'No matter what happens in the outside world, we have each other\'s back.', color: 'bg-emerald-100 border-emerald-300' },
];

export const SiblingScrapbookRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [scrapbookCelebrated, setScrapbookCelebrated] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const triggerScrapbookCake = () => {
    setScrapbookCelebrated(true);
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#eab308', '#ec4899', '#3b82f6', '#10b981'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-800">
      {/* Hero: Handmade Paper & Doodles */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="p-4 bg-[#fefce8] rounded-3xl shadow-xl border-2 border-dashed border-amber-400 rotate-1 hover:rotate-0 transition-transform max-w-xs sm:max-w-sm mx-auto space-y-3">
            <div className="w-60 h-60 sm:w-68 sm:h-68 rounded-2xl overflow-hidden border-2 border-amber-300 mx-auto shadow-sm">
              <img
                src={birthday.profile_image_url || images[0]}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-bold text-amber-900 italic">
              ✏️ Sibling Scrapbook Archive • {birthday.birthday_date}
            </p>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-yellow-200 text-amber-950 border border-yellow-400">
            <Paperclip className="w-3.5 h-3.5" /> Handmade Sibling Scrapbook
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Happy Birthday, <span className="text-amber-600">{birthday.relationship_role || birthday.name}</span>! 🖍️
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Torn paper, doodles, and a lifetime of shared laughter."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Sticky Notes & Doodles Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Sticky Notes
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Doodled Sibling Chronicles 📝
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SCRAPBOOK_NOTES.map((note) => (
            <motion.div
              key={note.id}
              whileHover={{ scale: 1.02, rotate: 1 }}
              className={`p-6 rounded-3xl border-2 shadow-md space-y-2 ${note.color}`}
            >
              <h3 className="font-bold text-lg text-slate-900">{note.title}</h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {note.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-amber-50/70 p-6 sm:p-8 rounded-3xl border-2 border-dashed border-amber-300 max-w-2xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-amber-950 flex items-center gap-2">
            <Smile className="w-4 h-4 text-amber-600" /> A Handwritten Note in the Scrapbook
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-bold text-amber-800 mt-4">
            — {birthday.sender_name} 💛
          </p>
        </section>
      )}

      {/* Finale */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!scrapbookCelebrated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerScrapbookCake}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-slate-950 font-black text-base shadow-xl cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Draw The Final Birthday Cake & Celebrate 🎂</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-amber-100 border-2 border-amber-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="text-4xl">🎂 🖍️ 💖</div>
            <h3 className="text-2xl font-black text-slate-900">
              {birthday.custom_ending_message || `Happy Birthday to My Favorite Sibling ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              Another year added to our lifelong scrapbook. Love you always!
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-white hover:bg-slate-50 text-slate-800 flex items-center gap-1.5 transition-all cursor-pointer"
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
                className="px-5 py-2 rounded-full text-xs font-black bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

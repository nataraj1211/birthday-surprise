import React, { useState } from 'react';
import { Gift, PackageOpen, Share2, RotateCcw, Heart } from 'lucide-react';
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

export const SurpriseBoxRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [boxOpened, setBoxOpened] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const openSurpriseBox = () => {
    setBoxOpened(true);
    const end = Date.now() + 2500;
    (function frame() {
      confetti({
        particleCount: 15,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#e11d48', '#ec4899', '#facc15', '#38bdf8', '#a855f7'],
      });
      confetti({
        particleCount: 15,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#e11d48', '#ec4899', '#facc15', '#38bdf8', '#a855f7'],
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-900">
      {/* Hero: 3D Interactive Surprise Gift Box */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          {!boxOpened ? (
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={openSurpriseBox}
              className="cursor-pointer p-8 rounded-3xl bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 text-white shadow-2xl border-4 border-white space-y-4 max-w-xs sm:max-w-sm mx-auto animate-bounce"
              style={{ animationDuration: '3s' }}
            >
              <div className="w-20 h-20 bg-white/20 rounded-full mx-auto flex items-center justify-center text-4xl shadow-inner">
                🎁
              </div>
              <h3 className="text-xl font-black">Tap to Untie & Open Gift Box!</h3>
              <p className="text-xs font-semibold text-rose-100">
                A special birthday package prepared just for {birthday.name}
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 shadow-2xl flex items-center justify-center"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
                <img
                  src={birthday.profile_image_url || images[0]}
                  alt={birthday.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                <PackageOpen className="w-5 h-5" />
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-rose-100 text-rose-800 border border-rose-300">
            <Gift className="w-3.5 h-3.5 text-rose-600" /> Surprise Gift Box Experience
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Happy Birthday, <span className="text-rose-600">{birthday.name}</span>! 🎁
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Unwrapping a treasure chest of love and celebration."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown targetDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Memory Gallery */}
      {birthday.memory_image_urls && birthday.memory_image_urls.length > 0 && (
        <section>
          <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
        </section>
      )}

      {/* Birthday Letter inside the Gift Box */}
      {birthday.birthday_message && (
        <section className="bg-rose-50/70 p-6 sm:p-8 rounded-3xl border-2 border-dashed border-rose-300 shadow-md max-w-2xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-rose-950 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-600 fill-current" /> Inside The Birthday Gift Box
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic font-serif">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-bold text-rose-800 mt-4">
            — {birthday.sender_name} 🎁
          </p>
        </section>
      )}

      {/* Finale: Big Gift Eruption */}
      <section className="text-center space-y-5 pt-6 pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-slate-950 text-white border-2 border-rose-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
        >
          <div className="text-4xl animate-bounce">🎁 🎈 🥳</div>
          <h3 className="text-2xl sm:text-3xl font-black text-rose-200">
            {birthday.custom_ending_message || `Happy Birthday to the Most Wonderful Person, ${birthday.name}!`}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            May your day be packed with surprises, joy, laughter, and endless celebration.
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
              className="px-5 py-2 rounded-full text-xs font-black bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" /> Share Birthday Link
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { Grid, Sparkles, Share2, RotateCcw, Maximize2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

export const PhotoWallRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null);
  const [wallMosaicCelebrated, setWallMosaicCelebrated] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const triggerWallFinale = () => {
    setWallMosaicCelebrated(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ec4899', '#3b82f6', '#f59e0b'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-5xl mx-auto px-4 font-sans text-slate-800">
      {/* Hero: Floating Photo Wall Banner */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-purple-100 text-purple-800 border border-purple-300">
            <Grid className="w-3.5 h-3.5 text-purple-600" /> Interactive Photo Wall
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Happy Birthday, <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">{birthday.name}</span>! 📸
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Tap any tile on the photo wall to zoom into our memories."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Interactive Floating Masonry Photo Wall */}
      <section className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPhotoIdx(idx)}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-lg border-2 border-white/80 cursor-pointer group bg-slate-100"
            >
              <img
                src={img}
                alt={`Photo ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white">
                <span className="text-xs font-black flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5" /> Memory #{idx + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal/Expanded View if tile clicked */}
        <AnimatePresence>
          {selectedPhotoIdx !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-6 rounded-3xl bg-white border-2 border-purple-300 shadow-2xl space-y-4 max-w-xl mx-auto"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-purple-600">
                  FEATURED MEMORY #{selectedPhotoIdx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedPhotoIdx(null)}
                  className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Close ✕
                </button>
              </div>
              <div className="w-full h-72 rounded-2xl overflow-hidden shadow-inner">
                <img src={images[selectedPhotoIdx]} alt="selected" className="w-full h-full object-cover" />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed text-center">
                One of my all-time favorite moments with {birthday.name}. Truly unforgettable!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-purple-50/60 p-6 sm:p-8 rounded-3xl border border-purple-200 shadow-sm max-w-2xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-purple-950 flex items-center gap-2">
            <Heart className="w-4 h-4 text-purple-600 fill-current" /> A Note for the Wall
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-bold text-purple-800 mt-4">
            — Forever your friend, {birthday.sender_name} ❤️
          </p>
        </section>
      )}

      {/* Finale */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!wallMosaicCelebrated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerWallFinale}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-black text-base shadow-xl shadow-purple-600/40 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Illuminate The Grand Photo Wall Mosaic ✨</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-950 text-white border-2 border-purple-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="text-4xl">📸 💖 🌟</div>
            <h3 className="text-2xl sm:text-3xl font-black text-purple-200">
              {birthday.custom_ending_message || `Happy Birthday to My Best Friend ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Every tile on our memory wall is a testament to our unstoppable friendship.
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
                className="px-5 py-2 rounded-full text-xs font-black bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

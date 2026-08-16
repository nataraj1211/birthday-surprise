import React, { useState } from 'react';
import { Camera, Heart, Sparkles, Share2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

const POLAROID_STORIES = [
  { id: '1', title: 'First Memory 📸', caption: 'The day we clicked for the first time.', angle: '-rotate-2', tape: 'bg-pink-300/80' },
  { id: '2', title: 'Favorite Memory ✨', caption: 'That peaceful day we wished would never end.', angle: 'rotate-3', tape: 'bg-amber-300/80' },
  { id: '3', title: 'Funniest Memory 😂', caption: 'Laughing until our stomachs hurt over nothing.', angle: '-rotate-3', tape: 'bg-emerald-300/80' },
  { id: '4', title: 'Best Day Ever 🌟', caption: 'An unforgettable adventure made of pure joy.', angle: 'rotate-2', tape: 'bg-purple-300/80' },
  { id: '5', title: 'Our Future 💫', caption: 'Here is to a million more memories waiting to be made.', angle: '-rotate-1', tape: 'bg-rose-300/80' },
];

export const PolaroidLoveRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [mosaicRevealed, setMosaicRevealed] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const triggerHeartMosaic = () => {
    setMosaicRevealed(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#f43f5e', '#fde047', '#38bdf8'],
    });
  };

  return (
    <div className="relative space-y-12 sm:space-y-16 pb-16 sm:pb-20 max-w-4xl mx-auto px-2 sm:px-4 font-sans text-slate-800">
      {/* Hero: Polaroid Photo Stack with Washi Tape */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="text-center space-y-4 sm:space-y-6 pt-4 sm:pt-6"
      >
        <div className="relative inline-block mx-auto">
          {/* Washi Tape Strip at top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-6 sm:h-7 bg-pink-400/80 -rotate-2 shadow-sm z-20 backdrop-blur-xs rounded-xs border-y border-white/40" />

          {/* Polaroid Frame */}
          <div className="relative bg-white p-3 sm:p-4 pb-8 sm:pb-12 rounded-2xl shadow-2xl border border-slate-200/80 transform rotate-1 hover:rotate-0 transition-transform duration-500 max-w-[260px] sm:max-w-sm mx-auto">
            <div className="w-52 h-52 sm:w-72 sm:h-72 overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
              <img
                src={birthday.profile_image_url || images[0]}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pt-4 text-center">
              <p className="font-serif italic font-bold text-slate-700 text-lg sm:text-xl">
                {birthday.name} 💕
              </p>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                ★ Birthday Edition • {birthday.birthday_date} ★
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-pink-100 text-pink-700 border border-pink-300">
            <Camera className="w-3.5 h-3.5 text-pink-500" /> Polaroid Love Scrapbook
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Happy Birthday, <span className="text-pink-600">{birthday.name}</span>! 📸
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Snapshots of love that time could never fade."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Scrapbook Memory Polaroid Reel */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
            Scrapbook Chapters
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Our Scrapbook Timeline 📌
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Each polaroid captures a chapter of our favorite moments together.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {POLAROID_STORIES.map((story, idx) => {
            const img = images[idx % images.length];
            const isTapped = activePhotoIdx === idx;

            return (
              <motion.div
                key={story.id}
                whileHover={{ scale: 1.03, rotate: 0 }}
                onClick={() => setActivePhotoIdx(idx)}
                className={`relative bg-white p-3.5 pb-8 rounded-2xl shadow-xl border border-slate-200 cursor-pointer transition-all duration-300 ${story.angle} ${
                  isTapped ? 'ring-4 ring-pink-400 scale-102' : ''
                }`}
              >
                {/* Washi Tape Strip */}
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 ${story.tape} shadow-xs z-10 rounded-xs`} />

                <div className="w-full h-52 overflow-hidden rounded-lg bg-slate-100">
                  <img src={img} alt={story.title} className="w-full h-full object-cover" />
                </div>

                <div className="pt-3 text-center space-y-1">
                  <h3 className="font-bold text-slate-800 text-sm">{story.title}</h3>
                  <p className="font-serif italic text-xs text-slate-500">{story.caption}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Love Letter Section */}
      {birthday.birthday_message && (
        <section className="bg-amber-50/60 p-6 sm:p-8 rounded-3xl border-2 border-dashed border-pink-300 shadow-md relative overflow-hidden">
          <div className="absolute top-2 right-4 text-3xl opacity-20">💌</div>
          <h3 className="text-lg font-black text-pink-700 mb-3 flex items-center gap-2 font-serif">
            <Heart className="w-4 h-4 fill-pink-500" /> A Handwritten Note For You
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 font-serif leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-bold text-pink-600 mt-4">
            — Forever yours, {birthday.sender_name} ❤️
          </p>
        </section>
      )}

      {/* Finale: Polaroid Heart Mosaic */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!mosaicRevealed ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerHeartMosaic}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-black text-base shadow-xl shadow-pink-500/40 hover:shadow-pink-500/60 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Assemble Our Polaroid Heart Collage ❤️</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-white border-2 border-pink-400 shadow-2xl space-y-4 max-w-xl mx-auto"
          >
            <div className="flex justify-center -space-x-4 mb-2">
              {images.slice(0, 4).map((im, i) => (
                <div key={i} className="w-16 h-16 rounded-xl border-2 border-white shadow-lg overflow-hidden transform hover:scale-110 transition-transform">
                  <img src={im} alt="collage" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              {birthday.custom_ending_message || `Happy Birthday, My Love ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Every picture holds a thousand memories, but my favorite place in the world will always be with you.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
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
                className="px-5 py-2 rounded-full text-xs font-black bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

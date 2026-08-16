import React, { useState } from 'react';
import { BookOpen, Sparkles, Share2, RotateCcw, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

const ALBUM_PAGES = [
  {
    page: 1,
    chapter: 'The Early Years',
    date: 'Where Our Family Began',
    title: 'Roots of Unconditional Love 🌱',
    description: 'Looking at these old photographs reminds us how much care, sleepless nights, and unconditional patience you poured into building our family from the ground up.',
  },
  {
    page: 2,
    chapter: 'Growing Up',
    date: 'School Days & Holidays',
    title: 'Adventures & Golden Lessons 🎒',
    description: 'From school morning rushes to holiday road trips, every second spent learning from you was a stepping stone into becoming who we are today.',
  },
  {
    page: 3,
    chapter: 'Milestones & Memories',
    date: 'Shared Triumphs & Hugs',
    title: 'Standing By Our Side 🌟',
    description: 'In every graduation, celebration, or difficult challenge, you were always the first to applaud and the first to offer comforting arms.',
  },
  {
    page: 4,
    chapter: 'Today & Always',
    date: 'Happy Birthday Celebration',
    title: 'Our Eternal Pillars of Strength 👑',
    description: 'Today we celebrate the hero of our family. Thank you for your endless guidance, boundless warmth, and for being our greatest blessing.',
  },
];

export const FamilyAlbumRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [albumSpreadOpen, setAlbumSpreadOpen] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const triggerAlbumSpread = () => {
    setAlbumSpreadOpen(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ca8a04', '#d97706', '#b45309', '#fef08a'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-serif text-stone-900">
      {/* Hero: Leather Album Cover */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative max-w-md mx-auto">
          {/* Leather Album Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#44403c] via-[#292524] to-[#1c1917] text-amber-100 border-4 border-amber-500/40 shadow-2xl space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-600/30 text-amber-300 mx-auto flex items-center justify-center border border-amber-400/40 shadow-inner">
              <BookOpen className="w-8 h-8" />
            </div>

            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-amber-300/60 mx-auto shadow-md">
              <img
                src={birthday.profile_image_url || images[0]}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-sans font-black uppercase tracking-widest text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-700">
                Official Family Archive
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold text-amber-100 mt-2">
                Family Album of {birthday.name} 📖
              </h1>
              <p className="text-xs sm:text-sm text-amber-300/80 italic">
                {birthday.relationship_role ? `${birthday.relationship_role} • ` : ''}A Lifetime of Cherished Moments
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Interactive 3D Page Turn Book */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-sans font-black uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Interactive Pages
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            Turn Through Our Album Pages 📜
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans">
            Use the arrows to flip through chapters of our family history.
          </p>
        </div>

        {/* Book Spread View */}
        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {(() => {
              const page = ALBUM_PAGES[currentPage];
              const img = images[currentPage % images.length];

              return (
                <motion.div
                  key={page.page}
                  initial={{ opacity: 0, rotateY: 20 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -20 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 sm:p-8 rounded-3xl bg-[#fdfbf7] border-2 border-stone-300 shadow-2xl space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs font-sans font-bold text-amber-800">
                    <span>PAGE {page.page} OF {ALBUM_PAGES.length}</span>
                    <span>{page.date}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                    <div className="w-full h-56 rounded-2xl overflow-hidden border-2 border-stone-200 shadow-md">
                      <img src={img} alt={page.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-sans font-black uppercase tracking-wider text-amber-700">
                        {page.chapter}
                      </span>
                      <h3 className="text-xl font-bold text-stone-900 leading-tight">{page.title}</h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans font-medium">
                        {page.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              className="px-4 py-2 rounded-2xl text-xs font-sans font-bold bg-white border border-stone-300 shadow-xs hover:bg-stone-100 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Page
            </button>
            <span className="text-xs font-sans font-bold text-stone-500">
              Page {currentPage + 1} / {ALBUM_PAGES.length}
            </span>
            <button
              type="button"
              disabled={currentPage === ALBUM_PAGES.length - 1}
              onClick={() => setCurrentPage((p) => Math.min(ALBUM_PAGES.length - 1, p + 1))}
              className="px-4 py-2 rounded-2xl text-xs font-sans font-bold bg-white border border-stone-300 shadow-xs hover:bg-stone-100 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
            >
              Next Page <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Birthday Message */}
      {birthday.birthday_message && (
        <section className="bg-[#fcfaf5] p-6 sm:p-8 rounded-3xl border-2 border-stone-300 shadow-md max-w-2xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Heart className="w-4 h-4 text-amber-700 fill-current" /> A Note in Our Family Record
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-stone-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-sans font-bold text-amber-900 mt-4">
            — {birthday.sender_name} ❤️
          </p>
        </section>
      )}

      {/* Finale: Open Album Spread & Blessings */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!albumSpreadOpen ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerAlbumSpread}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-stone-800 to-stone-950 text-amber-100 font-sans font-black text-base shadow-xl shadow-stone-900/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin text-amber-400" />
            <span>Open Complete Family Spread & Blessings 📖</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-[#fdfbf7] border-2 border-amber-400 shadow-2xl space-y-4 max-w-xl mx-auto"
          >
            <div className="w-14 h-14 rounded-full bg-amber-600 text-white mx-auto flex items-center justify-center text-2xl shadow-md">
              👑
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900">
              {birthday.custom_ending_message || `Happy Birthday to the Heart of Our Family!`}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-sans font-medium leading-relaxed">
              Every photograph in our album tells a story of your unconditional love and dedication.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 font-sans">
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-stone-200 hover:bg-stone-300 text-stone-800 flex items-center gap-1.5 transition-all cursor-pointer"
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
                className="px-5 py-2 rounded-full text-xs font-black bg-stone-900 hover:bg-black text-amber-200 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

import React, { useState } from 'react';
import { Mail, Sparkles, Share2, RotateCcw, BookOpen, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';
import { MemoryGallery } from '../../MemoryGallery';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

const DIARY_PAGES = [
  {
    page: 1,
    title: 'Dear Sweetheart 💌',
    date: 'A Quiet Midnight Note',
    content: 'If love could be measured in written pages, every library in the world wouldn\'t be enough to hold what I feel for you. From the first conversation to this very second, having you in my life has been the greatest gift.',
  },
  {
    page: 2,
    title: 'Moments Written in Gold ✨',
    date: 'Memories We Cherish',
    content: 'I still hold onto the quiet moments: the shared laughs, the warm glances, and how you instinctively know when I need a hug. Every memory with you is stamped forever in my heart.',
  },
  {
    page: 3,
    title: 'Our Secret Promises 💫',
    date: 'Vows for the Future',
    content: 'I promise to always cheer for your dreams, celebrate every victory with you, hold your hand through the stormy days, and make you smile when life gets overwhelming.',
  },
  {
    page: 4,
    title: 'My Birthday Wish for You 🎂',
    date: 'For Today & Always',
    content: 'May this year shower you with boundless joy, peaceful mornings, sparkling achievements, and infinite love. May your heart be as full of warmth as you make mine every single day.',
  },
];

export const LoveLetterRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sealedNoteRevealed, setSealedNoteRevealed] = useState(false);

  const triggerLetterFinale = () => {
    setSealedNoteRevealed(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#f59e0b', '#fda4af', '#fef08a'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-serif text-slate-800">
      {/* Hero: Interactive Wax-Sealed Envelope & Parchment */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative max-w-md mx-auto">
          {/* Candle Warm Glow Backdrop */}
          <div className="absolute -inset-4 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative p-6 sm:p-8 rounded-3xl bg-[#fdfbf7] border-2 border-amber-200/80 shadow-2xl space-y-4 text-center">
            {/* Wax Seal Icon */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-700 to-red-600 text-amber-100 mx-auto flex items-center justify-center shadow-lg border-2 border-amber-200/60 shadow-red-900/30">
              <Mail className="w-7 h-7" />
            </div>

            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-100 mx-auto shadow-md">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-sans font-black uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                <Flame className="w-3 h-3 inline mr-1 fill-amber-500" /> Sealed With Love
              </span>
              <h1 className="text-2xl sm:text-4xl font-bold text-amber-950 mt-2">
                A Love Letter For {birthday.name} 💌
              </h1>
              <p className="text-xs sm:text-sm text-amber-800/80 italic">
                From {birthday.sender_name} • Written for your special day
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Interactive Unfolding Diary Book */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-sans font-black uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Parchment Pages
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Pages From My Diary 📖
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-sans">
            Flip through the four pages written especially for your birthday.
          </p>
        </div>

        {/* Page Turn Tabs */}
        <div className="flex justify-center gap-2">
          {DIARY_PAGES.map((pg, idx) => (
            <button
              key={pg.page}
              type="button"
              onClick={() => setCurrentPage(idx)}
              className={`px-4 py-2 rounded-2xl text-xs font-sans font-bold transition-all cursor-pointer ${
                currentPage === idx
                  ? 'bg-amber-800 text-amber-50 shadow-md shadow-amber-900/30'
                  : 'bg-amber-100/60 hover:bg-amber-200/60 text-amber-900 border border-amber-200'
              }`}
            >
              Page {pg.page}
            </button>
          ))}
        </div>

        {/* Active Page Card with Parchment Style */}
        <AnimatePresence mode="wait">
          {(() => {
            const page = DIARY_PAGES[currentPage];
            return (
              <motion.div
                key={page.page}
                initial={{ opacity: 0, rotateY: 15 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -15 }}
                transition={{ duration: 0.4 }}
                className="p-6 sm:p-10 rounded-3xl bg-[#fffefc] border-2 border-amber-200 shadow-xl space-y-4 max-w-2xl mx-auto relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-amber-100 pb-3 text-xs font-sans font-bold text-amber-700">
                  <span>PAGE {page.page} OF 04</span>
                  <span>{page.date}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-amber-950">{page.title}</h3>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed italic pt-2">
                  "{page.content}"
                </p>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </section>

      {/* Memory Gallery */}
      {birthday.memory_image_urls && birthday.memory_image_urls.length > 0 && (
        <section>
          <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
        </section>
      )}

      {/* Real-time Birthday Message */}
      {birthday.birthday_message && (
        <section className="bg-[#fefbf6] p-6 sm:p-8 rounded-3xl border-2 border-amber-200 shadow-md max-w-2xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-700" /> A Handwritten Letter For Today
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-sans font-bold text-amber-800 mt-4">
            — With all my love, {birthday.sender_name} ❤️
          </p>
        </section>
      )}

      {/* Finale: Handwritten Birthday Spread */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!sealedNoteRevealed ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerLetterFinale}
            className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-amber-800 via-rose-700 to-amber-700 text-white font-sans font-black text-sm sm:text-base shadow-xl shadow-amber-900/30 cursor-pointer inline-flex items-center justify-center gap-2.5 max-w-full text-center transition-all"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-spin flex-shrink-0" />
            <span>Unfold Final Love Letter 💌</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-[#fffefc] border-2 border-amber-300 shadow-2xl space-y-4 max-w-xl mx-auto"
          >
            <div className="w-14 h-14 rounded-full bg-amber-700 text-amber-100 mx-auto flex items-center justify-center text-2xl shadow-md">
              ❤️
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-950">
              {birthday.custom_ending_message || `Happy Birthday, My Beloved ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans font-medium leading-relaxed">
              Every word in this letter is an everlasting promise of love, devotion, and joy.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 font-sans">
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={onReplayIntro}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center gap-1.5 transition-all cursor-pointer"
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
                className="px-5 py-2 rounded-full text-xs font-black bg-amber-800 hover:bg-amber-700 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

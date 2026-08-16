import React, { useState } from 'react';
import { Heart, Sparkles, Share2, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';
import { MemoryGallery } from '../../MemoryGallery';
import { StoryTimelineView } from '../../StoryTimelineView';
import { BirthdayLetterView } from '../../BirthdayLetterView';
import { WishCardsGrid } from '../../WishCardsGrid';
import { FloatingRedHearts } from '../../../common/FloatingRedHearts';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

const REASONS_I_LOVE_YOU = [
  { id: '1', title: 'Your Radiant Smile ✨', text: 'How your smile lights up even the darkest and most exhausting days instantly.' },
  { id: '2', title: 'Your Pure Heart 💖', text: 'The boundless kindness, empathy, and gentleness you bring into this world.' },
  { id: '3', title: 'Our Silliest Laughs 😂', text: 'How we burst into uncontrollable laughter over things nobody else understands.' },
  { id: '4', title: 'The Way You Listen 👂', text: 'Making me feel heard, valued, and understood without having to say a single word.' },
  { id: '5', title: 'Unshakable Comfort 🫂', text: 'How your embrace feels like the safest and warmest home in the entire world.' },
  { id: '6', title: 'Our Endless Dreams 🌙', text: 'Talking about our future adventures until late midnight without running out of words.' },
];

export const RomanticRoseRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [openedReasons, setOpenedReasons] = useState<Record<string, boolean>>({});
  const [finaleRevealed, setFinaleRevealed] = useState(false);

  const toggleReason = (id: string) => {
    setOpenedReasons((prev) => ({ ...prev, [id]: !prev[id] }));
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#e11d48', '#f43f5e', '#fda4af', '#fb7185'],
    });
  };

  const triggerHeartExplosion = () => {
    setFinaleRevealed(true);
    const end = Date.now() + 3000;
    const colors = ['#e11d48', '#be123c', '#fda4af', '#ffe4e6'];
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="relative space-y-10 sm:space-y-16 pb-16 sm:pb-20 max-w-4xl mx-auto px-2 sm:px-4">
      <FloatingRedHearts autoSpawn={true} spawnIntervalMs={800} />

      {/* Hero: Large Photo with Animated Pulsing Heart Frame */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4 sm:space-y-6 pt-4 sm:pt-6"
      >
        <div className="relative inline-block mx-auto group">
          <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-red-600 opacity-60 blur-xl animate-pulse" />

          {/* Romantic Heart Frame */}
          <div className="relative w-36 h-36 sm:w-56 sm:h-56 rounded-full p-2 sm:p-2.5 bg-gradient-to-tr from-rose-600 via-pink-400 to-red-500 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/80 shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-1 right-1 sm:-bottom-2 sm:right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-rose-600 bg-rose-100 dark:bg-rose-950/80 px-3 py-1 rounded-full border border-rose-200 shadow-xs">
            To My Beloved {birthday.name}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Happy Birthday, My Love 🌹
          </h1>
          <p className="text-sm sm:text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
            You are the rhythm to my heart and the sweetest chapter of my life.
          </p>
        </div>
      </motion.section>

      {/* Live Countdown Clock */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Interactive Reasons Why I Love You */}
      <section className="space-y-4 sm:space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-rose-600 bg-rose-100/80 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200">
            Intimate Memories
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Reasons Why I Love You 💖
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Tap each card to reveal what makes you so irreplaceable to me.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {REASONS_I_LOVE_YOU.map((reason) => {
            const isOpen = !!openedReasons[reason.id];
            return (
              <motion.div
                key={reason.id}
                onClick={() => toggleReason(reason.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 border-2 shadow-md sm:shadow-lg backdrop-blur-md flex flex-col justify-between ${
                  isOpen
                    ? 'bg-gradient-to-br from-rose-600 to-pink-600 text-white border-transparent shadow-rose-500/30'
                    : 'bg-white/80 dark:bg-slate-900/80 border-rose-200/80 dark:border-rose-900 hover:border-rose-400 text-slate-800 dark:text-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20">
                    Reason #{reason.id}
                  </span>
                  <Heart className={`w-4 h-4 ${isOpen ? 'fill-white text-white animate-pulse' : 'text-rose-500'}`} />
                </div>
                <h3 className="font-extrabold text-base mb-1">{reason.title}</h3>
                <AnimatePresence>
                  {isOpen ? (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs sm:text-sm font-medium leading-relaxed pt-2 border-t border-white/20"
                    >
                      {reason.text}
                    </motion.p>
                  ) : (
                    <p className="text-xs opacity-60 font-semibold mt-1">Tap to unfold 💌</p>
                  )}
                </AnimatePresence>
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

      {/* Love Story Timeline */}
      {birthday.story_data && birthday.story_data.length > 0 && (
        <section>
          <StoryTimelineView stories={birthday.story_data} theme={theme} />
        </section>
      )}

      {/* Real-time Love Letter */}
      {birthday.birthday_message && (
        <section>
          <BirthdayLetterView
            message={birthday.birthday_message}
            senderName={birthday.sender_name}
            theme={theme}
          />
        </section>
      )}

      {/* Wish Cards */}
      <section>
        <WishCardsGrid theme={theme} experienceType="girlfriend" />
      </section>

      {/* Surprise Finale Section */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!finaleRevealed ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerHeartExplosion}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 text-white font-black text-base sm:text-lg shadow-2xl shadow-rose-600/40 hover:shadow-rose-600/60 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Click for Your Grand Birthday Heart Explosion 💖</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-rose-950 via-rose-900 to-slate-950 text-white border-2 border-rose-500/40 shadow-2xl space-y-4 max-w-xl mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-rose-600 text-white mx-auto flex items-center justify-center text-3xl animate-bounce shadow-lg shadow-rose-600/50">
              ❤️
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-rose-100">
              {birthday.custom_ending_message || `Happy Birthday to My Forever Love, ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed font-medium">
              Thank you for filling my life with laughter, sweet memories, and infinite warmth.
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

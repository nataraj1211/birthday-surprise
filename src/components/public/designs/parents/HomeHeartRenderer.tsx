import React, { useState } from 'react';
import { Home, Heart, Sparkles, Share2, RotateCcw } from 'lucide-react';
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

const HOME_PILLARS = [
  {
    title: 'Childhood Hearth 🏡',
    text: 'The warm kitchen smells, comforting morning tea, and safe hugs that welcomed us after every long day.',
  },
  {
    title: 'Life Lessons at Home 📚',
    text: 'Learning resilience, honesty, humility, and kindness around the dining table from the very best teachers.',
  },
  {
    title: 'Unconditional Hugs 🫂',
    text: 'No matter how big the world feels or how far we travel, home is wherever your embrace is.',
  },
  {
    title: 'Family Traditions ✨',
    text: 'The holiday laughter, shared recipes, and little habits that make our family uniquely beautiful.',
  },
];

export const HomeHeartRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [lanternsReleased, setLanternsReleased] = useState(false);

  const triggerLanternRelease = () => {
    setLanternsReleased(true);
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#ea580c', '#fb923c', '#fdba74', '#fed7aa'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-800">
      {/* Hero: Cozy Home Hearth Tribute */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="absolute -inset-4 bg-orange-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-amber-700 via-orange-500 to-amber-200 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/80 shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <Home className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-orange-100 text-orange-800 border border-orange-300">
            <Heart className="w-3.5 h-3.5 fill-orange-600 text-orange-600" /> Home & Heart Warmth
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
            Happy Birthday, <span className="text-orange-600">{birthday.relationship_role || birthday.name}</span>! 🏡
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "Home isn't a place. It's you."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Home & Heart Pillars */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            Roots & Warmth
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            The Warmth of Our Home ❤️
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HOME_PILLARS.map((pillar, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-3xl bg-white border border-orange-200 shadow-md space-y-2"
            >
              <h3 className="font-bold text-lg text-slate-900">{pillar.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {pillar.text}
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

      {/* Letter */}
      {birthday.birthday_message && (
        <section className="bg-orange-50/50 p-6 sm:p-8 rounded-3xl border border-orange-200 shadow-sm max-w-2xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-orange-950 flex items-center gap-2">
            <Heart className="w-4 h-4 text-orange-600 fill-current" /> A Child's Letter of Love
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-bold text-orange-800 mt-4">
            — With all my love, {birthday.sender_name}
          </p>
        </section>
      )}

      {/* Finale: Glowing Lanterns */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!lanternsReleased ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerLanternRelease}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white font-black text-base shadow-xl shadow-orange-600/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Release Glowing Sky Lanterns of Warmth 🏮</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-amber-950 to-orange-950 text-white border-2 border-orange-400 shadow-2xl space-y-4 max-w-xl mx-auto"
          >
            <div className="w-14 h-14 rounded-full bg-orange-600 text-white mx-auto flex items-center justify-center text-2xl shadow-md">
              🏡
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-orange-100">
              {birthday.custom_ending_message || `Happy Birthday to the Heart of Our Family!`}
            </h3>
            <p className="text-xs sm:text-sm text-orange-200/90 font-medium leading-relaxed">
              Thank you for building a home filled with boundless love, safety, and warmth.
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
                className="px-5 py-2 rounded-full text-xs font-black bg-orange-600 hover:bg-orange-500 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

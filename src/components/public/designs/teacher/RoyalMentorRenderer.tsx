import React, { useState } from 'react';
import { Award, BookOpen, Sparkles, Share2, RotateCcw, Shield } from 'lucide-react';
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

const MENTOR_PILLARS = [
  {
    title: 'The Guiding Light 💡',
    desc: 'Illuminating difficult paths and giving clarity when confusion seemed overwhelming.',
  },
  {
    title: 'Pillar of Knowledge 🏛️',
    desc: 'Imparting wisdom, moral integrity, and critical thinking with boundless patience.',
  },
  {
    title: 'Believing in Potential 🌱',
    desc: 'Seeing strength and capability in us long before we believed in ourselves.',
  },
  {
    title: 'Lifelong Inspiration 🌟',
    desc: 'The lessons taught inside the classroom continue to shape our decisions every single day.',
  },
];

export const RoyalMentorRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [mentorCelebrated, setMentorCelebrated] = useState(false);

  const triggerTorchFinale = () => {
    setMentorCelebrated(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ca8a04', '#1e3a8a', '#fbbf24', '#f8fafc'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-serif text-slate-800">
      {/* Hero: Royal Crest & Mentor Portrait */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-blue-900 via-amber-400 to-indigo-900 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg border-2 border-white">
              <Award className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto font-sans">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-blue-100 text-blue-900 border border-blue-300">
            <Shield className="w-3.5 h-3.5" /> Royal Mentor & Educator Tribute
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-serif">
            Happy Birthday, <span className="text-amber-600">{birthday.relationship_role || birthday.name}</span>! 🎓
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}To an extraordinary mentor whose wisdom lights our path."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section className="font-sans">
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Mentor Pillars of Strength */}
      <section className="space-y-6">
        <div className="text-center space-y-1 font-sans">
          <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Guiding Principles
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            The Pillars of Your Mentorship 🏛️
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MENTOR_PILLARS.map((p, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-3xl bg-white border-2 border-amber-200/80 shadow-md space-y-2"
            >
              <h3 className="font-bold text-lg text-slate-900 font-serif">{p.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed font-medium">
                {p.desc}
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

      {/* Letter of Gratitude */}
      {birthday.birthday_message && (
        <section className="bg-blue-50/50 p-6 sm:p-8 rounded-3xl border border-blue-200 shadow-sm max-w-2xl mx-auto space-y-3 font-serif">
          <h3 className="text-lg font-bold text-blue-950 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-700" /> A Student's Letter of Eternal Respect
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-sans font-bold text-blue-900 mt-4">
            — With deepest gratitude, {birthday.sender_name} 🎓
          </p>
        </section>
      )}

      {/* Finale: Torch of Wisdom */}
      <section className="text-center space-y-5 pt-6 pb-8 font-sans">
        {!mentorCelebrated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerTorchFinale}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-900 via-indigo-900 to-amber-700 text-white font-black text-base shadow-xl shadow-blue-950/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin text-amber-300" />
            <span>Light The Torch of Eternal Wisdom 🕯️</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-950 text-white border-2 border-amber-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 mx-auto flex items-center justify-center text-2xl font-black shadow-md">
              👑
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-amber-200 font-serif">
              {birthday.custom_ending_message || `Happy Birthday to Our Respected Mentor ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Thank you for inspiring minds, touching hearts, and shaping a brighter future.
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
                className="px-5 py-2 rounded-full text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

import React, { useState } from 'react';
import { BookOpen, Sparkles, Share2, RotateCcw, MessageSquareHeart } from 'lucide-react';
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

const STUDENT_NOTES = [
  { student: 'Batch of 2024', note: 'Thank you for never giving up on us, even when we struggled to understand complex equations.' },
  { student: 'Class Representative', note: 'Your patience and humor made even the toughest semester enjoyable.' },
  { student: 'Alumni Network', note: 'Years after graduation, we still quote your advice in our professional careers.' },
  { student: 'From All of Us', note: 'Wishing the most incredible mentor a birthday full of joy and respect.' },
];

export const ThankYouBookRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [bookCelebrated, setBookCelebrated] = useState(false);

  const triggerBookTribute = () => {
    setBookCelebrated(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ca8a04', '#d97706', '#1e3a8a', '#facc15'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-serif text-slate-800">
      {/* Hero: Signed Thank You Book */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 pt-6 font-sans"
      >
        <div className="relative inline-block mx-auto">
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-amber-700 via-yellow-500 to-amber-200 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-2 w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-amber-100 text-amber-900 border border-amber-300">
            <MessageSquareHeart className="w-3.5 h-3.5" /> Collective Student Yearbook
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-serif">
            Happy Birthday, <span className="text-amber-700">{birthday.relationship_role || birthday.name}</span>! 📖
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic font-serif">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}Signed with eternal gratitude from all your students."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section className="font-sans">
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Student Notes Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1 font-sans">
          <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Student Signatures
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            Words From Your Students 💌
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STUDENT_NOTES.map((note, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-3xl bg-white border-2 border-amber-200 shadow-md space-y-2"
            >
              <span className="text-xs font-sans font-black text-amber-700 uppercase tracking-widest block">
                {note.student}
              </span>
              <p className="text-sm text-slate-700 italic leading-relaxed">
                "{note.note}"
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Memory Gallery */}
      {birthday.memory_image_urls && birthday.memory_image_urls.length > 0 && (
        <section className="font-sans">
          <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
        </section>
      )}

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-amber-50/60 p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-sm max-w-2xl mx-auto space-y-3 font-serif">
          <h3 className="text-lg font-bold text-amber-950 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-700" /> Dedication Letter
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-sans font-bold text-amber-900 mt-4">
            — {birthday.sender_name} 🎓
          </p>
        </section>
      )}

      {/* Finale */}
      <section className="text-center space-y-5 pt-6 pb-8 font-sans">
        {!bookCelebrated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerBookTribute}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-800 text-white font-black text-base shadow-xl shadow-amber-800/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Present Signed Student Yearbook 📖</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-950 text-white border-2 border-amber-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center font-serif"
          >
            <div className="w-14 h-14 rounded-full bg-amber-600 text-white mx-auto flex items-center justify-center text-2xl font-black shadow-md font-sans">
              👑
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-amber-200">
              {birthday.custom_ending_message || `Happy Birthday, Respected ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans font-medium leading-relaxed">
              Every page in our student book is a testament to your great influence in our lives.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 font-sans">
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

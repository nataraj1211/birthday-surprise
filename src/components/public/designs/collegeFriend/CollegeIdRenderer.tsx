import React, { useState } from 'react';
import { GraduationCap, Award, Sparkles, Share2, RotateCcw, QrCode } from 'lucide-react';
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

export const CollegeIdRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [gradCelebrated, setGradCelebrated] = useState(false);

  const idSections = [
    { label: 'Major / Degree', val: 'Bachelor of Chaos & Vibes' },
    { label: 'Roll Number', val: `BDAY-${(birthday.birthday_date || '20000101').replace(/-/g, '')}` },
    { label: 'Campus Status', val: 'Distinguished Backbencher 🏆' },
    { label: 'Special Skill', val: 'Sleeping through 8 AM lectures' },
  ];

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const triggerGradFinale = () => {
    setGradCelebrated(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#059669', '#10b981', '#34d399', '#f59e0b'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-4xl mx-auto px-4 font-sans text-slate-800">
      {/* Hero: Interactive Holographic College Student ID Card */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="text-center space-y-6 pt-6"
      >
        <div className="relative max-w-sm mx-auto">
          {/* Lanyard Strap Header */}
          <div className="w-16 h-8 bg-emerald-800 rounded-t-xl mx-auto border-t-2 border-x-2 border-emerald-600 shadow-md flex items-center justify-center">
            <span className="w-6 h-1.5 bg-silver rounded-full bg-slate-300" />
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white border-2 border-emerald-400/80 shadow-2xl space-y-4 text-center">
            <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3 text-xs font-mono font-bold text-emerald-300">
              <span>★ UNIVERSITY OF VIBES ★</span>
              <span>STUDENT ID</span>
            </div>

            <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-emerald-300 mx-auto shadow-md">
              <img
                src={birthday.profile_image_url || images[0]}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white">{birthday.name}</h2>
              <p className="text-xs font-mono text-emerald-400">CHIEF BACKBENCHER & BEST FRIEND</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/20 text-xs font-mono">
              {idSections.map((sec, i) => (
                <div key={i}>
                  <span className="text-[9px] text-emerald-400/80 block uppercase">{sec.label}</span>
                  <span className="text-[11px] font-bold text-white block truncate">{sec.val}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-emerald-500/20 text-[10px] font-mono text-slate-400">
              <span>VALID: LIFELONG</span>
              <QrCode className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-100 text-emerald-800 border border-emerald-300">
            <GraduationCap className="w-3.5 h-3.5" /> Campus Life VIP
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Happy Birthday, <span className="text-emerald-600">{birthday.name}</span>! 🎓
          </h1>
          <p className="text-sm sm:text-base font-semibold text-slate-600 italic">
            "{birthday.nickname ? `${birthday.nickname} — ` : ''}College may end, but our campus memories are permanent."
          </p>
        </div>
      </motion.section>

      {/* Live Countdown */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Memory Gallery */}
      {birthday.memory_image_urls && birthday.memory_image_urls.length > 0 && (
        <section>
          <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
        </section>
      )}

      {/* Birthday Letter */}
      {birthday.birthday_message && (
        <section className="bg-emerald-50/60 p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-sm max-w-2xl mx-auto space-y-3">
          <h3 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-700" /> Message From Your Campus Partner in Crime
          </h3>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-700 leading-relaxed italic">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-bold text-emerald-800 mt-4">
            — {birthday.sender_name} 🎓
          </p>
        </section>
      )}

      {/* Finale: Graduation Toss */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!gradCelebrated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerGradFinale}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-black text-base shadow-xl shadow-emerald-600/30 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Toss Graduation Caps & Celebrate 🎓</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-emerald-950 text-white border-2 border-emerald-400 shadow-2xl space-y-4 max-w-xl mx-auto text-center"
          >
            <div className="text-4xl">🎓 📜 🏆</div>
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-200">
              {birthday.custom_ending_message || `Happy Birthday, College Legend ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium leading-relaxed">
              Certified Bachelor of Good Vibes & Eternal Friendship. Ready for whatever post-grad life brings!
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
                className="px-5 py-2 rounded-full text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

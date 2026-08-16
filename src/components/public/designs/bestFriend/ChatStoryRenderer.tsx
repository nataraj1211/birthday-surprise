import React, { useState } from 'react';
import { MessageCircle, CheckCheck, Send, Share2, RotateCcw, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../../types/birthday';
import { LiveCountdown } from '../../LiveCountdown';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

export const ChatStoryRenderer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const [chatExploded, setChatExploded] = useState(false);

  const images = birthday.memory_image_urls && birthday.memory_image_urls.length > 0
    ? birthday.memory_image_urls
    : [birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'];

  const CHAT_MESSAGES = [
    { sender: 'them', time: '11:58 PM', text: 'Hey... you awake?? 👀' },
    { sender: 'me', time: '11:59 PM', text: 'Of course! As if I would fall asleep tonight 🥳' },
    { sender: 'me', time: '12:00 AM', text: `HAPPY BIRTHDAY TO MY FAVORITE HUMAN ${birthday.name.toUpperCase()}!! 🎉🎂💖` },
    { sender: 'them', time: '12:01 AM', text: 'Aww thank you! Do you remember when we first started talking?' },
    { sender: 'me', time: '12:01 AM', text: 'How could I forget? Look at this legendary photo:', image: images[0] },
    { sender: 'me', time: '12:02 AM', text: 'And every memory since then has been pure gold ✨', image: images[1] || images[0] },
    { sender: 'them', time: '12:03 AM', text: 'Best friendship ever no cap 🥺❤️' },
  ];

  const triggerChatFinale = () => {
    setChatExploded(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#0284c7', '#38bdf8', '#22c55e', '#facc15'],
    });
  };

  return (
    <div className="relative space-y-16 pb-20 max-w-2xl mx-auto px-4 font-sans text-slate-800">
      {/* Hero: Messaging App Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="pt-6"
      >
        <div className="bg-slate-900 text-white rounded-3xl p-4 shadow-xl flex items-center justify-between border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-400">
              <img
                src={birthday.profile_image_url || images[0]}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>
            <div>
              <h2 className="font-bold text-base text-white">{birthday.name} 💕</h2>
              <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span>Online • Birthday VIP</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <PhoneCall className="w-5 h-5 text-emerald-400" />
            <MessageCircle className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
      </motion.section>

      {/* Live Countdown Clock */}
      <section>
        <LiveCountdown birthDate={birthday.birthday_date} theme={theme} />
      </section>

      {/* Interactive Chat Message Stream */}
      <section className="bg-[#e5ddd5] dark:bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-inner border border-slate-300 dark:border-slate-800 space-y-4">
        <div className="text-center py-1">
          <span className="text-[11px] font-bold bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full shadow-xs">
            TODAY • BIRTHDAY CHAT LOG
          </span>
        </div>

        <div className="space-y-3">
          {CHAT_MESSAGES.map((msg, idx) => {
            const isMe = msg.sender === 'me';
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] sm:max-w-[75%] shadow-md space-y-2 ${
                    isMe
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">{msg.text}</p>
                  {msg.image && (
                    <div className="rounded-xl overflow-hidden shadow-sm border border-white/20">
                      <img src={msg.image} alt="chat attachment" className="w-full h-44 object-cover" />
                    </div>
                  )}
                  <div className={`flex items-center justify-end gap-1 text-[10px] ${isMe ? 'text-emerald-100' : 'text-slate-400'}`}>
                    <span>{msg.time}</span>
                    {isMe && <CheckCheck className="w-3.5 h-3.5 text-cyan-200" />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Typing Indicator */}
        <div className="flex items-center gap-2 p-3 bg-white/70 dark:bg-slate-800/70 rounded-2xl w-fit text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
          <span>{birthday.sender_name} is typing a special birthday letter...</span>
        </div>
      </section>

      {/* Birthday Letter as Grand Text Message */}
      {birthday.birthday_message && (
        <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-emerald-500 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">
              Pinned Message 📌
            </span>
            <CheckCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="whitespace-pre-line text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
            "{birthday.birthday_message}"
          </p>
          <p className="text-right text-xs font-bold text-emerald-600">
            — Sent with infinite love by {birthday.sender_name} ❤️
          </p>
        </section>
      )}

      {/* Finale: Send Birthday Message */}
      <section className="text-center space-y-5 pt-6 pb-8">
        {!chatExploded ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={triggerChatFinale}
            className="px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base shadow-xl shadow-emerald-600/40 cursor-pointer inline-flex items-center gap-3 transition-all"
          >
            <Send className="w-5 h-5" />
            <span>Send Birthday Wishes & Pop Balloons 🎈</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-slate-950 text-white border-2 border-emerald-400 shadow-2xl space-y-4 text-center"
          >
            <div className="text-4xl">💬 ❤️ 🎉</div>
            <h3 className="text-2xl font-black text-emerald-300">
              {birthday.custom_ending_message || `Happy Birthday to My Best Friend ${birthday.name}!`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Delivered straight to the heart. Ready for another year of non-stop chatting!
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
                className="px-5 py-2 rounded-full text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
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

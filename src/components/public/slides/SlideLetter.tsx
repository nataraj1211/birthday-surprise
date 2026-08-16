import React, { useState, useEffect } from 'react';
import { Mail, Heart, Sparkles, RefreshCw } from 'lucide-react';
import type { ThemeConfig } from '../../../types/birthday';
import { FloatingRedHearts } from '../../common/FloatingRedHearts';

interface Props {
  message: string;
  senderName: string;
  theme: ThemeConfig;
}

export const SlideLetter: React.FC<Props> = ({ message, senderName, theme }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [heartBurstCount, setHeartBurstCount] = useState(0);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedText((prev) => prev + message.charAt(index));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [message]);

  const showFullMessage = () => {
    setDisplayedText(message);
    setIsTypingComplete(true);
  };

  const restartTyping = () => {
    setDisplayedText('');
    setIsTypingComplete(false);
    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedText((prev) => prev + message.charAt(index));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 20);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[58vh] sm:min-h-[65vh] text-center px-4 py-3 max-w-2xl mx-auto select-none space-y-4">
      {/* Background Floating Red Hearts Layer */}
      <FloatingRedHearts autoSpawn={true} spawnIntervalMs={1100} />

      {/* Header */}
      <div className="space-y-1 relative z-10">
        <span
          className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border shadow-sm backdrop-blur-md"
          style={{
            background: theme.colors.surface,
            color: theme.colors.primary,
            borderColor: theme.colors.border,
          }}
        >
          <Mail className="w-3.5 h-3.5" /> A Letter For You
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold" style={{ color: theme.colors.text }}>
          From The Heart 💌
        </h2>
      </div>

      {/* Letter Parchment Container */}
      <div
        className="w-full p-6 sm:p-9 rounded-3xl backdrop-blur-xl border shadow-2xl relative text-left overflow-hidden z-10"
        style={{
          background: theme.colors.cardBg,
          borderColor: theme.colors.border,
          boxShadow: `0 20px 50px ${theme.colors.glow}`,
        }}
      >
        {/* Interactive Stamp Watermark */}
        <button
          type="button"
          onClick={() => setHeartBurstCount((c) => c + 1)}
          className="absolute top-5 right-5 opacity-25 hover:opacity-100 rotate-12 transition-all hover:scale-125 cursor-pointer z-20 group"
          title="Click to send floating red hearts!"
        >
          <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-red-500 fill-red-500 group-hover:animate-ping" />
        </button>

        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider opacity-70">
              Dear Birthday Star ✨,
            </span>

            {!isTypingComplete ? (
              <button
                type="button"
                onClick={showFullMessage}
                className="text-[11px] font-bold text-pink-600 hover:text-pink-700 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200 transition-colors cursor-pointer"
              >
                Skip Typing ⚡
              </button>
            ) : (
              <button
                type="button"
                onClick={restartTyping}
                className="text-[11px] font-bold text-slate-500 hover:text-slate-700 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Replay
              </button>
            )}
          </div>

          {/* Letter Body */}
          <div className="min-h-[120px] max-h-[220px] sm:max-h-[260px] overflow-y-auto pr-1 no-scrollbar">
            <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium opacity-90 tracking-wide">
              {displayedText}
              {!isTypingComplete && (
                <span className="inline-block w-2 h-4 ml-1 bg-pink-500 animate-pulse" />
              )}
            </p>
          </div>

          {/* Signoff */}
          <div className="pt-4 border-t border-slate-200/40 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-rose-500 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sealed with Infinite Love</span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] font-bold uppercase tracking-wider opacity-60">With love & joy,</span>
              <span className="text-lg sm:text-xl font-bold font-serif" style={{ color: theme.colors.primary }}>
                {senderName} 💕
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Red Hearts Interactive Burst Trigger */}
      <div className="relative z-10 pt-1">
        <FloatingRedHearts
          interactiveButton={true}
          buttonLabel="Float Red Hearts ❤️"
          key={heartBurstCount}
        />
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Mail, Heart } from 'lucide-react';
import type { ThemeConfig } from '../../types/birthday';

interface Props {
  message: string;
  senderName: string;
  theme: ThemeConfig;
}

export const BirthdayLetterView: React.FC<Props> = ({ message, senderName, theme }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    // Typewriter effect speed
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedText((prev) => prev + message.charAt(index));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [message]);

  return (
    <section className="py-8 sm:py-14 px-2 sm:px-4">
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
        <div className="text-center space-y-2">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider border"
            style={{
              background: theme.colors.surface,
              color: theme.colors.primary,
              borderColor: theme.colors.border,
            }}
          >
            <Mail className="w-3.5 h-3.5" /> From The Heart
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold" style={{ color: theme.colors.text }}>
            A Little Message For You 💌
          </h2>
        </div>

        {/* Letter Container */}
        <div
          className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl backdrop-blur-xl border shadow-xl sm:shadow-2xl relative overflow-hidden"
          style={{
            background: theme.colors.cardBg,
            borderColor: theme.colors.border,
            boxShadow: `0 15px 45px ${theme.colors.glow}`,
          }}
        >
          {/* Stamp watermark */}
          <div className="absolute top-6 right-6 opacity-20 rotate-12">
            <Heart className="w-16 h-16 text-pink-500 fill-pink-300" />
          </div>

          <div className="space-y-6 relative z-10">
            <div className="text-sm font-semibold opacity-75">
              Dear Birthday Star,
            </div>

            <p className="text-base sm:text-lg leading-relaxed whitespace-pre-line font-medium opacity-90 tracking-wide font-sans">
              {displayedText}
              {!isTypingComplete && (
                <span className="inline-block w-2 h-5 ml-1 bg-pink-500 animate-pulse" />
              )}
            </p>

            <div className="pt-6 border-t border-pink-200/40 text-right">
              <span className="block text-xs font-bold uppercase tracking-wider opacity-60">With love & warm wishes,</span>
              <span className="text-xl sm:text-2xl font-bold font-serif" style={{ color: theme.colors.primary }}>
                {senderName} 💕
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

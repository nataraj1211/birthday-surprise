import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, X, Star } from 'lucide-react';
import type { ThemeConfig } from '../../types/birthday';

interface Props {
  name: string;
  theme: ThemeConfig;
}

export const SurpriseButton: React.FC<Props> = ({ name, theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const triggerSurprise = () => {
    setIsOpen(true);

    // Fire 3 confetti bursts across screen
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: theme.confettiColors,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <section className="py-8 sm:py-14 px-3 sm:px-4 text-center">
      <div className="max-w-md mx-auto">
        <button
          onClick={triggerSurprise}
          className="group relative w-full py-4 sm:py-5 px-5 sm:px-8 rounded-full text-base sm:text-xl font-extrabold text-white shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer"
          style={{
            background: theme.colors.buttonBg,
            boxShadow: `0 20px 45px ${theme.colors.glow}`,
          }}
        >
          <Gift className="w-6 h-6 sm:w-7 sm:h-7 animate-bounce flex-shrink-0" />
          <span>One More Surprise 🎁</span>
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform flex-shrink-0" />
        </button>
      </div>

      {/* Secret Surprise Revealed Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-300">
          <div
            className="w-full max-w-lg p-6 sm:p-10 rounded-2xl sm:rounded-3xl backdrop-blur-2xl border shadow-2xl text-center space-y-4 sm:space-y-6 relative overflow-hidden animate-in zoom-in-95 duration-300"
            style={{
              background: theme.colors.cardBg,
              borderColor: theme.colors.border,
              boxShadow: `0 25px 60px ${theme.colors.glow}`,
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3.5 right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-200/50 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto flex items-center justify-center bg-pink-100 text-pink-500 animate-pulse">
              <Star className="w-8 h-8 sm:w-10 sm:h-10 fill-current" />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold" style={{ color: theme.colors.primary }}>
                Happy Birthday, {name}! 🎂💖
              </h3>
              <p className="text-sm sm:text-lg font-bold opacity-90 leading-relaxed">
                "Keep smiling, keep shining and keep being the amazing person you are."
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  triggerSurprise();
                }}
                className="px-6 py-2.5 rounded-xl font-bold text-xs text-white uppercase tracking-wider shadow-lg"
                style={{ background: theme.colors.buttonBg }}
              >
                Fire Confetti Again 🎉
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

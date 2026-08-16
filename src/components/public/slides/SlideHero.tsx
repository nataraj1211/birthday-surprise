import React, { useState } from 'react';
import { Sparkles, Heart, Crown, ArrowRight } from 'lucide-react';
import type { BirthdayData, ThemeConfig } from '../../../types/birthday';
import { FloatingRedHearts } from '../../common/FloatingRedHearts';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onNext?: () => void;
}

export const SlideHero: React.FC<Props> = ({ birthday, theme, onNext }) => {
  const [heartBurst, setHeartBurst] = useState(0);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[58vh] sm:min-h-[65vh] text-center px-4 py-4 max-w-2xl mx-auto select-none">
      {/* Floating Red Hearts Background */}
      <FloatingRedHearts autoSpawn={true} spawnIntervalMs={1400} key={heartBurst} />

      {/* Crown & Profile Avatar */}
      <div className="relative inline-block mb-5 z-10">
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <Crown className="w-12 h-12 text-amber-400 fill-amber-300 drop-shadow-lg" />
        </div>

        <div
          onClick={() => setHeartBurst((c) => c + 1)}
          className="w-40 h-40 sm:w-52 sm:h-52 rounded-full p-2.5 mx-auto relative shadow-2xl transition-transform duration-500 hover:scale-105 cursor-pointer group"
          title="Click to float red hearts! ❤️"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.accent})`,
            boxShadow: `0 20px 60px ${theme.colors.glow}`,
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner bg-slate-100">
            <img
              src={
                birthday.profile_image_url ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
              }
              alt={birthday.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Floating Icons with click trigger */}
        <button
          type="button"
          onClick={() => setHeartBurst((c) => c + 1)}
          className="absolute top-2 -left-4 animate-float-slow text-red-500 hover:scale-125 transition-transform cursor-pointer"
          title="Click for love!"
        >
          <Heart className="w-8 h-8 fill-red-500 drop-shadow-md" />
        </button>
        <div className="absolute bottom-2 -right-4 animate-float-slow text-amber-400 delay-300">
          <Sparkles className="w-8 h-8 fill-current drop-shadow-md" />
        </div>
      </div>

      {/* Heading & Subtitle */}
      <div className="space-y-3 mb-6 z-10">
        <span
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest border shadow-sm backdrop-blur-md"
          style={{
            background: theme.colors.surface,
            color: theme.colors.primary,
            borderColor: theme.colors.border,
          }}
        >
          <Sparkles className="w-3.5 h-3.5" /> Happy Birthday 🎂
        </span>

        <h1
          className="text-3xl sm:text-5xl font-black tracking-tight"
          style={{ color: theme.colors.text }}
        >
          Happy Birthday,{' '}
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            }}
          >
            {birthday.name}!
          </span>{' '}
          🎉
        </h1>

        <p className="text-sm sm:text-lg font-semibold opacity-90 max-w-lg mx-auto leading-relaxed">
          Today is all about celebrating YOU, your infectious smile, and every beautiful memory we share. ✨
        </p>
      </div>

      {/* Call to action to proceed */}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          className="group relative z-10 inline-flex items-center gap-3 px-7 py-3 rounded-full font-extrabold text-white text-sm sm:text-base shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            background: theme.colors.buttonBg,
            boxShadow: `0 12px 30px ${theme.colors.glow}`,
          }}
        >
          <span>Start Birthday Story</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </div>
  );
};

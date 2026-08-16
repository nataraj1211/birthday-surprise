import React from 'react';
import { Sparkles, Heart, Crown } from 'lucide-react';
import type { BirthdayData, ThemeConfig } from '../../types/birthday';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
}

export const BirthdayHero: React.FC<Props> = ({ birthday, theme }) => {
  return (
    <section className="relative pt-12 pb-16 px-4 text-center overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Crown & Profile Image Frame */}
        <div className="relative inline-block">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <Crown className="w-10 h-10 text-amber-400 fill-amber-300 drop-shadow-md" />
          </div>

          <div
            className="w-36 h-36 sm:w-52 sm:h-52 rounded-full p-2 sm:p-2.5 mx-auto relative shadow-2xl transition-transform duration-500 hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.accent})`,
              boxShadow: `0 20px 50px ${theme.colors.glow}`,
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner bg-slate-100">
              <img
                src={birthday.profile_image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                alt={birthday.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Floating decorative heart icons */}
          <div className="absolute top-4 -left-3 sm:-left-4 animate-float-slow text-rose-400">
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          </div>
          <div className="absolute bottom-4 -right-3 sm:-right-4 animate-float-slow text-pink-400 delay-300">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2 sm:space-y-3">
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
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
            🎂
          </h1>

          <p className="text-sm sm:text-lg md:text-xl font-semibold opacity-85 max-w-md mx-auto leading-relaxed">
            Today is all about celebrating YOU, your light, and all the magic you bring to the world. ✨
          </p>
        </div>
      </div>
    </section>
  );
};

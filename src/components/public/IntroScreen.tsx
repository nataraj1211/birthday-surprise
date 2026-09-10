import React from 'react';
import { Gift, Heart, Sparkles } from 'lucide-react';
import type { BirthdayData, ThemeConfig } from '../../types/birthday';
import { FloatingRedHearts } from '../common/FloatingRedHearts';
import { getExperienceConfig } from '../../config/experienceConfig';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onOpen: () => void;
}

export const IntroScreen: React.FC<Props> = ({ birthday, theme, onOpen }) => {
  const config = getExperienceConfig(birthday.experience_type);
  const expType = birthday.experience_type || 'girlfriend';

  const isRomantic = expType === 'girlfriend' || expType === 'crush';
  const isMystery = expType === 'specialPerson';
  const isWarning = expType === 'bestFriend' || expType === 'sibling';

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 text-center transition-all duration-700 select-none overflow-y-auto pt-safe pb-safe"
      style={{
        background: theme.colors.bgGradient,
        color: theme.colors.text,
      }}
    >
      {/* Floating Red Hearts Background for romantic experiences */}
      {isRomantic && <FloatingRedHearts autoSpawn={true} spawnIntervalMs={1000} />}

      {/* Decorative backdrop glow */}
      <div
        className="absolute w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] rounded-full blur-3xl opacity-30 animate-pulse"
        style={{ background: theme.colors.glow }}
      />

      <div className="relative z-10 max-w-lg mx-auto space-y-4 sm:space-y-6 animate-in zoom-in-95 duration-500">
        {/* Floating Icon Frame */}
        <div
          className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl mx-auto flex items-center justify-center shadow-2xl animate-float-slow p-1 border backdrop-blur-xl"
          style={{
            background: theme.colors.surface,
            borderColor: theme.colors.border,
            boxShadow: `0 20px 40px ${theme.colors.glow}`,
          }}
        >
          <div
            className="w-full h-full rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-2xl sm:text-4xl"
            style={{ background: theme.colors.buttonBg }}
          >
            {expType === 'girlfriend' ? (
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 fill-current animate-bounce" />
            ) : expType === 'bestFriend' || expType === 'sibling' ? (
              <span className="animate-bounce">🚨</span>
            ) : expType === 'collegeFriend' || expType === 'teacher' ? (
              <span className="animate-bounce">🎓</span>
            ) : isMystery ? (
              <span className="animate-bounce">🌌</span>
            ) : (
              <Gift className="w-10 h-10 sm:w-12 sm:h-12 animate-bounce" />
            )}
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-1.5 sm:space-y-2">
          <span
            className={`inline-block px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest border shadow-sm backdrop-blur-md ${
              isWarning ? 'bg-amber-400 text-slate-950 border-amber-500' : ''
            }`}
            style={
              !isWarning
                ? {
                    background: theme.colors.surface,
                    color: theme.colors.primary,
                    borderColor: theme.colors.border,
                  }
                : {}
            }
          >
            {config.curtain.badge}
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {expType === 'specialPerson' ? (
              <span>{config.curtain.headingPrefix} <span className="text-amber-400">{birthday.name}</span> {config.curtain.headingSuffix}</span>
            ) : expType === 'parents' ? (
              <span>{config.curtain.headingPrefix} {birthday.relationship_role || 'Mom / Dad'} ❤️</span>
            ) : (
              <span>{config.curtain.headingPrefix} {birthday.name}! {config.curtain.headingSuffix ? <span className="block text-lg sm:text-2xl mt-1 opacity-90">{config.curtain.headingSuffix}</span> : null}</span>
            )}
          </h1>

          <p className="text-sm sm:text-lg font-medium opacity-90 max-w-md mx-auto pt-1 sm:pt-2 leading-relaxed whitespace-pre-line">
            "{birthday.intro_text || config.curtain.teaser}"
          </p>
        </div>

        {/* Open Button CTA */}
        <div className="pt-2 sm:pt-4">
          <button
            type="button"
            onClick={onOpen}
            className="group relative inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-extrabold text-white shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              background: theme.colors.buttonBg,
              boxShadow: `0 15px 35px ${theme.colors.glow}`,
            }}
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
            <span>{config.curtain.buttonText}</span>
          </button>
        </div>

        <p className="text-xs font-semibold opacity-60 flex items-center justify-center gap-1">
          <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" /> Made specially for you by {birthday.sender_name}
        </p>
      </div>
    </div>
  );
};

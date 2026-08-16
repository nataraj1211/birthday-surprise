import React from 'react';
import { Check, Dices } from 'lucide-react';
import type { BirthdayFormInput } from '../../types/birthday';
import { THEMES, getRandomTheme } from '../../config/themes';

interface Props {
  formData: BirthdayFormInput;
  onChange: (fields: Partial<BirthdayFormInput>) => void;
}

export const StepThemeSelector: React.FC<Props> = ({ formData, onChange }) => {
  const handleRandomTheme = () => {
    const random = getRandomTheme();
    onChange({ theme_id: random.id });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      <div className="text-center max-w-md mx-auto">
        <h3 className="text-xl font-bold text-slate-800">Select Visual Theme 🎨</h3>
        <p className="text-sm text-slate-500 mt-1">
          Choose from 12 premium color themes with tailored particle effects and glowing aesthetics.
        </p>

        <button
          type="button"
          onClick={handleRandomTheme}
          className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs shadow-md shadow-purple-500/20 hover:scale-105 transition-all"
        >
          <Dices className="w-4 h-4" />
          Surprise Me 🎨
        </button>
      </div>

      {/* Grid of 12 Themes: 2 cols on mobile, 3 on tablet, 4 on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {THEMES.map((theme) => {
          const isSelected = formData.theme_id === theme.id;

          return (
            <div
              key={theme.id}
              onClick={() => onChange({ theme_id: theme.id })}
              className={`group relative rounded-3xl p-4 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 border flex flex-col justify-between ${
                isSelected
                  ? 'ring-4 ring-pink-500/40 border-pink-500 shadow-xl shadow-pink-500/20 scale-[1.02]'
                  : 'bg-white border-slate-200 hover:border-pink-300 shadow-md hover:shadow-lg'
              }`}
              style={{
                background: isSelected ? theme.colors.cardBg : '#ffffff',
              }}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/50 z-10 animate-in zoom-in-50 duration-200">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}

              {/* Mini Website Preview Mockup */}
              <div
                className="w-full h-24 rounded-2xl p-2.5 flex flex-col justify-between relative overflow-hidden mb-3 border"
                style={{
                  background: theme.colors.bgGradient,
                  borderColor: theme.colors.border,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="w-3 h-3 rounded-full" style={{ background: theme.colors.primary }} />
                  <span className="text-xs">{theme.emoji}</span>
                </div>
                <div className="space-y-1">
                  <div className="w-3/4 h-2 rounded-full opacity-90" style={{ background: theme.colors.primary }} />
                  <div className="w-1/2 h-1.5 rounded-full opacity-60" style={{ background: theme.colors.secondary }} />
                </div>
                <div
                  className="w-full h-4 rounded-lg flex items-center justify-center text-[8px] font-bold text-white shadow-sm"
                  style={{ background: theme.colors.buttonBg }}
                >
                  Celebrate 🎉
                </div>
              </div>

              {/* Theme Name & Description */}
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-base">{theme.emoji}</span>
                  <h4 className="font-bold text-sm text-slate-800 leading-tight group-hover:text-pink-600 transition-colors">
                    {theme.name}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {theme.description}
                </p>
              </div>

              {/* Color Swatch Dots */}
              <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-100">
                <span className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ background: theme.colors.primary }} title="Primary" />
                <span className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ background: theme.colors.secondary }} title="Secondary" />
                <span className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ background: theme.colors.accent }} title="Accent" />
                <span className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ background: theme.colors.heartColor }} title="Glow/Hearts" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

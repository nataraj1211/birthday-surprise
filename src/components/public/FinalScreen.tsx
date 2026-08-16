import React from 'react';
import { RotateCcw } from 'lucide-react';
import type { BirthdayData, ThemeConfig } from '../../types/birthday';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplay?: () => void;
}

export const FinalScreen: React.FC<Props> = ({ birthday, theme, onReplay }) => {
  return (
    <section className="py-20 px-4 text-center border-t border-slate-200/20">
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest opacity-60">
            Once Again...
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: theme.colors.primary }}>
            HAPPY BIRTHDAY, {birthday.name}! 🎂💗
          </h2>
        </div>

        <div
          className="p-6 rounded-3xl backdrop-blur-xl border shadow-xl space-y-2"
          style={{
            background: theme.colors.surface,
            borderColor: theme.colors.border,
          }}
        >
          <p className="text-xs font-bold uppercase tracking-wider opacity-60">With lots of love and friendship,</p>
          <p className="text-2xl font-bold font-serif" style={{ color: theme.colors.text }}>
            {birthday.sender_name}
          </p>
        </div>

        {onReplay && (
          <button
            onClick={onReplay}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 hover:bg-white text-slate-800 shadow-md hover:shadow-lg transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Replay Experience
          </button>
        )}
      </div>
    </section>
  );
};

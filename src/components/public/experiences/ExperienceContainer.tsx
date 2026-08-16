import React, { useState } from 'react';
import { Layers, LayoutGrid } from 'lucide-react';
import type { BirthdayData, ThemeConfig } from '../../../types/birthday';
import { UniversalDesignDispatcher } from '../designs/UniversalDesignDispatcher';
import { BirthdaySlideViewer } from '../BirthdaySlideViewer';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayCurtain?: () => void;
}

export const ExperienceContainer: React.FC<Props> = ({
  birthday,
  theme,
  onReplayCurtain,
}) => {
  const [viewMode, setViewMode] = useState<'slides' | 'scroll'>('scroll');

  const renderScrollExperience = () => {
    return (
      <UniversalDesignDispatcher
        birthday={birthday}
        theme={theme}
        onReplayIntro={onReplayCurtain}
      />
    );
  };

  return (
    <div className="relative">
      {/* Floating View Mode Switcher Pill */}
      <div className="sticky top-3 z-40 flex justify-center px-4 mb-4">
        <div className="inline-flex p-1 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-lg gap-1">
          <button
            type="button"
            onClick={() => setViewMode('scroll')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
              viewMode === 'scroll'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Story Page Mode</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('slides')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
              viewMode === 'slides'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Slide Mode</span>
          </button>
        </div>
      </div>

      {viewMode === 'slides' ? (
        <BirthdaySlideViewer
          birthday={birthday}
          theme={theme}
          onReplayCurtain={onReplayCurtain}
        />
      ) : (
        <div className="animate-in fade-in duration-500">
          {renderScrollExperience()}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { Smartphone, Monitor, Eye } from 'lucide-react';
import type { BirthdayFormInput, BirthdayData } from '../../types/birthday';
import { getThemeById } from '../../config/themes';
import { ThemeParticleCanvas } from '../common/ThemeParticleCanvas';
import { ExperienceContainer } from '../public/experiences/ExperienceContainer';

interface Props {
  formData: BirthdayFormInput;
}

export const StepLivePreview: React.FC<Props> = ({ formData }) => {
  const [viewport, setViewport] = useState<'mobile' | 'desktop'>('mobile');
  const theme = getThemeById(formData.theme_id);

  const mockBirthday: BirthdayData = {
    id: 'preview',
    slug: 'preview',
    name: formData.name || 'Birthday Person',
    birthday_date: formData.birthday_date || new Date().toISOString().split('T')[0],
    sender_name: formData.sender_name || 'Your Bestie',
    profile_image_url: formData.profile_image_url,
    memory_image_urls: formData.memory_image_urls,
    intro_text: formData.intro_text,
    birthday_message: formData.birthday_message,
    music_url: formData.music_url,
    theme_id: formData.theme_id,
    experience_type: formData.experience_type || 'girlfriend',
    relationship_role: formData.relationship_role,
    nickname: formData.nickname,
    custom_ending_message: formData.custom_ending_message,
    story_data: formData.story_data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <Eye className="w-5 h-5 text-pink-500" />
          Interactive Live Preview 🎨
        </h3>
        <p className="text-sm text-slate-500">
          This is exactly how their personalized birthday slide story will look and feel.
        </p>

        {/* Viewport Frame Switcher */}
        <div className="inline-flex p-1 bg-slate-200/80 rounded-2xl gap-1 mt-2">
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewport === 'mobile' ? 'bg-white text-pink-600 shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" /> Mobile View (390px)
          </button>
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewport === 'desktop' ? 'bg-white text-pink-600 shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-4 h-4" /> Desktop View
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex justify-center w-full px-1">
        <div
          className={`transition-all duration-300 overflow-hidden relative ${
            viewport === 'mobile'
              ? 'w-full max-w-[390px] min-h-[580px] sm:min-h-[780px] rounded-2xl sm:rounded-[48px] border-4 sm:border-[12px] border-slate-900 shadow-2xl ring-1 ring-slate-900/10 my-2 sm:my-4'
              : 'w-full rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl min-h-[580px] sm:min-h-[720px]'
          }`}
          style={{
            background: theme.colors.bgGradient,
            color: theme.colors.text,
          }}
        >
          {/* Particle canvas in preview */}
          <ThemeParticleCanvas particleType={theme.particleType} colors={theme.confettiColors} className="absolute" />

          <div className="relative z-10">
            <ExperienceContainer birthday={mockBirthday} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Check, Sparkles, Layers, ArrowRight } from 'lucide-react';
import type { BirthdayFormInput, ExperienceType, BirthdayDesign } from '../../types/birthday';
import { EXPERIENCE_CONFIGS, ALL_EXPERIENCE_TYPES } from '../../config/experienceConfig';
import { getDesignById, getDefaultDesignForRelationship } from '../../config/designsConfig';
import { DesignSelectionModal } from '../designs/DesignSelectionModal';

interface Props {
  formData: BirthdayFormInput;
  onChange: (fields: Partial<BirthdayFormInput>) => void;
  onNext?: () => void;
}

export const StepExperienceSelector: React.FC<Props> = ({ formData, onChange, onNext }) => {
  const currentExp = formData.experience_type || 'girlfriend';
  const currentDesignId = formData.design_id || getDefaultDesignForRelationship(currentExp);
  const currentDesign = getDesignById(currentDesignId);

  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);

  const handleSelectExperience = (expType: ExperienceType) => {
    const config = EXPERIENCE_CONFIGS[expType];
    const defaultDesign = getDefaultDesignForRelationship(expType);

    // Check if current message is empty or is a default from another experience
    const shouldUpdateDefaults =
      !formData.birthday_message ||
      Object.values(EXPERIENCE_CONFIGS).some(
        (c) => c.defaultMessage === formData.birthday_message
      );

    const shouldUpdateIntro =
      !formData.intro_text ||
      Object.values(EXPERIENCE_CONFIGS).some(
        (c) => c.curtain.teaser === formData.intro_text
      );

    onChange({
      experience_type: expType,
      design_id: defaultDesign,
      theme_id: config.defaultThemeId,
      music_url: config.defaultMusic.url,
      relationship_role: config.labels.roleOptions?.[0] || formData.relationship_role || '',
      intro_text: shouldUpdateIntro ? config.curtain.teaser : formData.intro_text,
      birthday_message: shouldUpdateDefaults ? config.defaultMessage : formData.birthday_message,
      story_data: shouldUpdateDefaults ? config.defaultStory : formData.story_data,
      custom_ending_message: config.defaultEndingMessage,
    });
  };

  const handleSelectDesignFromModal = (design: BirthdayDesign) => {
    onChange({
      experience_type: design.relationship,
      design_id: design.id,
      theme_id: design.theme_id,
    });
    setIsDesignModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Active Design Banner with Change Design CTA */}
      {currentDesign && (
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-pink-500/30 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            {currentDesign.previewImage ? (
              <img
                src={currentDesign.previewImage}
                alt={currentDesign.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover border-2 border-pink-500/40 shadow-md flex-shrink-0"
              />
            ) : (
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex-shrink-0 border-2 border-pink-500/40 shadow-md"
                style={{ background: currentDesign.gradient }}
              />
            )}

            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  {currentDesign.badge}
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-black text-white truncate">
                {currentDesign.name}
              </h4>
              <p className="text-xs text-slate-300 font-medium line-clamp-1">
                {currentDesign.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsDesignModalOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white text-xs sm:text-sm font-black shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 whitespace-nowrap flex-shrink-0"
          >
            <Layers className="w-4 h-4" />
            <span>Change Design (5 Available)</span>
          </button>
        </div>
      )}

      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-pink-50 text-pink-700 border border-pink-200">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          Personalized Story Engine
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
          Who is this Birthday Surprise For? 🎂
        </h3>
        <p className="text-sm text-slate-500 font-medium">
          Select an experience type below, or click <strong>Change Design</strong> to pick one of 5 bespoke designs.
        </p>
      </div>

      {/* Grid of 8 Experience Types: 1 col on small mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {ALL_EXPERIENCE_TYPES.map((typeKey) => {
          const config = EXPERIENCE_CONFIGS[typeKey];
          const isSelected = currentExp === typeKey;

          return (
            <div
              key={typeKey}
              onClick={() => handleSelectExperience(typeKey)}
              className={`group relative rounded-3xl p-5 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between border-2 ${
                isSelected
                  ? 'border-pink-500 ring-4 ring-pink-500/20 shadow-2xl scale-[1.02] bg-white'
                  : 'bg-white/90 border-slate-200 hover:border-pink-300 shadow-md hover:shadow-xl'
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/50 z-20 animate-in zoom-in-50 duration-200">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
              )}

              {/* Card Top Preview Box */}
              <div
                className="w-full h-28 rounded-2xl p-3 flex flex-col justify-between relative overflow-hidden mb-4 shadow-sm border border-white/40"
                style={{ background: config.gradient }}
              >
                <div className="flex items-center justify-between text-white">
                  <span className="text-2xl drop-shadow-md">{config.emoji}</span>
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/25 backdrop-blur-md">
                    {config.badge}
                  </span>
                </div>

                <div className="space-y-1 text-white">
                  <span className="block text-[10px] font-bold opacity-80 uppercase tracking-tight">
                    Opening Curtain:
                  </span>
                  <p className="text-[11px] font-bold leading-tight line-clamp-1 drop-shadow-sm">
                    "{config.curtain.teaser}"
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="flex items-center justify-between text-[10px] font-black text-white/90">
                  <span>✨ 5 Bespoke Designs</span>
                  <span className="text-amber-200 flex items-center gap-0.5">
                    Select <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Info Body */}
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{config.emoji}</span>
                    <h4 className="font-extrabold text-base text-slate-900 group-hover:text-pink-600 transition-colors">
                      {config.name}
                    </h4>
                  </div>
                  <p className="text-xs font-bold text-pink-600 mt-0.5">
                    {config.tagline}
                  </p>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {config.description}
                  </p>
                </div>

                {/* Exclusive Features Tag */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span className="truncate">{config.exclusiveFeatures.featureTitle}</span>
                  <span className="text-pink-500 text-xs font-black">5 Designs</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Step Action Prompt */}
      {onNext && (
        <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-black flex items-center justify-center sm:justify-start gap-2">
              <span>Ready with {currentDesign?.name || 'Selected Design'}?</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </h4>
            <p className="text-xs sm:text-sm text-pink-100 font-medium">
              Click next to enter {EXPERIENCE_CONFIGS[currentExp].name}'s name, birthday date & details!
            </p>
          </div>

          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl sm:rounded-2xl bg-white text-pink-600 hover:bg-pink-50 font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 flex-shrink-0"
          >
            <span>Next: Enter Birthday Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modal for browsing and changing design */}
      <DesignSelectionModal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
        selectedRelationship={currentExp}
        onSelectRelationship={(rel) => onChange({ experience_type: rel })}
        onSelectDesign={handleSelectDesignFromModal}
      />
    </div>
  );
};

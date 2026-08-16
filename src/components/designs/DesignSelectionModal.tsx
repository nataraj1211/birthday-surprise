import React, { useState } from 'react';
import { X, Eye, Check, Sparkles, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import type { RelationshipType, BirthdayDesign } from '../../types/birthday';
import {
  ALL_RELATIONSHIPS,
  getDesignsForRelationship,
} from '../../config/designsConfig';
import { DesignPreviewModal } from './DesignPreviewModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedRelationship: RelationshipType;
  onSelectRelationship?: (rel: RelationshipType) => void;
  onSelectDesign: (design: BirthdayDesign) => void;
}

export const DesignSelectionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedRelationship,
  onSelectRelationship,
  onSelectDesign,
}) => {
  const [activeRel, setActiveRel] = useState<RelationshipType>(selectedRelationship || 'girlfriend');
  const [previewingDesign, setPreviewingDesign] = useState<BirthdayDesign | null>(null);

  // Sync if prop changes
  React.useEffect(() => {
    if (selectedRelationship) {
      setActiveRel(selectedRelationship);
    }
  }, [selectedRelationship]);

  if (!isOpen) return null;

  const currentCategory = ALL_RELATIONSHIPS.find((r) => r.id === activeRel) || ALL_RELATIONSHIPS[0];
  const designs = getDesignsForRelationship(activeRel);

  const handleRelationshipTab = (rel: RelationshipType) => {
    setActiveRel(rel);
    if (onSelectRelationship) {
      onSelectRelationship(rel);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-amber-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[94vh] my-auto"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-slate-50 via-white to-pink-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/40 flex items-start justify-between gap-3 flex-shrink-0">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">{currentCategory.icon}</span>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-pink-600 bg-pink-100 dark:bg-pink-950/80 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-pink-200 dark:border-pink-800">
                {currentCategory.name} Designs
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Choose a Dedicated Birthday Experience
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 sm:line-clamp-none">
              Each design below features unique layouts, interactive surprises, custom typography, and personalized animations.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Relationship Tabs (Responsive Horizontal Scroll) */}
        <div className="px-3 sm:px-6 pt-3 pb-2.5 border-b border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar scroll-smooth flex gap-1.5 sm:gap-2 flex-shrink-0">
          {ALL_RELATIONSHIPS.map((rel) => {
            const isSelected = activeRel === rel.id;
            return (
              <button
                key={rel.id}
                type="button"
                onClick={() => handleRelationshipTab(rel.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white shadow-md shadow-pink-500/20 scale-102'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200'
                }`}
              >
                <span className="text-sm sm:text-base">{rel.icon}</span>
                <span>{rel.name}</span>
              </button>
            );
          })}
        </div>

        {/* 5 Unique Designs Grid */}
        <div className="p-3 sm:p-6 md:p-8 overflow-y-auto flex-grow space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {designs.map((design, idx) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="group relative rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200/80 dark:border-slate-700 hover:border-pink-500 dark:hover:border-pink-500 p-3.5 sm:p-5 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div>
                  {/* Visual Image Preview Banner with Gradient Fallback */}
                  <div className="relative h-36 sm:h-40 rounded-xl sm:rounded-2xl overflow-hidden mb-3 bg-slate-900 group/thumb shadow-inner">
                    {design.previewImage ? (
                      <img
                        src={design.previewImage}
                        alt={design.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-r ${design.gradient}`} />
                    )}

                    {/* Gradient Vignette Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-950/75 backdrop-blur-md text-white border border-white/20 shadow-sm">
                        {design.badge}
                      </span>
                      <span className="p-1 rounded-full bg-slate-950/60 backdrop-blur-md text-amber-300">
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      </span>
                    </div>

                    {/* Bottom Title & Subtitle */}
                    <div className="absolute bottom-2.5 left-3 right-3 z-10 space-y-0.5 text-left">
                      <h3 className="font-black text-base sm:text-lg text-white leading-tight drop-shadow-md">
                        {design.name}
                      </h3>
                      <p className="text-[11px] text-slate-200 font-medium truncate drop-shadow-sm">
                        {design.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-3">
                    {design.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1 mb-3.5">
                    {design.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons (Touch Friendly) */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200 dark:border-slate-700/80">
                  <button
                    type="button"
                    onClick={() => setPreviewingDesign(design)}
                    className="py-2.5 px-3 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-700 hover:dark:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectDesign(design);
                      onClose();
                    }}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white text-xs font-black transition-all shadow-md shadow-pink-500/20 flex items-center justify-center gap-1 cursor-pointer transform group-hover:scale-102"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Use Design</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-3 sm:p-4 md:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-pink-500" />
            <span>Showing all 5 bespoke designs for <strong>{currentCategory.name}</strong></span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span>You can change designs anytime in the builder.</span>
          </div>
        </div>
      </motion.div>

      {/* Live Full-Screen Preview Modal */}
      <DesignPreviewModal
        design={previewingDesign}
        isOpen={!!previewingDesign}
        onClose={() => setPreviewingDesign(null)}
        onSelectDesign={(d) => {
          onSelectDesign(d);
          setPreviewingDesign(null);
          onClose();
        }}
      />
    </div>
  );
};

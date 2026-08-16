import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Check, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import type { RelationshipType, BirthdayDesign } from '../types/birthday';
import {
  ALL_RELATIONSHIPS,
  getDesignsForRelationship,
} from '../config/designsConfig';
import { DesignPreviewModal } from '../components/designs/DesignPreviewModal';

export const DesignSelectionPage: React.FC = () => {
  const { relationshipType } = useParams<{ relationshipType?: string }>();
  const navigate = useNavigate();

  const validRel: RelationshipType =
    (relationshipType as RelationshipType) &&
    ALL_RELATIONSHIPS.some((r) => r.id === relationshipType)
      ? (relationshipType as RelationshipType)
      : 'girlfriend';

  const [activeRel, setActiveRel] = useState<RelationshipType>(validRel);
  const [previewingDesign, setPreviewingDesign] = useState<BirthdayDesign | null>(null);

  const currentCategory = ALL_RELATIONSHIPS.find((r) => r.id === activeRel) || ALL_RELATIONSHIPS[0];
  const designs = getDesignsForRelationship(activeRel);

  const handleUseDesign = (design: BirthdayDesign) => {
    navigate(`/create?rel=${design.relationship}&design=${design.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Breadcrumb & Header */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-pink-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Homepage
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-pink-100 dark:bg-pink-950/80 text-pink-600 border border-pink-200 dark:border-pink-800">
                <Sparkles className="w-3.5 h-3.5" /> 40 Tailored Birthday Experiences
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                Explore Birthday Website Designs
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
                Choose who the birthday celebration is for, preview live interactive designs, and customize your personal birthday website in under 2 minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Relationship Categories Carousel/Bar */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {ALL_RELATIONSHIPS.map((rel) => {
            const isSelected = activeRel === rel.id;
            return (
              <button
                key={rel.id}
                type="button"
                onClick={() => setActiveRel(rel.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white shadow-lg shadow-pink-500/20 scale-102'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-pink-300'
                }`}
              >
                <span className="text-lg">{rel.icon}</span>
                <span>{rel.name}</span>
              </button>
            );
          })}
        </div>

        {/* Category Description Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 border border-pink-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{currentCategory.icon}</div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                5 Bespoke Designs for {currentCategory.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {currentCategory.description}
              </p>
            </div>
          </div>
        </div>

        {/* 5 Unique Designs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design, idx) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="group relative rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 hover:border-pink-500 dark:hover:border-pink-500 p-4 sm:p-6 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div>
                {/* Visual Image Preview Banner */}
                <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden mb-4 bg-slate-900 group/thumb shadow-inner">
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
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md text-white border border-white/20 shadow-sm">
                      {design.badge}
                    </span>
                    <span className="p-1 rounded-full bg-slate-950/60 backdrop-blur-md text-amber-300">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </span>
                  </div>

                  {/* Bottom Title & Subtitle inside Frame */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 z-10 space-y-0.5 text-left">
                    <h3 className="font-black text-lg sm:text-xl text-white leading-tight drop-shadow-md">
                      {design.name}
                    </h3>
                    <p className="text-xs text-slate-200 font-medium truncate drop-shadow-sm">
                      {design.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {design.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {design.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setPreviewingDesign(design)}
                  className="py-3 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 hover:dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleUseDesign(design)}
                  className="py-3 px-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white text-xs sm:text-sm font-black transition-all shadow-md shadow-pink-500/20 flex items-center justify-center gap-1.5 cursor-pointer transform group-hover:scale-102"
                >
                  <Check className="w-4 h-4" />
                  <span>Use Design</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Live Preview Modal */}
      <DesignPreviewModal
        design={previewingDesign}
        isOpen={!!previewingDesign}
        onClose={() => setPreviewingDesign(null)}
        onSelectDesign={(d) => {
          handleUseDesign(d);
          setPreviewingDesign(null);
        }}
      />
    </div>
  );
};

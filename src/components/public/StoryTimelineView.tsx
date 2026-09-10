import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Bookmark, Calendar } from 'lucide-react';
import type { StoryItem, ThemeConfig } from '../../types/birthday';

interface Props {
  stories: StoryItem[];
  theme: ThemeConfig;
}

export const StoryTimelineView: React.FC<Props> = ({ stories, theme }) => {
  if (!stories || stories.length === 0) return null;

  return (
    <section className="py-8 sm:py-14 px-2 sm:px-4">
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-10">
        <div className="text-center space-y-2">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider border"
            style={{
              background: theme.colors.surface,
              color: theme.colors.primary,
              borderColor: theme.colors.border,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" /> Friendship Journey
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold" style={{ color: theme.colors.text }}>
            Our Beautiful Journey 🌸
          </h2>
          <p className="text-xs sm:text-sm font-semibold opacity-75">
            Every moment shared with you is a cherished chapter.
          </p>
        </div>

        {/* Vertical Animated Timeline */}
        <div className="relative pl-2 sm:pl-0">
          {/* Vertical central line */}
          <div
            className="absolute left-5 sm:left-1/2 top-4 bottom-4 w-0.5 sm:w-1 -translate-x-1/2 rounded-full opacity-30"
            style={{ background: theme.colors.primary }}
          />

          <div className="space-y-6 sm:space-y-12">
            {stories.map((story, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={story.id || idx}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot Node */}
                  <div
                    className="absolute left-5 sm:left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white shadow-xl z-10 border-2 border-white transition-transform hover:scale-110"
                    style={{
                      background: theme.colors.buttonBg,
                      boxShadow: `0 0 20px ${theme.colors.glow}`,
                    }}
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current animate-pulse" />
                  </div>

                  {/* Card Content */}
                  <div className="w-full sm:w-[45%] pl-12 sm:pl-0">
                    <div
                      className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-xl border shadow-md sm:shadow-xl space-y-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                      style={{
                        background: theme.colors.cardBg,
                        borderColor: theme.colors.border,
                        boxShadow: `0 10px 30px ${theme.colors.glow}`,
                      }}
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span
                          className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-2 sm:px-2.5 py-0.5 rounded-full text-white"
                          style={{ background: theme.colors.buttonBg }}
                        >
                          <Bookmark className="w-3 h-3" /> Chapter {idx + 1}
                        </span>

                        {story.date && (
                          <span className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold opacity-70" style={{ color: theme.colors.text }}>
                            <Calendar className="w-3 h-3 text-pink-500" />
                            {story.date}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-xl font-bold pt-1" style={{ color: theme.colors.text }}>
                        {story.title}
                      </h3>

                      {story.subtitle && (
                        <p className="text-[11px] sm:text-xs font-black uppercase tracking-wide" style={{ color: theme.colors.primary }}>
                          {story.subtitle}
                        </p>
                      )}

                      <p className="text-xs sm:text-sm font-medium opacity-85 leading-relaxed pt-1">
                        {story.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

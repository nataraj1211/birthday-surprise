import React, { useState } from 'react';
import { Camera, Maximize2, Video, Film } from 'lucide-react';
import type { ThemeConfig } from '../../types/birthday';
import { Lightbox } from '../common/Lightbox';
import { isVideoUrl } from '../../lib/mediaUtils';

interface Props {
  images: string[];
  theme: ThemeConfig;
}

export const MemoryGallery: React.FC<Props> = ({ images, theme }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-6 sm:py-12 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <div className="text-center space-y-2">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider border"
            style={{
              background: theme.colors.surface,
              color: theme.colors.primary,
              borderColor: theme.colors.border,
            }}
          >
            <Camera className="w-3.5 h-3.5" /> Photo & Video Memories
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold" style={{ color: theme.colors.text }}>
            Cherished Memories 📸🎥
          </h2>
          <p className="text-xs sm:text-sm font-semibold opacity-75">
            Tap any memory to open full screen photo & video gallery.
          </p>
        </div>

        {/* Masonry-style Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-5">
          {images.map((url, idx) => {
            const isVideo = isVideoUrl(url);

            return (
              <div
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md sm:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl aspect-[4/5] bg-slate-900"
                style={{
                  boxShadow: `0 10px 30px ${theme.colors.glow}`,
                }}
              >
                {isVideo ? (
                  <div className="w-full h-full relative flex items-center justify-center bg-slate-950">
                    <video
                      src={url}
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-pink-500/80 backdrop-blur-md flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                        <Film className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={url}
                    alt={`Memory ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}

                {/* Media Type Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1">
                  {isVideo ? <Video className="w-3 h-3 text-pink-400" /> : '📸'}
                  <span>#{idx + 1}</span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 text-white">
                  <span className="text-xs font-bold tracking-wider">
                    {isVideo ? 'Play Video' : `Photo #${idx + 1}`}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <Lightbox
          images={images}
          initialIndex={selectedIdx}
          onClose={() => setSelectedIdx(null)}
        />
      )}
    </section>
  );
};

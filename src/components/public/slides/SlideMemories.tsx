import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Maximize2, ChevronLeft, ChevronRight, Heart, Video, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import type { ThemeConfig } from '../../../types/birthday';
import { Lightbox } from '../../common/Lightbox';
import { isVideoUrl, getYouTubeEmbedUrl } from '../../../lib/mediaUtils';

interface Props {
  images: string[];
  theme: ThemeConfig;
}

const PHOTO_AUTO_CHANGE_MS = 3800; // Auto change photo every 3.8 seconds

export const SlideMemories: React.FC<Props> = ({ images, theme }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const hasImages = Boolean(images && images.length > 0);
  const currentMediaUrl = hasImages ? images[currentIdx % images.length] : '';
  const isCurrentVideo = isVideoUrl(currentMediaUrl);
  const ytEmbed = isCurrentVideo ? getYouTubeEmbedUrl(currentMediaUrl) : null;

  // Auto-cycle for images (videos can play fully)
  useEffect(() => {
    if (!hasImages || images.length <= 1 || isCurrentVideo) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, PHOTO_AUTO_CHANGE_MS);

    return () => clearInterval(timer);
  }, [hasImages, images?.length, isCurrentVideo]);

  if (!hasImages) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[58vh] sm:min-h-[65vh] text-center px-4 py-4 max-w-xl mx-auto select-none space-y-4">
        <span
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border"
          style={{
            background: theme.colors.surface,
            color: theme.colors.primary,
            borderColor: theme.colors.border,
          }}
        >
          <Camera className="w-3.5 h-3.5" /> Memories
        </span>
        <h2 className="text-3xl font-extrabold" style={{ color: theme.colors.text }}>
          Cherished Moments 📸
        </h2>
        <p className="text-sm font-semibold opacity-75">Every moment with you is unforgettable.</p>
      </div>
    );
  }

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const togglePlayVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[58vh] sm:min-h-[65vh] text-center px-3 sm:px-4 py-2 max-w-2xl mx-auto select-none space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border shadow-sm backdrop-blur-md"
            style={{
              background: theme.colors.surface,
              color: theme.colors.primary,
              borderColor: theme.colors.border,
            }}
          >
            {isCurrentVideo ? (
              <Video className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
            ) : (
              <Camera className="w-3.5 h-3.5 text-pink-500" />
            )}
            <span>
              {isCurrentVideo ? 'Video Memory' : 'Photo Memory'} ({currentIdx + 1}/{images.length})
            </span>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-pink-600 border border-pink-200">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
            <span>Interactive Reel</span>
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold" style={{ color: theme.colors.text }}>
          Cherished Moments 📸🎥
        </h2>
      </div>

      {/* Main Media Player Frame */}
      <div className="relative w-full max-w-md mx-auto group">
        <div
          onClick={() => setLightboxIdx(currentIdx)}
          className="relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl border-4 border-white aspect-[4/5] sm:aspect-[4/4.8] bg-slate-950 transition-all duration-300 transform group-hover:scale-[1.01]"
          style={{
            boxShadow: `0 20px 50px ${theme.colors.glow}`,
          }}
        >
          {/* Top Story Progress Line Segments */}
          <div className="absolute top-3 inset-x-3 z-30 flex items-center gap-1.5">
            {images.map((_, idx) => (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIdx(idx);
                }}
                className="flex-1 h-1.5 rounded-full bg-white/30 backdrop-blur-md overflow-hidden cursor-pointer"
                title={`Item ${idx + 1}`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    idx === currentIdx
                      ? 'w-full bg-white shadow-sm'
                      : idx < currentIdx
                      ? 'w-full bg-white/70'
                      : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Media Content: Video or Image */}
          <AnimatePresence mode="wait">
            {isCurrentVideo ? (
              ytEmbed ? (
                <div className="w-full h-full" key={currentIdx}>
                  <iframe
                    src={ytEmbed}
                    title="Birthday Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center bg-black" key={currentIdx}>
                  <video
                    ref={videoRef}
                    src={currentMediaUrl}
                    autoPlay
                    loop
                    playsInline
                    muted={isMuted}
                    onEnded={() => handleNext()}
                    className="w-full h-full object-cover"
                  />
                  {/* Video Play/Pause overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={togglePlayVideo}
                      className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                    </button>
                  </div>
                </div>
              )
            ) : (
              <motion.img
                key={currentIdx}
                src={currentMediaUrl}
                alt={`Memory ${currentIdx + 1}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="w-full h-full object-cover select-none"
              />
            )}
          </AnimatePresence>

          {/* Overlay Gradient & Video / Photo Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 flex flex-col justify-between p-4 text-white pointer-events-none">
            {/* Top Row Controls */}
            <div className="flex justify-between items-center pt-3 pointer-events-auto">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                {isCurrentVideo ? <Video className="w-3 h-3 text-pink-400" /> : <Camera className="w-3 h-3 text-pink-400" />}
                <span>Memory {currentIdx + 1} of {images.length}</span>
              </span>

              <div className="flex items-center gap-2">
                {isCurrentVideo && !ytEmbed && (
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-pink-300" />}
                  </button>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIdx(currentIdx);
                  }}
                  className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer"
                  title="View full screen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="text-left space-y-1">
              <div className="flex items-center gap-1.5 text-pink-300 text-xs font-bold">
                <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
                <span>Tap {isCurrentVideo ? 'video' : 'photo'} to open fullscreen</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white/90">
                A precious memory full of laughter, love, and sweet times ✨
              </p>
            </div>
          </div>
        </div>

        {/* Previous / Next Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-90 cursor-pointer border border-pink-100"
              aria-label="Previous media"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-90 cursor-pointer border border-pink-100"
              aria-label="Next media"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-full px-2 no-scrollbar">
          {images.map((item, idx) => {
            const isVid = isVideoUrl(item);

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer relative bg-slate-900 ${
                  idx === currentIdx
                    ? 'border-pink-500 scale-110 shadow-lg shadow-pink-500/40 ring-2 ring-pink-400'
                    : 'border-white/50 opacity-60 hover:opacity-100'
                }`}
              >
                {isVid ? (
                  <div className="w-full h-full flex items-center justify-center bg-slate-950 text-pink-400">
                    <Video className="w-5 h-5" />
                  </div>
                ) : (
                  <img src={item} alt="" className="w-full h-full object-cover" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </div>
  );
};

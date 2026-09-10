import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Video } from 'lucide-react';
import { isVideoUrl, getYouTubeEmbedUrl } from '../../lib/mediaUtils';

interface Props {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export const Lightbox: React.FC<Props> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextImage = React.useCallback(() => {
    if (!images.length) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = React.useCallback(() => {
    if (!images.length) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, nextImage, prevImage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      nextImage();
    } else if (diff < -50) {
      prevImage();
    }
    setTouchStartX(null);
  };

  if (!images.length) return null;

  const currentMedia = images[currentIndex];
  const isVideo = isVideoUrl(currentMedia);
  const ytEmbed = isVideo ? getYouTubeEmbedUrl(currentMedia) : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-2 sm:p-4 pt-safe pb-safe transition-all duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between text-white px-2 py-2 sm:p-2 flex-shrink-0">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-pink-300 flex items-center gap-1.5">
          {isVideo && <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400" />}
          <span>Memory {currentIndex + 1} of {images.length}</span>
        </span>
        <button
          onClick={onClose}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Main Media Player Container */}
      <div
        className="relative flex-1 flex items-center justify-center overflow-hidden my-auto select-none w-full px-1"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.length > 1 && (
          <button
            onClick={prevImage}
            className="absolute left-1.5 sm:left-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/65 hover:bg-pink-600 active:scale-95 text-white flex items-center justify-center transition-all backdrop-blur-md cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        )}

        {isVideo ? (
          ytEmbed ? (
            <div className="w-full max-w-4xl aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src={ytEmbed}
                title="Birthday Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <video
              key={currentMedia}
              src={currentMedia}
              controls
              autoPlay
              playsInline
              className="max-h-[75vh] sm:max-h-[82vh] max-w-[95vw] sm:max-w-[92vw] rounded-xl sm:rounded-2xl shadow-2xl"
            />
          )
        ) : (
          <img
            key={currentMedia}
            src={currentMedia}
            alt={`Memory ${currentIndex + 1}`}
            className="max-h-[75vh] sm:max-h-[82vh] max-w-[95vw] sm:max-w-[92vw] object-contain rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300 transform scale-100"
          />
        )}

        {images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-1.5 sm:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/65 hover:bg-pink-600 active:scale-95 text-white flex items-center justify-center transition-all backdrop-blur-md cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        )}
      </div>

      {/* Thumbnails row */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto py-1 sm:py-2 max-w-full no-scrollbar flex-shrink-0">
          {images.map((item, idx) => {
            const isVid = isVideoUrl(item);
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer relative bg-slate-900 ${
                  idx === currentIndex
                    ? 'border-pink-500 scale-105 shadow-lg shadow-pink-500/50'
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                {isVid ? (
                  <div className="w-full h-full flex items-center justify-center text-pink-400">
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
    </div>
  );
};

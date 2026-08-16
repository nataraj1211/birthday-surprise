import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

interface Props {
  src?: string | null;
  autoPlayTrigger?: boolean;
}

export const AudioPlayer: React.FC<Props> = ({ src, autoPlayTrigger = false }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (autoPlayTrigger && src && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log('Autoplay prevented by browser policy:', err);
      });
    }
  }, [autoPlayTrigger, src, isPlaying]);

  if (!src) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekPercent = parseFloat(e.target.value);
    const duration = audioRef.current.duration || 1;
    audioRef.current.currentTime = (seekPercent / 100) * duration;
    setProgress(seekPercent);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        loop
      />

      <div className="flex items-center gap-2">
        {isExpanded && (
          <div className="glass-card bg-slate-900/85 border-slate-700/60 text-white rounded-2xl p-3 shadow-2xl flex items-center gap-3 backdrop-blur-xl animate-in fade-in slide-in-from-right duration-300">
            {/* Progress bar */}
            <div className="flex flex-col gap-1 w-28 sm:w-36">
              <span className="text-[10px] uppercase font-bold tracking-wider text-pink-300 flex items-center gap-1">
                <Music className="w-3 h-3" /> Birthday Tune
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Volume */}
            <button
              onClick={toggleMute}
              className="text-slate-300 hover:text-white transition-colors p-1"
              aria-label="Toggle mute"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500 hidden sm:block"
            />
          </div>
        )}

        {/* Play/Pause Main Floating Button */}
        <button
          onClick={() => {
            togglePlay();
            setIsExpanded(true);
          }}
          onMouseEnter={() => setIsExpanded(true)}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110 active:scale-95 ${
            isPlaying
              ? 'bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-pink-500/40 ring-4 ring-pink-400/30 animate-pulse'
              : 'bg-white text-slate-800 border border-pink-200 shadow-slate-300/50'
          }`}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
};

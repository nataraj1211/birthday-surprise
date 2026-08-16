import React, { useState } from 'react';
import { Heart, Sparkles, Star, Share2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../types/birthday';
import { FloatingRedHearts } from '../../common/FloatingRedHearts';
import { LiveCountdown } from '../LiveCountdown';
import { MemoryGallery } from '../MemoryGallery';
import { StoryTimelineView } from '../StoryTimelineView';
import { BirthdayLetterView } from '../BirthdayLetterView';
import { WishCardsGrid } from '../WishCardsGrid';
import { getExperienceConfig } from '../../../config/experienceConfig';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

export const GirlfriendExperience: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const config = getExperienceConfig('girlfriend');
  const [revealedReasons, setRevealedReasons] = useState<Record<string, boolean>>({});
  const [finaleRevealed, setFinaleRevealed] = useState(false);
  const [heartBurst, setHeartBurst] = useState(0);

  const toggleReason = (id: string) => {
    setRevealedReasons((prev) => ({ ...prev, [id]: !prev[id] }));
    setHeartBurst((c) => c + 1);
  };

  const triggerHeartExplosion = () => {
    setFinaleRevealed(true);
    setHeartBurst((c) => c + 2);

    const count = 200;
    const defaults = { origin: { y: 0.7 }, colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#ffffff'] };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Happy Birthday My Love, ${birthday.name}! ❤️🎂`,
        text: `A romantic birthday love story for ${birthday.name}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Romantic surprise link copied to clipboard! 📋❤️');
    }
  };

  return (
    <div className="space-y-16 pb-24 max-w-4xl mx-auto px-4">
      {/* Floating Hearts background layer */}
      <FloatingRedHearts autoSpawn={true} spawnIntervalMs={1200} key={heartBurst} />

      {/* 1. ROMANTIC HERO SECTION */}
      <section className="relative pt-12 pb-10 text-center overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          {/* Floating Love Crown & Avatar */}
          <div className="relative inline-block">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
              <span className="text-4xl drop-shadow-md">👑</span>
            </div>

            <div
              onClick={() => setHeartBurst((c) => c + 1)}
              className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2.5 mx-auto relative shadow-2xl transition-transform duration-500 hover:scale-105 cursor-pointer group"
              style={{
                background: 'linear-gradient(135deg, #be123c, #ec4899, #f43f5e)',
                boxShadow: '0 25px 60px rgba(244, 63, 94, 0.4)',
              }}
              title="Tap to send love hearts ❤️"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner bg-rose-50">
                <img
                  src={birthday.profile_image_url}
                  alt={birthday.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Glowing Romantic Badges */}
            <div className="absolute top-2 -left-4 animate-float-slow text-rose-500">
              <Heart className="w-8 h-8 fill-rose-500 drop-shadow-lg" />
            </div>
            <div className="absolute bottom-2 -right-4 animate-float-slow text-pink-500 delay-300">
              <Sparkles className="w-8 h-8 fill-current drop-shadow-lg" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border shadow-sm backdrop-blur-md"
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                color: '#be123c',
                borderColor: 'rgba(244, 63, 94, 0.3)',
              }}
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              {birthday.nickname ? `To My Dearest ${birthday.nickname}` : 'To The Love Of My Life'}
            </span>

            <h1
              className="text-4xl sm:text-6xl font-black tracking-tight"
              style={{ color: theme.colors.text }}
            >
              Happy Birthday,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">
                {birthday.name}
              </span>{' '}
              ❤️
            </h1>

            <p className="text-base sm:text-xl font-medium opacity-90 max-w-md mx-auto leading-relaxed">
              Today is the day the most precious, gorgeous soul came into the world. You are my greatest adventure. ✨
            </p>
          </div>
        </div>
      </section>

      {/* 2. LIVE COUNTDOWN */}
      <LiveCountdown targetDate={birthday.birthday_date} theme={theme} />

      {/* 3. EXCLUSIVE: REASONS I LOVE YOU SECTION */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm"
            style={{
              background: theme.colors.surface,
              color: '#be123c',
              borderColor: theme.colors.border,
            }}
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            {config.exclusiveFeatures.featureTitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black" style={{ color: theme.colors.text }}>
            Why You Are So Special To Me 🌹
          </h2>
          <p className="text-sm font-semibold opacity-75 max-w-md mx-auto">
            {config.exclusiveFeatures.featureSubtitle} (Tap each card to unlock)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.exclusiveFeatures.items?.map((item) => {
            const isRevealed = !!revealedReasons[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleReason(item.id)}
                className={`p-6 rounded-3xl backdrop-blur-xl border transition-all duration-300 cursor-pointer select-none group ${
                  isRevealed
                    ? 'ring-2 ring-rose-400/50 shadow-xl shadow-rose-500/15 bg-white/90'
                    : 'hover:scale-[1.02] bg-white/70 hover:bg-white/85 shadow-md'
                }`}
                style={{ borderColor: theme.colors.border }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    {item.icon || '❤️'}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                      <span className="text-xs font-black text-rose-500">
                        {isRevealed ? '❤️' : 'Tap to reveal'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      {isRevealed ? item.description : '•••••••••••••••••••••••••••••••••••••••• (Tap to read)'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. MEMORY GALLERY */}
      {birthday.memory_image_urls?.length > 0 && (
        <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
      )}

      {/* 5. ROMANTIC TIMELINE */}
      {birthday.story_data?.length > 0 && (
        <StoryTimelineView stories={birthday.story_data} theme={theme} />
      )}

      {/* 6. LOVE LETTER VIEW */}
      {birthday.birthday_message && (
        <BirthdayLetterView
          message={birthday.birthday_message}
          senderName={birthday.sender_name}
          theme={theme}
        />
      )}

      {/* 7. WISH CARDS */}
      <WishCardsGrid theme={theme} />

      {/* 8. GRAND ROMANTIC FINALE SURPRISE */}
      <section className="text-center space-y-6 pt-6">
        {!finaleRevealed ? (
          <div
            className="p-8 sm:p-12 rounded-3xl backdrop-blur-2xl border shadow-2xl space-y-6 max-w-xl mx-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,241,242,0.95))',
              borderColor: 'rgba(244, 63, 94, 0.4)',
              boxShadow: '0 25px 60px rgba(244, 63, 94, 0.25)',
            }}
          >
            <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 animate-pulse">
              <Heart className="w-10 h-10 fill-current" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
                One Final Secret From My Heart... ❤️
              </h3>
              <p className="text-sm font-semibold text-slate-500">
                Tap below for your special birthday love explosion!
              </p>
            </div>

            <button
              type="button"
              onClick={triggerHeartExplosion}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-black text-lg shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Heart className="w-5 h-5 fill-current" />
              <span>Reveal Heart Surprise 💖</span>
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div
            className="p-8 sm:p-12 rounded-3xl backdrop-blur-2xl border shadow-2xl space-y-6 max-w-xl mx-auto animate-in zoom-in-95 duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,228,230,0.95))',
              borderColor: 'rgba(244, 63, 94, 0.5)',
              boxShadow: '0 25px 60px rgba(244, 63, 94, 0.35)',
            }}
          >
            <div className="w-20 h-20 rounded-full mx-auto bg-rose-100 text-rose-500 flex items-center justify-center animate-bounce">
              <Star className="w-10 h-10 fill-current" />
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl sm:text-4xl font-black text-rose-600">
                Happy Birthday, My Love ❤️
              </h3>
              <p className="text-base sm:text-lg font-bold text-slate-700 leading-relaxed max-w-md mx-auto">
                "{birthday.custom_ending_message || config.defaultEndingMessage}"
              </p>
            </div>

            <div className="pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Forever Yours,</span>
              <span className="text-2xl font-serif font-extrabold text-rose-600">
                {birthday.sender_name} 💕
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={triggerHeartExplosion}
                className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500 hover:bg-rose-600 text-white shadow-md transition-transform hover:scale-105 cursor-pointer"
              >
                ❤️ More Hearts!
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-200 shadow-md hover:bg-slate-50 transition-transform hover:scale-105 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-rose-500" /> Share Love Story
              </button>
            </div>
          </div>
        )}

        {/* Replay intro curtain */}
        {onReplayIntro && (
          <div className="pt-4">
            <button
              type="button"
              onClick={onReplayIntro}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 hover:bg-white text-slate-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay From Opening Intro 💌
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

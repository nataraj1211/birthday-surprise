import React, { useState } from 'react';
import { Heart, Sparkles, Sun, Shield, Award, Share2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { BirthdayData, ThemeConfig } from '../../../types/birthday';
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

export const ParentExperience: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  const config = getExperienceConfig('parents');
  const [revealedTributes, setRevealedTributes] = useState<Record<string, boolean>>({});
  const [finaleRevealed, setFinaleRevealed] = useState(false);

  const toggleTribute = (id: string) => {
    setRevealedTributes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const triggerGoldenBlessing = () => {
    setFinaleRevealed(true);

    const count = 150;
    const defaults = { origin: { y: 0.7 }, colors: ['#f59e0b', '#d97706', '#fbbf24', '#fef3c7', '#ffffff'] };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    }

    fire(0.25, { spread: 26, startVelocity: 45 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Happy Birthday, ${birthday.name}! 🏡❤️`,
        text: `A heartfelt tribute for ${birthday.name}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tribute link copied to clipboard! 📋❤️');
    }
  };

  const parentTitle = birthday.relationship_role || 'Mom / Dad';

  return (
    <div className="space-y-16 pb-24 max-w-4xl mx-auto px-4 font-serif">
      {/* 1. ELEGANT PARENT HERO SECTION */}
      <section className="relative pt-12 pb-10 text-center overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10 font-sans">
          {/* Framed Family Portrait */}
          <div className="relative inline-block">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
              <span className="text-3xl drop-shadow-md">🕊️</span>
            </div>

            <div
              className="w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 mx-auto relative shadow-2xl transition-transform duration-500 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #b45309, #d97706, #fbbf24)',
                boxShadow: '0 20px 50px rgba(217, 119, 6, 0.35)',
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/90 shadow-inner bg-amber-50">
                <img
                  src={birthday.profile_image_url}
                  alt={birthday.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="absolute top-2 -left-4 text-amber-500">
              <Sun className="w-8 h-8 fill-amber-400 text-amber-500 drop-shadow-md" />
            </div>
            <div className="absolute bottom-2 -right-4 text-amber-600">
              <Shield className="w-8 h-8 fill-amber-500 text-amber-600 drop-shadow-md" />
            </div>
          </div>

          {/* Titles & Gratitude */}
          <div className="space-y-3">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border shadow-sm backdrop-blur-md"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#b45309',
                borderColor: 'rgba(217, 119, 6, 0.3)',
              }}
            >
              <Heart className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
              A Heartfelt Tribute to My First Hero ({parentTitle})
            </span>

            <h1
              className="text-4xl sm:text-6xl font-black tracking-tight font-serif"
              style={{ color: '#451a03' }}
            >
              Happy Birthday,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600">
                {birthday.name}
              </span>{' '}
              ❤️
            </h1>

            <p className="text-base sm:text-xl font-medium opacity-90 max-w-lg mx-auto leading-relaxed text-amber-950 font-serif">
              "Everything I am today started with your endless love, sacrifices, and guiding hands."
            </p>
          </div>
        </div>
      </section>

      {/* 2. COUNTDOWN */}
      <div className="font-sans">
        <LiveCountdown targetDate={birthday.birthday_date} theme={theme} />
      </div>

      {/* 3. EXCLUSIVE: FIRST HEROES & GRATITUDE SECTION */}
      <section className="space-y-6 font-sans">
        <div className="text-center space-y-2">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#b45309',
              borderColor: 'rgba(217, 119, 6, 0.3)',
            }}
          >
            <Award className="w-3.5 h-3.5 text-amber-600" />
            {config.exclusiveFeatures.featureTitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-amber-950 font-serif">
            My First Hero & Guiding Light 🏡
          </h2>
          <p className="text-sm font-semibold opacity-80 max-w-md mx-auto text-amber-900">
            {config.exclusiveFeatures.featureSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.exclusiveFeatures.items?.map((item) => {
            const isRevealed = !!revealedTributes[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleTribute(item.id)}
                className={`p-6 rounded-3xl backdrop-blur-xl border transition-all duration-300 cursor-pointer select-none group ${
                  isRevealed
                    ? 'ring-2 ring-amber-400/50 shadow-xl shadow-amber-500/10 bg-white/95'
                    : 'hover:scale-[1.02] bg-white/80 hover:bg-white shadow-md'
                }`}
                style={{ borderColor: 'rgba(217, 119, 6, 0.25)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    {item.icon || '❤️'}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-amber-950 font-serif">{item.title}</h3>
                      <span className="text-xs font-black text-amber-600">
                        {isRevealed ? '❤️' : 'Read'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {isRevealed ? item.description : '•••••••••••••••••••••••••••••••••••••••• (Tap to read)'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FAMILY MEMORIES */}
      {birthday.memory_image_urls?.length > 0 && (
        <div className="font-sans">
          <MemoryGallery images={birthday.memory_image_urls} theme={theme} />
        </div>
      )}

      {/* 5. FAMILY STORY TIMELINE */}
      {birthday.story_data?.length > 0 && (
        <div className="font-sans">
          <StoryTimelineView stories={birthday.story_data} theme={theme} />
        </div>
      )}

      {/* 6. LETTER OF GRATITUDE */}
      {birthday.birthday_message && (
        <BirthdayLetterView
          message={birthday.birthday_message}
          senderName={birthday.sender_name}
          theme={theme}
        />
      )}

      {/* 7. WISHES */}
      <div className="font-sans">
        <WishCardsGrid theme={theme} />
      </div>

      {/* 8. WARM GOLDEN BLESSING FINALE */}
      <section className="text-center space-y-6 pt-6 font-sans">
        {!finaleRevealed ? (
          <div
            className="p-8 sm:p-12 rounded-3xl backdrop-blur-2xl border shadow-2xl space-y-6 max-w-xl mx-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(254,243,199,0.95))',
              borderColor: 'rgba(217, 119, 6, 0.4)',
              boxShadow: '0 25px 60px rgba(217, 119, 6, 0.25)',
            }}
          >
            <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-tr from-amber-600 to-yellow-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse">
              <Sun className="w-10 h-10 fill-current" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-amber-950 font-serif">
                A Special Blessing For You... 🏡✨
              </h3>
              <p className="text-sm font-semibold text-amber-800">
                Tap to unwrap warmth, health, and golden wishes!
              </p>
            </div>

            <button
              type="button"
              onClick={triggerGoldenBlessing}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-white font-black text-lg shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Sun className="w-5 h-5 fill-current" />
              <span>Receive Birthday Blessings ✨</span>
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div
            className="p-8 sm:p-12 rounded-3xl backdrop-blur-2xl border shadow-2xl space-y-6 max-w-xl mx-auto animate-in zoom-in-95 duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(254,243,199,0.98))',
              borderColor: 'rgba(217, 119, 6, 0.5)',
              boxShadow: '0 25px 60px rgba(217, 119, 6, 0.3)',
            }}
          >
            <div className="w-20 h-20 rounded-full mx-auto bg-amber-100 text-amber-600 flex items-center justify-center animate-bounce">
              <Heart className="w-10 h-10 fill-current" />
            </div>

            <div className="space-y-3">
              <h3 className="text-3xl sm:text-4xl font-black text-amber-950 font-serif">
                Happy Birthday, {birthday.name}! ❤️
              </h3>
              <p className="text-base sm:text-lg font-bold text-amber-900 leading-relaxed max-w-md mx-auto whitespace-pre-line font-serif">
                "{birthday.custom_ending_message || config.defaultEndingMessage}"
              </p>
            </div>

            <div className="pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-amber-700">With All My Love & Gratitude,</span>
              <span className="text-2xl font-serif font-extrabold text-amber-900">
                Your Child, {birthday.sender_name} ❤️
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={triggerGoldenBlessing}
                className="px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-transform hover:scale-105 cursor-pointer"
              >
                ✨ Golden Confetti
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-white text-slate-800 border border-slate-200 shadow-md hover:bg-slate-50 transition-transform hover:scale-105 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-600" /> Share Tribute
              </button>
            </div>
          </div>
        )}

        {onReplayIntro && (
          <div className="pt-4">
            <button
              type="button"
              onClick={onReplayIntro}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 hover:bg-white text-slate-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay Tribute From Intro 🏡
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

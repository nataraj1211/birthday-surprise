import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { BirthdayData } from '../types/birthday';
import { getBirthdayBySlug } from '../services/birthdayService';
import { getThemeById } from '../config/themes';
import { IntroScreen } from '../components/public/IntroScreen';
import { ThemeParticleCanvas } from '../components/common/ThemeParticleCanvas';
import { ExperienceContainer } from '../components/public/experiences/ExperienceContainer';
import { AudioPlayer } from '../components/common/AudioPlayer';
import { NotFoundPage } from './NotFoundPage';

export const PublicBirthdayPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [birthday, setBirthday] = useState<BirthdayData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasOpenedIntro, setHasOpenedIntro] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    getBirthdayBySlug(slug)
      .then((data) => {
        if (data) {
          setBirthday(data);
          // Set page title for birthday person
          document.title = `Happy Birthday ${data.name}! 💕🎂`;
        } else {
          setNotFound(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setNotFound(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full border-4 border-pink-200 border-t-pink-500 animate-spin mb-4" />
        <p className="font-bold text-pink-600 text-lg">Preparing something special... 💕</p>
      </div>
    );
  }

  if (notFound || !birthday) {
    return <NotFoundPage />;
  }

  const theme = getThemeById(birthday.theme_id);

  return (
    <div
      className="min-h-screen relative transition-colors duration-500 font-sans selection:bg-pink-500 selection:text-white"
      style={{
        background: theme.colors.bgGradient,
        color: theme.colors.text,
      }}
    >
      {/* Intro Curtain Screen */}
      {!hasOpenedIntro && (
        <IntroScreen
          birthday={birthday}
          theme={theme}
          onOpen={() => setHasOpenedIntro(true)}
        />
      )}

      {/* Main Interactive Birthday Presentation */}
      {hasOpenedIntro && (
        <div className="relative z-10 animate-in fade-in duration-700">
          {/* Dynamic Theme Canvas Particle Physics */}
          <ThemeParticleCanvas
            particleType={theme.particleType}
            colors={theme.confettiColors}
          />

          <main className="pt-2">
            <ExperienceContainer
              birthday={birthday}
              theme={theme}
              onReplayCurtain={() => setHasOpenedIntro(false)}
            />
          </main>

          {/* Audio Player (Only starts after user tapped Open Your Surprise) */}
          <AudioPlayer src={birthday.music_url} autoPlayTrigger={hasOpenedIntro} />
        </div>
      )}
    </div>
  );
};

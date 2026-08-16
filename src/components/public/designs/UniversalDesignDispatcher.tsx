import React from 'react';
import type { BirthdayData, ThemeConfig } from '../../../types/birthday';
import { getDefaultDesignForRelationship } from '../../../config/designsConfig';

// Girlfriend designs
import { RomanticRoseRenderer } from './girlfriend/RomanticRoseRenderer';
import { MidnightLoveRenderer } from './girlfriend/MidnightLoveRenderer';
import { PolaroidLoveRenderer } from './girlfriend/PolaroidLoveRenderer';
import { CinematicLoveRenderer } from './girlfriend/CinematicLoveRenderer';
import { LoveLetterRenderer } from './girlfriend/LoveLetterRenderer';

// Parent designs
import { FamilyLegacyRenderer } from './parents/FamilyLegacyRenderer';
import { GoldenMemoriesRenderer } from './parents/GoldenMemoriesRenderer';
import { HomeHeartRenderer } from './parents/HomeHeartRenderer';
import { GratitudeStoryRenderer } from './parents/GratitudeStoryRenderer';
import { FamilyAlbumRenderer } from './parents/FamilyAlbumRenderer';

// Best Friend designs
import { ChaosModeRenderer } from './bestFriend/ChaosModeRenderer';
import { FriendshipWrappedRenderer } from './bestFriend/FriendshipWrappedRenderer';
import { ChatStoryRenderer } from './bestFriend/ChatStoryRenderer';
import { AdventureMapRenderer } from './bestFriend/AdventureMapRenderer';
import { PhotoWallRenderer } from './bestFriend/PhotoWallRenderer';

// Sibling designs
import { SiblingRoastRenderer } from './sibling/SiblingRoastRenderer';
import { ChildhoodTimeMachineRenderer } from './sibling/ChildhoodTimeMachineRenderer';
import { GameModeRenderer } from './sibling/GameModeRenderer';
import { SiblingScrapbookRenderer } from './sibling/SiblingScrapbookRenderer';
import { ForeverFamilyRenderer } from './sibling/ForeverFamilyRenderer';

// College Friend designs
import { CollegeIdRenderer } from './collegeFriend/CollegeIdRenderer';
import { SemesterJourneyRenderer } from './collegeFriend/SemesterJourneyRenderer';
import { AttendanceZeroRenderer } from './collegeFriend/AttendanceZeroRenderer';
import { CampusMapRenderer } from './collegeFriend/CampusMapRenderer';
import { GraduationMemoriesRenderer } from './collegeFriend/GraduationMemoriesRenderer';

// Crush designs
import { SoftLavenderRenderer } from './crush/SoftLavenderRenderer';
import { SecretNoteRenderer } from './crush/SecretNoteRenderer';
import { LittleThingsRenderer } from './crush/LittleThingsRenderer';
import { StarryCrushRenderer } from './crush/StarryCrushRenderer';
import { MinimalWhiteRenderer } from './crush/MinimalWhiteRenderer';

// Teacher designs
import { RoyalMentorRenderer } from './teacher/RoyalMentorRenderer';
import { ClassroomMemoriesRenderer } from './teacher/ClassroomMemoriesRenderer';
import { LessonsForLifeRenderer } from './teacher/LessonsForLifeRenderer';
import { ThankYouBookRenderer } from './teacher/ThankYouBookRenderer';
import { AcademicTimelineRenderer } from './teacher/AcademicTimelineRenderer';

// Special Person designs
import { MysteryRevealRenderer } from './specialPerson/MysteryRevealRenderer';
import { GalaxyUniverseRenderer } from './specialPerson/GalaxyUniverseRenderer';
import { GoldenCinematicRenderer } from './specialPerson/GoldenCinematicRenderer';
import { MemoryUniverseRenderer } from './specialPerson/MemoryUniverseRenderer';
import { SurpriseBoxRenderer } from './specialPerson/SurpriseBoxRenderer';

interface Props {
  birthday: BirthdayData;
  theme: ThemeConfig;
  onReplayIntro?: () => void;
}

export const UniversalDesignDispatcher: React.FC<Props> = ({
  birthday,
  theme,
  onReplayIntro,
}) => {
  // Resolve the design ID or fallback to the default design for the relationship
  const designId =
    birthday.design_id ||
    getDefaultDesignForRelationship(birthday.relationship_type || birthday.experience_type || 'girlfriend');

  switch (designId) {
    // 1. Girlfriend
    case 'romantic-rose':
      return <RomanticRoseRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'midnight-love':
      return <MidnightLoveRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'polaroid-love':
      return <PolaroidLoveRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'cinematic-love':
      return <CinematicLoveRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'love-letter':
      return <LoveLetterRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;

    // 2. Parents
    case 'family-legacy':
      return <FamilyLegacyRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'golden-memories':
      return <GoldenMemoriesRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'home-heart':
      return <HomeHeartRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'gratitude-story':
      return <GratitudeStoryRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'family-album':
      return <FamilyAlbumRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;

    // 3. Best Friend
    case 'chaos-mode':
      return <ChaosModeRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'friendship-wrapped':
      return <FriendshipWrappedRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'chat-story':
      return <ChatStoryRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'adventure-map':
      return <AdventureMapRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'photo-wall':
      return <PhotoWallRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;

    // 4. Sibling
    case 'sibling-roast':
      return <SiblingRoastRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'childhood-time-machine':
      return <ChildhoodTimeMachineRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'game-mode':
      return <GameModeRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'sibling-scrapbook':
      return <SiblingScrapbookRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'forever-family':
      return <ForeverFamilyRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;

    // 5. College Friend
    case 'college-id':
      return <CollegeIdRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'semester-journey':
      return <SemesterJourneyRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'attendance-zero':
      return <AttendanceZeroRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'campus-map':
      return <CampusMapRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'graduation-memories':
      return <GraduationMemoriesRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;

    // 6. Crush
    case 'soft-lavender':
      return <SoftLavenderRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'secret-note':
      return <SecretNoteRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'little-things':
      return <LittleThingsRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'starry-crush':
      return <StarryCrushRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'minimal-white':
      return <MinimalWhiteRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;

    // 7. Teacher / Mentor
    case 'royal-mentor':
      return <RoyalMentorRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'classroom-memories':
      return <ClassroomMemoriesRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'lessons-for-life':
      return <LessonsForLifeRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'thank-you-book':
      return <ThankYouBookRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'academic-timeline':
      return <AcademicTimelineRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;

    // 8. Special Person
    case 'mystery-reveal':
      return <MysteryRevealRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'galaxy-universe':
      return <GalaxyUniverseRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'golden-cinematic':
      return <GoldenCinematicRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'memory-universe':
      return <MemoryUniverseRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
    case 'surprise-box':
      return <SurpriseBoxRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;

    default:
      return <RomanticRoseRenderer birthday={birthday} theme={theme} onReplayIntro={onReplayIntro} />;
  }
};

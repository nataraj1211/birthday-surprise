export interface StoryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date?: string;
  image?: string;
}

export type ParticleType =
  | 'sakura'
  | 'stars'
  | 'sunset'
  | 'bubbles'
  | 'leaves'
  | 'confetti'
  | 'roses'
  | 'gold'
  | 'butterflies'
  | 'candies'
  | 'fireworks'
  | 'pastels';

export type ExperienceType =
  | 'girlfriend'
  | 'parents'
  | 'bestFriend'
  | 'sibling'
  | 'collegeFriend'
  | 'crush'
  | 'teacher'
  | 'specialPerson';

export type RelationshipType = ExperienceType;

export interface BirthdayDesign {
  id: string;
  relationship: RelationshipType;
  name: string;
  subtitle: string;
  description: string;
  theme_id: string;
  badge: string;
  tags: string[];
  gradient: string;
  previewImage?: string;
  heroStyle: string;
  timelineStyle: string;
  finaleStyle: string;
  features: string[];
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  bgGradient: string;
  surface: string;
  cardBg: string;
  text: string;
  mutedText: string;
  buttonBg: string;
  buttonText: string;
  glow: string;
  border: string;
  heartColor: string;
  sparkleColor: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  emoji: string;
  description: string;
  colors: ThemeColors;
  confettiColors: string[];
  particleType: ParticleType;
  fontHeading?: string;
  fontBody?: string;
}

export interface BirthdayData {
  id: string;
  slug: string;
  name: string;
  birthday_date: string; // YYYY-MM-DD
  sender_name: string;
  profile_image_url: string;
  memory_image_urls: string[];
  intro_text: string;
  birthday_message: string;
  music_url: string | null;
  theme_id: string;
  relationship_type?: ExperienceType;
  experience_type?: ExperienceType;
  design_id?: string;
  relationship_role?: string;
  nickname?: string;
  custom_ending_message?: string;
  story_data: StoryItem[];
  created_at: string;
  updated_at: string;
}

export interface BirthdayFormInput {
  name: string;
  birthday_date: string;
  sender_name: string;
  profile_image_url: string;
  memory_image_urls: string[];
  intro_text: string;
  birthday_message: string;
  music_url: string | null;
  theme_id: string;
  relationship_type?: ExperienceType;
  experience_type?: ExperienceType;
  design_id?: string;
  relationship_role?: string;
  nickname?: string;
  custom_ending_message?: string;
  story_data: StoryItem[];
}

export interface WishCard {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  message: string;
  gradient: string;
}

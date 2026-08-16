import type { BirthdayData } from '../types/birthday';

export const SAMPLE_BIRTHDAY: BirthdayData = {
  id: 'demo-sample-01',
  slug: '7xK92Lm',
  name: 'Sophia',
  birthday_date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0],
  sender_name: 'Alex & Friends',
  profile_image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  memory_image_urls: [
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80',
  ],
  intro_text: 'Someone who cares deeply about you has prepared a little surprise...',
  birthday_message: `Happy Birthday to the most shining soul! 💖✨

Words cannot express how grateful I am to have you in my life. Your smile lights up every room, your laughter is contagious, and your kindness inspires everyone around you.

May this new year bring you endless happiness, beautiful adventures, and all the dreams your heart desires. Always stay as wonderful, genuine, and radiant as you are today!`,
  music_url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=sweet-piano-112677.mp3',
  theme_id: 'rose-romance',
  experience_type: 'girlfriend',
  design_id: 'romantic-rose',
  relationship_role: 'My Love',
  nickname: 'Sweetheart',
  custom_ending_message: 'Happy Birthday, My Love ❤️',
  story_data: [
    {
      id: '1',
      title: 'The Beginning 🌱',
      subtitle: 'Where our adventure started',
      description: 'Remember the day we first met? Time flew by so fast, but that moment was the start of something truly special.',
    },
    {
      id: '2',
      title: 'Fun Moments 😂',
      subtitle: 'Unstoppable laughter & late-night chats',
      description: 'From endless tea sessions to laughing out loud at the silliest jokes, every second with you is a core memory.',
    },
    {
      id: '3',
      title: 'Crazy Memories 🤭',
      subtitle: 'Spontaneous trips & wild stories',
      description: 'The spontaneous weekend plans and crazy road trips we took together will forever be golden.',
    },
    {
      id: '4',
      title: 'Beautiful Days ✨',
      subtitle: 'Supporting each other through thick and thin',
      description: 'Thank you for always being there with a warm hug, comforting words, and belief in every dream.',
    },
    {
      id: '5',
      title: 'More Memories To Come 💕',
      subtitle: 'The best chapters are yet to be written',
      description: 'Here is to many more years of joy, growth, adventures, and celebrating life together!',
    },
  ],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

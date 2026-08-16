import type { ExperienceType, StoryItem, WishCard } from '../types/birthday';

export interface ExperienceConfigItem {
  id: ExperienceType;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  badge: string;
  gradient: string;
  borderGlow: string;
  defaultThemeId: string;
  defaultMusic: {
    name: string;
    url: string;
  };
  curtain: {
    badge: string;
    teaser: string;
    headingPrefix: string;
    headingSuffix: string;
    buttonText: string;
  };
  labels: {
    personName: string;
    namePlaceholder: string;
    roleLabel?: string;
    roleOptions?: string[];
    nicknameLabel?: string;
    nicknamePlaceholder?: string;
    messageTitle: string;
    messagePlaceholder: string;
    timelineTitle: string;
    memoriesTitle: string;
  };
  defaultStory: StoryItem[];
  defaultMessage: string;
  defaultEndingMessage: string;
  wishCards: WishCard[];
  exclusiveFeatures: {
    featureTitle: string;
    featureSubtitle: string;
    items?: Array<{
      id: string;
      title: string;
      subtitle?: string;
      description?: string;
      icon?: string;
      score?: string;
    }>;
  };
}

export const EXPERIENCE_CONFIGS: Record<ExperienceType, ExperienceConfigItem> = {
  girlfriend: {
    id: 'girlfriend',
    name: 'Girlfriend / Lover',
    emoji: '❤️',
    tagline: 'Romantic & deeply emotional',
    description: 'Dark rose gradients, glowing hearts, reasons I love you, love letter & heart explosion.',
    badge: 'Romantic Love Story',
    gradient: 'linear-gradient(135deg, #be123c 0%, #ec4899 50%, #f43f5e 100%)',
    borderGlow: 'rgba(244, 63, 94, 0.4)',
    defaultThemeId: 'rose-romance',
    defaultMusic: {
      name: 'Sweet Romantic Piano 🎹',
      url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=sweet-piano-112677.mp3',
    },
    curtain: {
      badge: 'From My Heart to Yours ❤️',
      teaser: 'Wait… I made something special for you ❤️',
      headingPrefix: 'Happy Birthday,',
      headingSuffix: 'My Love 💕',
      buttonText: 'Open My Surprise For You 💌',
    },
    labels: {
      personName: "Her / Partner's Name",
      namePlaceholder: 'e.g. Sophia, Emma, My Angel...',
      nicknameLabel: 'Pet Name / Term of Endearment',
      nicknamePlaceholder: 'e.g. Baby, Honey, Beautiful, Sweetheart...',
      messageTitle: 'A Love Letter From My Heart',
      messagePlaceholder: 'Write everything your heart feels — why she is special, your favorite memories, and your promises for tomorrow...',
      timelineTitle: 'Our Journey Together 🌹',
      memoriesTitle: 'Our Little Moments 📸',
    },
    defaultStory: [
      {
        id: 'gf-1',
        title: 'The First Spark ✨',
        subtitle: 'The day my world changed forever',
        description: 'Remember the first time our eyes locked? From that exact second, I knew you were going to be my forever favorite person.',
      },
      {
        id: 'gf-2',
        title: 'Late Night Talks 🌙',
        subtitle: 'Losing track of time with you',
        description: 'Hours felt like minutes whenever we talked about everything, nothing, and all our wildest shared dreams.',
      },
      {
        id: 'gf-3',
        title: 'Our Spontaneous Dates 🥂',
        subtitle: 'Laughter, warm hugs & hand-holding',
        description: 'Every little cafe visit, rainy walk, and quiet car ride became unforgettable simply because your hand was in mine.',
      },
      {
        id: 'gf-4',
        title: 'Our Beautiful Future 💍',
        subtitle: 'The best chapters are still ahead',
        description: 'I promise to love you, cherish your smile, and hold you through every season life brings us.',
      },
    ],
    defaultMessage: `Happy Birthday to the most gorgeous girl in the universe! ❤️✨

From the moment you entered my life, everything became brighter, warmer, and so much more meaningful. Your smile is my daily peace, your laughter is my favorite sound, and your gentle heart inspires me to be a better person every single day.

Thank you for being my lover, my best friend, my calm in the chaos, and my greatest blessing.

May this birthday bring you every ounce of happiness you give so selflessly to the world. I love you more than words could ever describe! 💕`,
    defaultEndingMessage: 'Happy Birthday, My Love ❤️ Forever and always yours.',
    wishCards: [
      {
        id: '1',
        title: 'Endless Love & Care 💖',
        subtitle: 'A love that grows every single day',
        emoji: '❤️',
        message: 'May you always feel deeply loved, protected, cherished, and treasured in every single second of your life.',
        gradient: 'linear-gradient(135deg, rgba(244,63,94,0.15), rgba(236,72,153,0.15))',
      },
      {
        id: '2',
        title: 'Unstoppable Smiles 😊',
        subtitle: 'That gorgeous smile that lights up my world',
        emoji: '✨',
        message: 'May your heart overflow with pure happiness, effortless laughter, and the sweetest peace.',
        gradient: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(168,85,247,0.15))',
      },
      {
        id: '3',
        title: 'All Your Wildest Dreams 🌟',
        subtitle: 'Watching you shine and conquer',
        emoji: '💫',
        message: 'May every dream, passion, and goal you whisper to the stars blossom into beautiful reality.',
        gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(244,63,94,0.15))',
      },
      {
        id: '4',
        title: 'Our Forever Journey 🌹',
        subtitle: 'Hand in hand through everything',
        emoji: '🥂',
        message: 'Here is to a lifetime of sunset drives, cozy hugs, shared adventures, and holding each other close.',
        gradient: 'linear-gradient(135deg, rgba(225,29,72,0.15), rgba(244,114,182,0.15))',
      },
    ],
    exclusiveFeatures: {
      featureTitle: 'Things I Love About You 💕',
      featureSubtitle: 'Just a few of the thousands of reasons you stole my heart',
      items: [
        {
          id: '1',
          title: 'Your Radiant Smile',
          description: 'The way your eyes crinkle when you laugh at the silly jokes we make.',
          icon: '✨',
        },
        {
          id: '2',
          title: 'Your Gentle Kindness',
          description: 'How you treat everyone with endless empathy, patience, and warmth.',
          icon: '🌸',
        },
        {
          id: '3',
          title: 'Your Warm Embraces',
          description: 'How safe and at home I feel the instant you wrap your arms around me.',
          icon: '🫂',
        },
        {
          id: '4',
          title: 'Your Beautiful Soul',
          description: 'You make every ordinary moment feel like pure magic.',
          icon: '💫',
        },
      ],
    },
  },

  parents: {
    id: 'parents',
    name: 'Parents (Mom / Dad)',
    emoji: '👨‍👩‍👦',
    tagline: 'Warm, emotional & deeply grateful',
    description: 'Warm cream & gold, family photo timeline, first heroes tribute & heartfelt blessings.',
    badge: 'Heartfelt Family Tribute',
    gradient: 'linear-gradient(135deg, #b45309 0%, #d97706 50%, #f59e0b 100%)',
    borderGlow: 'rgba(245, 158, 11, 0.4)',
    defaultThemeId: 'sunset-glow',
    defaultMusic: {
      name: 'Emotional Acoustic Warmth 🎸',
      url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a829e1.mp3?filename=acoustic-guitar-10827.mp3',
    },
    curtain: {
      badge: 'A Grateful Tribute From Your Child 🏡',
      teaser: 'Everything I am today started with you…',
      headingPrefix: 'Happy Birthday,',
      headingSuffix: 'My Hero ❤️',
      buttonText: 'Open Letter Of Gratitude 💌',
    },
    labels: {
      personName: "Parent's Name",
      namePlaceholder: 'e.g. Mom, Dad, Dearest Mother, Papa...',
      roleLabel: 'Relationship Role',
      roleOptions: ['Mom', 'Dad', 'Both Parents', 'Mother', 'Father'],
      nicknameLabel: 'What you lovingly call them',
      nicknamePlaceholder: 'e.g. Maa, Mummy, Papa, Dad, Amma...',
      messageTitle: 'A Letter of Gratitude To You',
      messagePlaceholder: 'Express your deep appreciation for their sacrifices, guidance, unconditional love, and blessings...',
      timelineTitle: 'Our Family Journey & Memories 🏡',
      memoriesTitle: 'Golden Family Photos 📸',
    },
    defaultStory: [
      {
        id: 'p-1',
        title: 'My First Steps & Your Guiding Hand 👣',
        subtitle: 'Holding me when I was small',
        description: 'You taught me how to walk, talk, and believe in myself. Every step I take is built on the strong foundation you gave me.',
      },
      {
        id: 'p-2',
        title: 'Unconditional Sacrifices 🌟',
        subtitle: 'Giving your best so I could have everything',
        description: 'I remember the countless times you put my comfort and dreams above your own without a single complaint.',
      },
      {
        id: 'p-3',
        title: 'Warm Hugs & Endless Comfort 🫂',
        subtitle: 'My safest shelter in the world',
        description: 'Whenever life felt overwhelming, hearing your voice and walking into home made all worries vanish away.',
      },
      {
        id: 'p-4',
        title: 'Walking In Your Footsteps ✨',
        subtitle: 'My greatest inspiration',
        description: 'I hope I make you proud every day, just as I am forever proud to call you my parent.',
      },
    ],
    defaultMessage: `Happy Birthday to the strongest, most loving parent in the whole world! ❤️

Words will never be enough to thank you for everything you have sacrificed, endured, and created for our family. You gave me roots to stay grounded and wings to chase every dream.

Your unconditional love, your quiet wisdom, and your endless patience have shaped every good part of who I am today.

May God bless you with vibrant health, peace of mind, endless laughter, and boundless joy. No matter how old I grow, I will always be your proud child!`,
    defaultEndingMessage: `No matter how old I become, I will always be your child.\n\nHappy Birthday with all my love ❤️`,
    wishCards: [
      {
        id: '1',
        title: 'Abundant Health & Long Life 🌿',
        subtitle: 'Vibrant strength and energy every day',
        emoji: '🌿',
        message: 'May every day ahead be blessed with robust health, boundless vitality, and refreshing peace.',
        gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(245,158,11,0.15))',
      },
      {
        id: '2',
        title: 'Pure Serenity & Happiness 🕊️',
        subtitle: 'Worry-free days filled with smiles',
        emoji: '☀️',
        message: 'May your heart be light, completely free from worries, and glowing with deep satisfaction and contentment.',
        gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(234,88,12,0.15))',
      },
      {
        id: '3',
        title: 'Family Love & Togetherness 🏡',
        subtitle: 'Cherished moments gathered together',
        emoji: '❤️',
        message: 'May our home always resonate with joyous laughter, warmth, shared meals, and golden memories.',
        gradient: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(245,158,11,0.15))',
      },
      {
        id: '4',
        title: 'Divine Blessings & Grace ✨',
        subtitle: 'Protection and peace from above',
        emoji: '🙏',
        message: 'May every path you walk be covered in grace, respect, honor, and heartfelt blessings.',
        gradient: 'linear-gradient(135deg, rgba(217,119,6,0.15), rgba(251,191,36,0.15))',
      },
    ],
    exclusiveFeatures: {
      featureTitle: 'Things I Never Say Enough ❤️',
      featureSubtitle: 'Deep truths I carry in my heart every single day',
      items: [
        {
          id: '1',
          title: 'Thank You For Believing In Me',
          description: 'Even when I doubted myself, your unwavering faith carried me through.',
          icon: '🌟',
        },
        {
          id: '2',
          title: 'Your Sacrifices Are Never Forgotten',
          description: 'I see all the quiet hard work you did behind the scenes for my future.',
          icon: '🛡️',
        },
        {
          id: '3',
          title: 'Your Wisdom Is My Guiding Light',
          description: 'Your life advice continues to be my compass in every tough decision.',
          icon: '🧭',
        },
        {
          id: '4',
          title: 'You Are My Forever Hero',
          description: 'There is no title on earth greater than being your child.',
          icon: '👑',
        },
      ],
    },
  },

  bestFriend: {
    id: 'bestFriend',
    name: 'Best Friend',
    emoji: '🫂',
    tagline: 'High energy, memes & crazy friendship stats',
    description: 'Bright playful styling, warning intro, friendship stats counters, polaroids & emoji explosions.',
    badge: 'Partner In Crime Edition',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
    borderGlow: 'rgba(59, 130, 246, 0.4)',
    defaultThemeId: 'rainbow-celebration',
    defaultMusic: {
      name: 'Upbeat Joy & Fun 🎸',
      url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a829e1.mp3?filename=acoustic-guitar-10827.mp3',
    },
    curtain: {
      badge: 'EMERGENCY BROADCAST 🚨',
      teaser: 'WARNING 🚨 Today is the birthday of the most annoying person I know!',
      headingPrefix: 'Happy Birthday,',
      headingSuffix: 'My Favorite Idiot 😂❤️',
      buttonText: 'Unwrap The Roast & Love 🎁',
    },
    labels: {
      personName: "Bestie's Name",
      namePlaceholder: 'e.g. Alex, Jake, Maya, bro...',
      nicknameLabel: 'Funny Nickname / Inside Joke',
      nicknamePlaceholder: 'e.g. Partner in Crime, Drama Queen, Chief Trouble Maker...',
      messageTitle: 'The Honest Truth About You',
      messagePlaceholder: 'Write your funny roast, inside jokes, secret memories, and why you would not trade them for the world...',
      timelineTitle: 'Our Epic Friendship Chronicles 🚀',
      memoriesTitle: 'Our Craziest Photos 📸',
    },
    defaultStory: [
      {
        id: 'bf-1',
        title: 'How We Became Friends 🤝',
        subtitle: 'Two weirdos recognizing each other',
        description: 'We met and instantly realized our shared brain cells were unmatched. The rest is legendary history.',
      },
      {
        id: 'bf-2',
        title: 'Our Craziest Late-Night Schemes 🍕',
        subtitle: 'Unplanned adventures & 3 AM food runs',
        description: 'From driving with no destination to crying of laughter at 2 AM over literally nothing.',
      },
      {
        id: 'bf-3',
        title: 'Surviving Life Together 🛡️',
        subtitle: 'Always in each others corner',
        description: 'Through bad decisions, heartbreak, successes, and drama — you never left my side.',
      },
      {
        id: 'bf-4',
        title: 'Next Level Trouble Ahead 🌍',
        subtitle: 'Getting old but never growing up',
        description: 'Here is to another year of causing trouble, laughing at inappropriate times, and staying inseparable.',
      },
    ],
    defaultMessage: `Happy Birthday to my favorite human catastrophe! 😂🎉

I honestly don't know how anyone else tolerates you, but somehow you became my absolute favorite person in this entire universe. Life would be unfathomably boring without your chaotic energy, terrible jokes, and 2 AM rants.

Thanks for knowing all my secrets and still choosing to be seen with me in public.

May this year bring you heaps of cash, endless good food, zero hangovers, and unforgettable adventures. Happy Birthday, Bestie! 🫂🔥`,
    defaultEndingMessage: `Life would be boring without you.\n\nHappy Birthday, Bro/Sis! 🫂🔥`,
    wishCards: [
      {
        id: '1',
        title: 'Unlimited Money & Success 💰',
        subtitle: 'So you can buy me expensive food',
        emoji: '💸',
        message: 'May your bank account be as thick as our stupidity when we make plans together!',
        gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.15))',
      },
      {
        id: '2',
        title: 'Endless Free Food 🍕',
        subtitle: 'And zero calories gained',
        emoji: '🍔',
        message: 'May you always find the best snacks and never run out of appetite for midnight feasts.',
        gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.15))',
      },
      {
        id: '3',
        title: 'Wild Unfiltered Memories 🚀',
        subtitle: 'Stories we can only tell in 30 years',
        emoji: '🎉',
        message: 'May this year be packed with road trips, festival chaos, spontaneous tickets, and zero regrets.',
        gradient: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))',
      },
      {
        id: '4',
        title: 'Loyal Friendship Forever 🫂',
        subtitle: 'You are stuck with me for life',
        emoji: '🔥',
        message: 'No refunds, no exchanges — you signed up for this friendship and you are never escaping!',
        gradient: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(16,185,129,0.15))',
      },
    ],
    exclusiveFeatures: {
      featureTitle: 'Official Friendship Stats 📊',
      featureSubtitle: 'Scientifically verified metrics of our chaotic bond',
      items: [
        { id: '1', title: 'Years Of Friendship', score: '5+ Yrs', icon: '⏳', description: 'Surviving each other' },
        { id: '2', title: 'Stupid Arguments', score: '1,420', icon: '🥊', description: 'Over who picked the restaurant' },
        { id: '3', title: 'Laughing Fits', score: '∞', icon: '😂', description: 'Until our stomachs hurt' },
        { id: '4', title: 'Late Night Calls', score: '999+', icon: '📞', description: 'Usually gossiping or venting' },
        { id: '5', title: 'Secrets Kept', score: '100%', icon: '🤐', description: 'Vaulted forever' },
        { id: '6', title: 'Shared Brain Cells', score: '0.5', icon: '🧠', description: 'And we share it on weekends' },
      ],
    },
  },

  sibling: {
    id: 'sibling',
    name: 'Brother / Sister',
    emoji: '👦',
    tagline: 'Playful banter, cartoon cards & funny sibling fights',
    description: 'Bright comic gradients, childhood fight milestones, funny debt counters & sibling buttons.',
    badge: 'Favorite Headache Edition',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%)',
    borderGlow: 'rgba(249, 115, 22, 0.4)',
    defaultThemeId: 'candy-pop',
    defaultMusic: {
      name: 'Fun & Playful Tune 🍭',
      url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a829e1.mp3?filename=acoustic-guitar-10827.mp3',
    },
    curtain: {
      badge: 'ATTENTION FAMILY MEMBERS 📢',
      teaser: 'Unfortunately… you were born today 😂',
      headingPrefix: 'Happy Birthday to my',
      headingSuffix: 'Favorite Headache! 😈',
      buttonText: 'Open Sibling Roast Box 🎁',
    },
    labels: {
      personName: "Sibling's Name",
      namePlaceholder: 'e.g. Lucas, Chloe, Big Bro, Little Sis...',
      roleLabel: 'Sibling Type',
      roleOptions: ['Brother', 'Sister', 'Older Brother', 'Older Sister', 'Younger Brother', 'Younger Sister'],
      nicknameLabel: 'Annoying Sibling Nickname',
      nicknamePlaceholder: 'e.g. Drama King, Remote Stealer, The Favorite Child (Fake)...',
      messageTitle: 'Secret Sibling Message',
      messagePlaceholder: 'Remind them of the childhood fights, stolen snacks, and why they are still your favorite family member...',
      timelineTitle: 'Childhood Fights & Golden Memories 🥊',
      memoriesTitle: 'Embarrassing & Cute Sibling Photos 📸',
    },
    defaultStory: [
      {
        id: 'sib-1',
        title: 'Fighting Over The TV Remote 📺',
        subtitle: 'The greatest battle of our childhood',
        description: 'Hours spent wrestling for control of cartoons, snitching to parents, and fake crying to get the other grounded.',
      },
      {
        id: 'sib-2',
        title: 'Stealing Each Others Snacks 🍫',
        subtitle: 'Criminal mastermind activities',
        description: 'You still owe me for that chocolate you ate from the fridge in 2018. I have not forgotten.',
      },
      {
        id: 'sib-3',
        title: 'Covering For Each Other 🤝',
        subtitle: 'Partners in crime against our parents',
        description: 'When real trouble showed up, we always had each others backs with the most elaborate alibis.',
      },
      {
        id: 'sib-4',
        title: 'Family Forever ❤️',
        subtitle: 'My day one companion',
        description: 'No matter where life takes us, nobody understands our weird family lore like you do.',
      },
    ],
    defaultMessage: `Happy Birthday to my favorite partner in childhood crime! 😂🎂

Mom and Dad may have brought you home, but somehow I ended up with the coolest (and most irritating) sibling on earth. Thanks for all the stolen clothes, ruined games, and hilarious memories.

Even though I pretend you annoy me 99% of the time, I am super grateful to have you as my sibling.

Enjoy your special day, eat all the cake, and remember: you still owe me money! 💸❤️`,
    defaultEndingMessage: `Fight with me today, fight with me tomorrow, but don't forget…\n\nYou are my family forever ❤️`,
    wishCards: [
      {
        id: '1',
        title: 'Free Money To Pay Me Back 💸',
        subtitle: 'Clearing your sibling debt',
        emoji: '🤑',
        message: 'May you become a multi-millionaire so you can finally return the money you borrowed in 2019!',
        gradient: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(236,72,153,0.15))',
      },
      {
        id: '2',
        title: 'Zero Chores Forever 🧹',
        subtitle: 'Leaving everything for someone else',
        emoji: '👑',
        message: 'May your room clean itself and Mom never ask you to wash the dishes today.',
        gradient: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(139,92,246,0.15))',
      },
      {
        id: '3',
        title: 'Big Dreams & Success 🚀',
        subtitle: 'Making the family proud',
        emoji: '🌟',
        message: 'Wishing you huge milestones, career wins, and all the happiness in the galaxy.',
        gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.15))',
      },
      {
        id: '4',
        title: 'Sibling Bond Forever 🫂',
        subtitle: 'Stuck with me for eternity',
        emoji: '❤️',
        message: 'No matter how much we argue, I will always fight the world for you.',
        gradient: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(249,115,22,0.15))',
      },
    ],
    exclusiveFeatures: {
      featureTitle: 'Interactive Sibling Trait Buttons 😈',
      featureSubtitle: 'Tap below to test sibling truth recognition',
      items: [
        { id: '1', title: 'Click if you are annoying 😈', description: 'CONFIRMED: 100% annoying daily!' },
        { id: '2', title: 'Click if you still owe me money 😂', description: 'INVOICE SENT: Pay up with birthday cake!' },
        { id: '3', title: 'Click for childhood memory 📸', description: 'UNLOCKED: Remember when you broke the vase and blamed the dog?' },
      ],
    },
  },

  collegeFriend: {
    id: 'collegeFriend',
    name: 'College Friend',
    emoji: '🎓',
    tagline: 'Campus nostalgia, fake report card & semester timeline',
    description: 'Blue & purple notebook UI, attendance jokes, canteen memories & graduation celebration.',
    badge: 'Campus Legends Edition',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #db2777 100%)',
    borderGlow: 'rgba(37, 99, 235, 0.4)',
    defaultThemeId: 'ocean-dream',
    defaultMusic: {
      name: 'College Lo-Fi Vibes 🎧',
      url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=dream-piano-10777.mp3',
    },
    curtain: {
      badge: 'CAMPUS NOTICE BOARD 🎓',
      teaser: 'Attendance: 0%\nBirthday Celebration: 100% 🎉',
      headingPrefix: 'Happy Birthday,',
      headingSuffix: 'Campus Legend! 🎓🎉',
      buttonText: 'Open College Yearbook 📚',
    },
    labels: {
      personName: "College Buddy's Name",
      namePlaceholder: 'e.g. Sam, Ethan, Zoe, Bro...',
      nicknameLabel: 'Campus / Batch Nickname',
      nicknamePlaceholder: 'e.g. Backbencher, Bunk Master, Professor...',
      messageTitle: 'A Message From Your Batchmate',
      messagePlaceholder: 'Recall the canteen hangouts, proxy attendances, exam stress, hostel stories, and future dreams...',
      timelineTitle: 'Our Semester-by-Semester Timeline 🎓',
      memoriesTitle: 'Campus & Hostel Snapshots 📸',
    },
    defaultStory: [
      {
        id: 'col-1',
        title: 'Semester 1: Day We Met 🎒',
        subtitle: 'Lost on campus trying to find lecture halls',
        description: 'Sitting in orientation completely clueless, we locked eyes, started complaining about the syllabus, and became best buddies.',
      },
      {
        id: 'col-2',
        title: 'Canteen & Bunking Sessions ☕',
        subtitle: 'More attendance at the chai stall than lectures',
        description: 'Solving life problems over endless cups of tea, instant noodles, and scheming how to get proxy attendance.',
      },
      {
        id: 'col-3',
        title: 'One-Night Exam Cramming 📚',
        subtitle: 'Engineering miracles at 4 AM',
        description: 'Studying the entire semester in 6 hours with energy drinks, panic memes, and mutual prayers.',
      },
      {
        id: 'col-4',
        title: 'College Trips & Farewells 🏖️',
        subtitle: 'Golden days we will never forget',
        description: 'Spontaneous hostel trips, budget travels, and singing our hearts out under the night sky.',
      },
    ],
    defaultMessage: `Happy Birthday to my favorite college survivor! 🎓🎉

College gave us degrees, but giving me a friend like you was the real jackpot. From skipping 8 AM lectures and writing last-minute assignments to dreaming about conquering the world over canteen snacks — those years are unforgettable.

May your career take off to the moon, your salary 10x, and your life be filled with success.

College may have ended, but this friendship is for life! Happy Birthday! 🚀`,
    defaultEndingMessage: `College may end one day…\n\nbut these memories won't.\n\nHappy Birthday! 🎓❤️`,
    wishCards: [
      {
        id: '1',
        title: 'Zero Monday Blues 💼',
        subtitle: 'High salary, low stress',
        emoji: '💼',
        message: 'May your boss be as lenient as our coolest professors and your career skyrocket!',
        gradient: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15))',
      },
      {
        id: '2',
        title: 'Infinite Reunion Trips ✈️',
        subtitle: 'Never letting the group chat die',
        emoji: '🏖️',
        message: 'May all our Goa / mountain trip plans actually make it out of the WhatsApp group!',
        gradient: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.15))',
      },
      {
        id: '3',
        title: 'Endless Success & Wealth 🏆',
        subtitle: 'Conquering the world',
        emoji: '🌟',
        message: 'May you achieve every promotion, startup dream, and milestone you ever aimed for.',
        gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(16,185,129,0.15))',
      },
      {
        id: '4',
        title: 'Timeless College Nostalgia 🎓',
        subtitle: 'Forever 20 at heart',
        emoji: '🥂',
        message: 'No matter how old we get, whenever we meet, we will always be those crazy college kids.',
        gradient: 'linear-gradient(135deg, rgba(219,39,119,0.15), rgba(124,58,237,0.15))',
      },
    ],
    exclusiveFeatures: {
      featureTitle: 'Official College Report Card 📝',
      featureSubtitle: 'Final verified GPA & performance breakdown',
      items: [
        { id: '1', title: 'Friendship Score', score: '100% (A+)', icon: '🌟', description: 'Unmatched loyalty' },
        { id: '2', title: 'Lecture Attendance', score: '35% (D-)', icon: '📉', description: 'Barely made hall ticket' },
        { id: '3', title: 'Assignment Submissions', score: '40% (C)', icon: '📋', description: 'Copied from group chat' },
        { id: '4', title: 'Canteen Fun', score: '99% (A+)', icon: '🍔', description: 'Master of tea & snacks' },
        { id: '5', title: 'Exam Night Panic', score: '100% (A+)', icon: '⚡', description: 'All-nighter specialist' },
        { id: '6', title: 'Golden Memories', score: '∞', icon: '✨', description: 'Priceless forever' },
      ],
    },
  },

  crush: {
    id: 'crush',
    name: 'Crush',
    emoji: '💖',
    tagline: 'Soft lavender, subtle romance & charming warmth',
    description: 'Tasteful pastel colors, gentle animations, things I admire about you & glowing hearts.',
    badge: 'Gentle & Sweet Edition',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #c084fc 100%)',
    borderGlow: 'rgba(168, 85, 247, 0.35)',
    defaultThemeId: 'lavender-butterfly',
    defaultMusic: {
      name: 'Soft Dream Instrumental ✨',
      url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=dream-piano-10777.mp3',
    },
    curtain: {
      badge: 'A Little Thought For You ✨',
      teaser: 'I had something to tell you…',
      headingPrefix: 'Happy Birthday,',
      headingSuffix: 'To Someone Special 💕',
      buttonText: 'Open Small Message 🌸',
    },
    labels: {
      personName: "Their Name",
      namePlaceholder: 'e.g. Mia, Liam, Ava...',
      nicknameLabel: 'Optional Compliment / Word',
      nicknamePlaceholder: 'e.g. Sunshine, Bright Eyes...',
      messageTitle: 'A Small Birthday Note',
      messagePlaceholder: 'Write a sweet, thoughtful note about their kindness, infectious smile, and genuine vibe...',
      timelineTitle: 'Moments That Made Me Smile 🌸',
      memoriesTitle: 'Beautiful Captures 📸',
    },
    defaultStory: [
      {
        id: 'cr-1',
        title: 'The First Time We Spoke ✨',
        subtitle: 'A sweet first impression',
        description: 'I still remember the first conversation we had. Your genuine vibe and warmth made my whole day brighter.',
      },
      {
        id: 'cr-2',
        title: 'That Unforgettable Smile 😊',
        subtitle: 'Lighting up every room',
        description: 'You have this effortless way of bringing positive energy and laughter wherever you go.',
      },
      {
        id: 'cr-3',
        title: 'Little Things I Notice 🌸',
        subtitle: 'Kindness in every gesture',
        description: 'The way you listen with full attention, encourage others, and stay authentically yourself is truly admirable.',
      },
      {
        id: 'cr-4',
        title: 'Wishing You Pure Joy 💫',
        subtitle: 'May your year be magical',
        description: 'You deserve all the sweetest surprises, good health, and wonderful memories this year.',
      },
    ],
    defaultMessage: `Happy Birthday to someone who brings so much natural light and warmth into the room! ✨🌸

I just wanted to take a moment to celebrate you today. Your smile is contagious, your kindness is so refreshing, and being around you always brings good energy.

May this new year of your life be filled with wonderful adventures, genuine peace, and all the dreams you hold close to your heart.

Have the most wonderful birthday! 💕`,
    defaultEndingMessage: `Maybe I don't say it often…\n\nbut you are someone really special to me.\n\nHappy Birthday ❤️`,
    wishCards: [
      {
        id: '1',
        title: 'Endless Sweet Smiles 😊',
        subtitle: 'May your joy never fade',
        emoji: '🌸',
        message: 'May every morning bring you a new reason to smile as brightly as you make others smile.',
        gradient: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(168,85,247,0.12))',
      },
      {
        id: '2',
        title: 'Peace & Serenity 🕊️',
        subtitle: 'Calm and happy days',
        emoji: '✨',
        message: 'May your days be gentle, stress-free, and filled with quiet comfort and warmth.',
        gradient: 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(59,130,246,0.12))',
      },
      {
        id: '3',
        title: 'Bright Opportunities 🌟',
        subtitle: 'Doors opening for you',
        emoji: '💫',
        message: 'May the universe reward your hard work and genuine soul with exciting new milestones.',
        gradient: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(236,72,153,0.12))',
      },
      {
        id: '4',
        title: 'Cherished Connections 💕',
        subtitle: 'Surrounded by genuine love',
        emoji: '🌷',
        message: 'May you always be surrounded by people who appreciate how truly wonderful you are.',
        gradient: 'linear-gradient(135deg, rgba(244,114,182,0.12), rgba(192,132,252,0.12))',
      },
    ],
    exclusiveFeatures: {
      featureTitle: 'Things I Admire About You ✨',
      featureSubtitle: 'A few genuine compliments on your special day',
      items: [
        { id: '1', title: 'Your Effortless Smile', description: 'It instantly brightens any room and spreads genuine warmth.', icon: '😊' },
        { id: '2', title: 'Your Gentle Manner', description: 'You treat people with respect, empathy, and genuine kindness.', icon: '🌸' },
        { id: '3', title: 'Your Positive Energy', description: 'Being around you makes ordinary moments feel delightful.', icon: '✨' },
        { id: '4', title: 'Your Unique Sparkle', description: 'You stay true to yourself, and that is what makes you so rare.', icon: '💫' },
      ],
    },
  },

  teacher: {
    id: 'teacher',
    name: 'Teacher / Mentor',
    emoji: '👨‍🏫',
    tagline: 'Respectful, inspirational & grateful',
    description: 'Navy & royal gold styling, lessons learned, impact timeline & golden particle celebration.',
    badge: 'Inspiring Mentor Edition',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #d97706 100%)',
    borderGlow: 'rgba(30, 58, 138, 0.4)',
    defaultThemeId: 'golden-luxury',
    defaultMusic: {
      name: 'Calm & Inspirational Instrumental 🎹',
      url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=sweet-piano-112677.mp3',
    },
    curtain: {
      badge: 'A TRIBUTE TO AN INSPIRING MENTOR 🎓',
      teaser: 'To a mentor who shaped minds and touched hearts…',
      headingPrefix: 'Happy Birthday,',
      headingSuffix: 'Respected Mentor! 🎓✨',
      buttonText: 'Open Letter of Respect 📜',
    },
    labels: {
      personName: "Teacher's / Mentor's Name",
      namePlaceholder: 'e.g. Prof. Anderson, Dr. Sarah, Sir, Ma\'am...',
      roleLabel: 'Title / Salutation',
      roleOptions: ['Sir', "Ma'am", 'Professor', 'Doctor', 'Teacher', 'Mentor', 'Guide'],
      nicknameLabel: 'Subject / Department',
      nicknamePlaceholder: 'e.g. Physics Department, Design Mentor, Favorite Professor...',
      messageTitle: 'A Letter of Gratitude & Respect',
      messagePlaceholder: 'Share the lessons that inspired you, how their guidance transformed your thinking, and heartfelt wishes...',
      timelineTitle: 'Milestones of Guidance & Learning 📚',
      memoriesTitle: 'Memorable Moments & Events 📸',
    },
    defaultStory: [
      {
        id: 'tch-1',
        title: 'The First Lesson & Inspiration 📖',
        subtitle: 'Igniting a spark for learning',
        description: 'From your very first lecture, you turned complex subjects into captivating stories that inspired us to think deeper.',
      },
      {
        id: 'tch-2',
        title: 'Patient Guidance & Mentorship 🧭',
        subtitle: 'Believing in our potential',
        description: 'Whenever we struggled with doubts or career paths, your door was always open with patient encouragement.',
      },
      {
        id: 'tch-3',
        title: 'Lessons Beyond Textbooks 🌟',
        subtitle: 'Values of discipline and integrity',
        description: 'You taught us not just how to pass exams, but how to conduct ourselves with character, humility, and ambition.',
      },
      {
        id: 'tch-4',
        title: 'Lasting Impact On Our Lives 🎓',
        subtitle: 'Grateful for your guidance forever',
        description: 'Every milestone we achieve in our careers carries a foundation built upon your wisdom and dedication.',
      },
    ],
    defaultMessage: `Respected Sir / Ma'am,

Happy Birthday! On this special day, I would like to express my deepest gratitude for your tireless dedication, patient guidance, and inspiring mentorship.

Great teachers inspire hope, ignite the imagination, and instill a love of learning — and you have done that and so much more for all of your students.

May you be blessed with abundant health, enduring peace, professional fulfillment, and joyful celebration. Thank you for making a profound difference in our lives! 🎓✨`,
    defaultEndingMessage: `Thank you for being more than a teacher.\n\nYou have been an inspiration.\n\nHappy Birthday, Sir/Ma'am! 🎓`,
    wishCards: [
      {
        id: '1',
        title: 'Enduring Health & Vitality 🌿',
        subtitle: 'Strength and energy to inspire',
        emoji: '🌿',
        message: 'May you be blessed with long life, robust well-being, and boundless energy.',
        gradient: 'linear-gradient(135deg, rgba(30,58,138,0.15), rgba(217,119,6,0.15))',
      },
      {
        id: '2',
        title: 'Academic & Professional Honor 🏆',
        subtitle: 'Recognition of your noble work',
        emoji: '🎓',
        message: 'May your contributions continue to be celebrated with great respect and high acclaim.',
        gradient: 'linear-gradient(135deg, rgba(217,119,6,0.15), rgba(245,158,11,0.15))',
      },
      {
        id: '3',
        title: 'Peace & Serenity 🕊️',
        subtitle: 'Fulfilling and quiet joy',
        emoji: '✨',
        message: 'May your days be peaceful, surrounded by proud students, family, and loved ones.',
        gradient: 'linear-gradient(135deg, rgba(30,58,138,0.15), rgba(59,130,246,0.15))',
      },
      {
        id: '4',
        title: 'Endless Gratitude 🙏',
        subtitle: 'From all your students',
        emoji: '🌟',
        message: 'May you take pride in the thousands of lives you have illuminated through your mentorship.',
        gradient: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(217,119,6,0.15))',
      },
    ],
    exclusiveFeatures: {
      featureTitle: 'The Lessons That Shaped Us 📚',
      featureSubtitle: 'Wisdom that stays with us far beyond the classroom',
      items: [
        { id: '1', title: 'Pursuit of Excellence', description: 'To never settle for average and always push our intellectual boundaries.', icon: '💡' },
        { id: '2', title: 'Integrity & Character', description: 'That true success is measured by honesty, humility, and moral strength.', icon: '🛡️' },
        { id: '3', title: 'Curiosity & Inquiry', description: 'To keep asking questions and remain lifelong eager learners.', icon: '🔍' },
        { id: '4', title: 'Resilience Through Setbacks', description: 'That failure is merely the first stepping stone toward mastery.', icon: '🌱' },
      ],
    },
  },

  specialPerson: {
    id: 'specialPerson',
    name: 'Special Person',
    emoji: '✨',
    tagline: 'Cinematic mystery, stardust & glowing reveals',
    description: 'Dark gold aesthetic, mystery clue reveal cards, slow cinematic animations & starry finale.',
    badge: 'Cinematic Mystery Edition',
    gradient: 'linear-gradient(135deg, #09090b 0%, #1e1b4b 50%, #4c1d95 100%)',
    borderGlow: 'rgba(251, 191, 36, 0.4)',
    defaultThemeId: 'midnight-magic',
    defaultMusic: {
      name: 'Cinematic Dream Ambient ✨',
      url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=dream-piano-10777.mp3',
    },
    curtain: {
      badge: 'A CINEMATIC MESSAGE 🌌',
      teaser: 'Someone deserves a very special message today…',
      headingPrefix: "It's",
      headingSuffix: 'YOU! ❤️✨',
      buttonText: 'Reveal The Mystery Surprise 🎁',
    },
    labels: {
      personName: "Special Person's Name",
      namePlaceholder: 'e.g. Alex, Maya, Jordan...',
      nicknameLabel: 'Special Title / Moniker',
      nicknamePlaceholder: 'e.g. One in a Million, The Rare Soul...',
      messageTitle: 'A Personal Mystery Letter',
      messagePlaceholder: 'Write about how rare, wonderful, and quietly impactful they are in your world...',
      timelineTitle: 'Moments of Wonder & Memories ✨',
      memoriesTitle: 'Treasured Snapshots 📸',
    },
    defaultStory: [
      {
        id: 'sp-1',
        title: 'An Unexpected Blessing 🌌',
        subtitle: 'How serendipity brought you here',
        description: 'Some people enter our lives like quiet constellations — instantly making everything brighter without even trying.',
      },
      {
        id: 'sp-2',
        title: 'Quiet Impact & Kindness 💫',
        subtitle: 'The magic you carry',
        description: 'Your presence alone brings comfort, genuine depth, and an undeniable spark to everyone around you.',
      },
      {
        id: 'sp-3',
        title: 'Rare Conversations & Deep Thoughts 🌙',
        subtitle: 'Moments that stay etched in time',
        description: 'Every conversation with you feels meaningful, grounding, and refreshingly authentic.',
      },
      {
        id: 'sp-4',
        title: 'To An Extraordinary Future 🌠',
        subtitle: 'May the universe shine upon you',
        description: 'May the stars align to bring you boundless joy, peace of mind, and all the magic you deserve.',
      },
    ],
    defaultMessage: `Happy Birthday to someone genuinely rare and unforgettable! ✨🌌

Some people enter our lives and quietly make everything better simply by existing. Your depth, your gentle kindness, and your remarkable spirit make you truly one in a million.

May this new chapter bring you peace, boundless wonder, unexpected joys, and everything your heart whispers for.

Celebrate yourself today — you are deeply appreciated and loved! ❤️`,
    defaultEndingMessage: `Some people enter our lives…\n\nand quietly make everything better.\n\nHappy Birthday ❤️`,
    wishCards: [
      {
        id: '1',
        title: 'Boundless Wonder & Magic 🌌',
        subtitle: 'Moments that take your breath away',
        emoji: '✨',
        message: 'May your life be filled with enchanting serendipities, deep awe, and starry dreams realized.',
        gradient: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(168,85,247,0.15))',
      },
      {
        id: '2',
        title: 'Quiet Peace & Fulfillment 🕊️',
        subtitle: 'A tranquil, glowing heart',
        emoji: '🌙',
        message: 'May you always find quiet stillness and deep harmony wherever your journey leads you.',
        gradient: 'linear-gradient(135deg, rgba(56,189,248,0.15), rgba(99,102,241,0.15))',
      },
      {
        id: '3',
        title: 'Unstoppable Radiance 🌟',
        subtitle: 'Shining your authentic light',
        emoji: '💫',
        message: 'May you never dim your light for anything, and continue inspiring those lucky enough to know you.',
        gradient: 'linear-gradient(135deg, rgba(244,63,94,0.15), rgba(251,191,36,0.15))',
      },
      {
        id: '4',
        title: 'Golden Blessings ✨',
        subtitle: 'The best is yet to come',
        emoji: '🥂',
        message: 'May every door you approach open smoothly into extraordinary new horizons.',
        gradient: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.15))',
      },
    ],
    exclusiveFeatures: {
      featureTitle: 'Mystery Clues: What Makes You Rare 🔍',
      featureSubtitle: 'Tap each mystery seal to reveal what makes you extraordinary',
      items: [
        { id: '1', title: 'Clue #1: Rare Authenticity', description: 'In a world of filters, your genuine heart is a breath of fresh air.', icon: '💎' },
        { id: '2', title: 'Clue #2: Quiet Strength', description: 'You carry grace, resilience, and wisdom through every season.', icon: '🛡️' },
        { id: '3', title: 'Clue #3: Magnetic Presence', description: 'You elevate conversations and make people feel truly seen.', icon: '✨' },
        { id: '4', title: 'Clue #4: Pure Gold Soul', description: 'Your warmth leaves a lasting imprint on everyone you meet.', icon: '👑' },
      ],
    },
  },
};

export const ALL_EXPERIENCE_TYPES: ExperienceType[] = [
  'girlfriend',
  'parents',
  'bestFriend',
  'sibling',
  'collegeFriend',
  'crush',
  'teacher',
  'specialPerson',
];

export function getExperienceConfig(type?: ExperienceType): ExperienceConfigItem {
  if (type && EXPERIENCE_CONFIGS[type]) {
    return EXPERIENCE_CONFIGS[type];
  }
  return EXPERIENCE_CONFIGS.girlfriend;
}

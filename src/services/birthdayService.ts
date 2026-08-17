import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { BirthdayData, BirthdayFormInput, ExperienceType } from '../types/birthday';
import { SAMPLE_BIRTHDAY } from '../config/defaultData';

const LOCAL_STORAGE_KEY = 'birthday_surprises_bloom_store';

/**
 * Generate a random alphanumeric slug of specified length
 */
export function generateRandomSlug(length = 7): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let slug = '';
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

/**
 * Generate a collision-safe unique slug by checking Supabase
 */
export async function generateUniqueSlug(maxAttempts = 5): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidate = generateRandomSlug(7);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('birthday_surprises')
          .select('id')
          .eq('slug', candidate)
          .maybeSingle();

        if (!error && !data) {
          return candidate; // Slug is available
        }
      } catch (err) {
        console.warn('Error checking slug uniqueness in Supabase:', err);
      }
    } else {
      // Local storage check
      const locals = getLocalBirthdays();
      if (!locals.some((b) => b.slug === candidate)) {
        return candidate;
      }
    }
  }

  // Fallback: timestamp-backed unique slug
  return `${generateRandomSlug(4)}${Date.now().toString(36).slice(-3)}`;
}

/**
 * Normalize raw Supabase record into strongly-typed BirthdayData
 */
function normalizeBirthdayRecord(raw: Record<string, unknown>): BirthdayData {
  const rel = (raw.relationship_type || raw.experience_type || 'girlfriend') as ExperienceType;
  
  let memoryImages: string[] = [];
  if (Array.isArray(raw.memory_image_urls)) {
    memoryImages = raw.memory_image_urls as string[];
  } else if (typeof raw.memory_image_urls === 'string') {
    try {
      memoryImages = JSON.parse(raw.memory_image_urls);
    } catch {
      memoryImages = [];
    }
  }

  let storyData = [];
  if (Array.isArray(raw.story_data)) {
    storyData = raw.story_data;
  } else if (typeof raw.story_data === 'string') {
    try {
      storyData = JSON.parse(raw.story_data);
    } catch {
      storyData = [];
    }
  }

  return {
    id: String(raw.id || ''),
    slug: String(raw.slug || ''),
    name: String(raw.name || ''),
    birthday_date: String(raw.birthday_date || ''),
    sender_name: String(raw.sender_name || ''),
    profile_image_url: String(raw.profile_image_url || ''),
    memory_image_urls: memoryImages,
    intro_text: String(raw.intro_text || ''),
    birthday_message: String(raw.birthday_message || ''),
    music_url: raw.music_url ? String(raw.music_url) : null,
    theme_id: String(raw.theme_id || 'sakura-dream'),
    relationship_type: rel,
    experience_type: rel,
    design_id: raw.design_id ? String(raw.design_id) : undefined,
    relationship_role: raw.relationship_role ? String(raw.relationship_role) : undefined,
    nickname: raw.nickname ? String(raw.nickname) : undefined,
    custom_ending_message: raw.custom_ending_message ? String(raw.custom_ending_message) : undefined,
    story_data: storyData,
    created_at: String(raw.created_at || new Date().toISOString()),
    updated_at: String(raw.updated_at || new Date().toISOString()),
  };
}

/**
 * Image Compression Helper to prevent LocalStorage QuotaExceededError when offline
 */
export async function compressImageFile(file: File, maxWidth = 800, quality = 0.75): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve((e.target?.result as string) || '');
        }
      };
      img.onerror = () => resolve((e.target?.result as string) || '');
      img.src = (e.target?.result as string) || '';
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

/**
 * Local Storage Helper Utilities
 */
export function getLocalBirthdays(): BirthdayData[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      const initial = [SAMPLE_BIRTHDAY];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((item) => normalizeBirthdayRecord(item)) : [SAMPLE_BIRTHDAY];
  } catch (err) {
    console.error('Error reading local storage', err);
    return [SAMPLE_BIRTHDAY];
  }
}

export function saveLocalBirthdays(birthdays: BirthdayData[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(birthdays));
  } catch (err) {
    console.warn('LocalStorage quota exceeded, attempting pruned save', err);
    try {
      // Strip large base64 images to fit within localStorage quota
      const pruned = birthdays.map((b) => ({
        ...b,
        profile_image_url: isDataUrl(b.profile_image_url) ? '' : b.profile_image_url,
        memory_image_urls: b.memory_image_urls.map((img) => (isDataUrl(img) ? '' : img)),
        music_url: isDataUrl(b.music_url || '') ? null : b.music_url,
      }));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pruned));
    } catch (e) {
      console.error('Failed to save to local storage even after pruning', e);
    }
  }
}

function isDataUrl(str: string): boolean {
  return str?.startsWith('data:') || false;
}

/**
 * Upload a media file (image or audio) to Supabase Storage with collision-safe naming.
 * Falls back to local compression / base64 if Supabase is unavailable.
 */
export async function uploadMediaFile(
  file: File,
  bucketName: 'birthday-images' | 'birthday-music' | 'birthday-videos' = 'birthday-images'
): Promise<string> {
  if (isSupabaseConfigured && supabase) {
    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || (file.type.startsWith('audio/') ? 'mp3' : file.type.startsWith('video/') ? 'mp4' : 'webp');
      const uniqueId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const targetBucket = bucketName === 'birthday-videos' ? 'birthday-images' : bucketName;
      const filePath = `uploads/${uniqueId}.${ext}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(targetBucket)
        .upload(filePath, file, {
          cacheControl: '31536000',
          upsert: true,
        });

      if (uploadError) {
        console.warn(`Supabase storage upload error for ${targetBucket}, using fallback:`, uploadError);
      } else if (uploadData) {
        const { data: publicUrlData } = supabase.storage
          .from(targetBucket)
          .getPublicUrl(filePath);
        return publicUrlData.publicUrl;
      }
    } catch (e) {
      console.warn('Storage upload exception:', e);
    }
  }

  // Fallback: Compress image for lightweight local storage
  if (file.type.startsWith('image/')) {
    return await compressImageFile(file, 800, 0.75);
  }

  // Fallback: Data URL for audio or video
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string) || '');
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Encode Birthday TEXT-ONLY data into a compact URL-safe payload (offline fallback).
 */
export function encodeBirthdayToUrlPayload(data: BirthdayData): string {
  try {
    const rel = data.relationship_type || data.experience_type || 'girlfriend';
    const compactObj = {
      n: data.name,
      d: data.birthday_date,
      s: data.sender_name,
      i: data.intro_text,
      b: data.birthday_message,
      t: data.theme_id,
      et: rel,
      did: data.design_id || 'romantic-rose',
      rr: data.relationship_role || '',
      nk: data.nickname || '',
      cem: data.custom_ending_message || '',
      sd: data.story_data.map((s) => ({
        id: s.id,
        t: s.title,
        st: s.subtitle,
        d: s.description,
      })),
      p: isDataUrl(data.profile_image_url) ? '' : data.profile_image_url,
      m: data.memory_image_urls.filter((url) => !isDataUrl(url)),
    };
    const jsonStr = JSON.stringify(compactObj);
    return btoa(unescape(encodeURIComponent(jsonStr)));
  } catch (e) {
    console.error('Failed to encode birthday payload', e);
    return '';
  }
}

/**
 * Decode URL payload back to Birthday Object.
 */
export function decodeBirthdayFromUrlPayload(payload: string, slug: string): BirthdayData | null {
  try {
    const jsonStr = decodeURIComponent(escape(atob(payload)));
    const o = JSON.parse(jsonStr);
    const rel = (o.et || 'girlfriend') as ExperienceType;
    return {
      id: `url_${slug}`,
      slug,
      name: o.n || 'Birthday Person',
      birthday_date: o.d || new Date().toISOString().split('T')[0],
      sender_name: o.s || 'Your Bestie',
      profile_image_url: o.p || SAMPLE_BIRTHDAY.profile_image_url,
      memory_image_urls: o.m && o.m.length > 0 ? o.m : SAMPLE_BIRTHDAY.memory_image_urls,
      intro_text: o.i || 'Someone special has prepared a surprise...',
      birthday_message: o.b || SAMPLE_BIRTHDAY.birthday_message,
      theme_id: o.t || 'sakura-dream',
      relationship_type: rel,
      experience_type: rel,
      design_id: o.did || undefined,
      relationship_role: o.rr || undefined,
      nickname: o.nk || undefined,
      custom_ending_message: o.cem || undefined,
      story_data: o.sd
        ? o.sd.map((s: { id?: string; t?: string; st?: string; d?: string }) => ({
            id: s.id || String(Math.random()),
            title: s.t || '',
            subtitle: s.st || '',
            description: s.d || '',
          }))
        : SAMPLE_BIRTHDAY.story_data,
      music_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  } catch (e) {
    console.error('Failed to decode birthday payload from URL', e);
    return null;
  }
}

export const PRODUCTION_ORIGIN = 'https://prise-vert-rho.vercel.app';

/**
 * Returns the verified production origin.
 * Strictly guarantees that localhost / 127.0.0.1 is NEVER encoded into QR codes or public links.
 */
export function getProductionOrigin(): string {
  const envUrl = (import.meta.env.VITE_PUBLIC_APP_URL || import.meta.env.VITE_APP_URL || '').trim();
  if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
    return envUrl.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined' && window.location.origin) {
    const origin = window.location.origin;
    if (!origin.includes('localhost') && !origin.includes('127.0.0.1') && !origin.startsWith('file:')) {
      return origin;
    }
  }

  return PRODUCTION_ORIGIN;
}

/**
 * Centralized share URL generator.
 * Produces exact complete HTTPS production URL: https://prise-vert-rho.vercel.app/birthday/SLUG
 */
export function getBirthdayShareUrl(birthday: BirthdayData): string {
  return `https://prise-vert-rho.vercel.app/birthday/${birthday.slug}`;
}

/**
 * Fetch a birthday page by unique slug.
 * Supabase Database is the primary and required source of truth for all public birthday links.
 */
export async function getBirthdayBySlug(slug: string): Promise<BirthdayData | null> {
  if (slug === 'demo' || slug === '7xK92Lm') {
    return SAMPLE_BIRTHDAY;
  }

  // Supabase Database Query (Production Source of Truth)
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('birthday_surprises')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (!error && data) {
        return normalizeBirthdayRecord(data);
      }
      if (error) {
        console.error('Supabase fetch by slug error:', error);
      }
    } catch (err) {
      console.error('Supabase query exception:', err);
    }
  }

  return null;
}

/**
 * Fetch a birthday page by unique ID
 */
export async function getBirthdayById(id: string): Promise<BirthdayData | null> {
  if (id === SAMPLE_BIRTHDAY.id) {
    return SAMPLE_BIRTHDAY;
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('birthday_surprises')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!error && data) {
        return normalizeBirthdayRecord(data);
      }
    } catch (err) {
      console.warn('Supabase fetch by ID failed:', err);
    }
  }

  const locals = getLocalBirthdays();
  return locals.find((b) => b.id === id) || null;
}

/**
 * Fetch all birthdays for Dashboard
 */
export async function getAllBirthdays(): Promise<BirthdayData[]> {
  let supabaseBirthdays: BirthdayData[] = [];

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('birthday_surprises')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        supabaseBirthdays = data.map((item) => normalizeBirthdayRecord(item));
      }
    } catch (err) {
      console.warn('Supabase fetch all failed:', err);
    }
  }

  const localBirthdays = getLocalBirthdays();

  const map = new Map<string, BirthdayData>();
  [...localBirthdays, ...supabaseBirthdays].forEach((item) => {
    map.set(item.slug, item);
  });

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

/**
 * Create a new Birthday surprise record with verified unique slug.
 * Supabase MUST be the source of truth; errors are thrown if publishing fails.
 */
export async function createBirthday(input: BirthdayFormInput): Promise<BirthdayData> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Please check your environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).');
  }

  const slug = await generateUniqueSlug();
  const now = new Date().toISOString();
  const rel = input.relationship_type || input.experience_type || 'girlfriend';
  const recordToInsert = {
    slug,
    name: input.name,
    birthday_date: input.birthday_date,
    sender_name: input.sender_name,
    profile_image_url: input.profile_image_url || SAMPLE_BIRTHDAY.profile_image_url,
    memory_image_urls: input.memory_image_urls && input.memory_image_urls.length > 0 ? input.memory_image_urls : SAMPLE_BIRTHDAY.memory_image_urls,
    intro_text: input.intro_text || 'Someone has prepared a little surprise for you...',
    birthday_message: input.birthday_message,
    music_url: input.music_url || null,
    theme_id: input.theme_id || 'sakura-dream',
    relationship_type: rel,
    experience_type: rel,
    design_id: input.design_id || 'romantic-rose',
    relationship_role: input.relationship_role || null,
    nickname: input.nickname || null,
    custom_ending_message: input.custom_ending_message || null,
    story_data: input.story_data || SAMPLE_BIRTHDAY.story_data,
    created_at: now,
    updated_at: now,
  };

  const { data, error } = await supabase
    .from('birthday_surprises')
    .insert([recordToInsert])
    .select()
    .single();

  if (error || !data) {
    console.error('Supabase insert error:', error);
    throw new Error(error?.message || 'Birthday could not be published to Supabase.');
  }

  const saved = normalizeBirthdayRecord(data);
  // Cache to local storage as creator convenience only
  const locals = getLocalBirthdays();
  saveLocalBirthdays([saved, ...locals.filter((b) => b.id !== saved.id)]);
  return saved;
}

/**
 * Update an existing Birthday surprise in Supabase
 */
export async function updateBirthday(id: string, input: BirthdayFormInput): Promise<BirthdayData> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Please check your environment variables.');
  }

  const existing = await getBirthdayById(id);
  const now = new Date().toISOString();
  const rel = input.relationship_type || input.experience_type || existing?.relationship_type || existing?.experience_type || 'girlfriend';

  const updatePayload = {
    name: input.name,
    birthday_date: input.birthday_date,
    sender_name: input.sender_name,
    profile_image_url: input.profile_image_url,
    memory_image_urls: input.memory_image_urls,
    intro_text: input.intro_text,
    birthday_message: input.birthday_message,
    music_url: input.music_url || null,
    theme_id: input.theme_id,
    relationship_type: rel,
    experience_type: rel,
    design_id: input.design_id || existing?.design_id || 'romantic-rose',
    relationship_role: input.relationship_role || null,
    nickname: input.nickname || null,
    custom_ending_message: input.custom_ending_message || null,
    story_data: input.story_data,
    updated_at: now,
  };

  const { data, error } = await supabase
    .from('birthday_surprises')
    .update(updatePayload)
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    console.error('Supabase update error:', error);
    throw new Error(error?.message || 'Birthday could not be updated in Supabase.');
  }

  const saved = normalizeBirthdayRecord(data);
  const locals = getLocalBirthdays().map((b) => (b.id === id ? saved : b));
  saveLocalBirthdays(locals);
  return saved;
}


/**
 * Delete a birthday record by ID
 */
export async function deleteBirthday(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('birthday_surprises').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete error:', err);
    }
  }

  const locals = getLocalBirthdays().filter((b) => b.id !== id && b.slug !== id);
  saveLocalBirthdays(locals);
  return true;
}

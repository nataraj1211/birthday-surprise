import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type {
  BirthdayData,
  BirthdayFormInput,
  ExperienceType,
} from '../types/birthday';
import { SAMPLE_BIRTHDAY } from '../config/defaultData';

const LOCAL_STORAGE_KEY = 'birthday_surprises_bloom_store';

/**
 * ============================================================
 * PRODUCTION URL
 * ============================================================
 */
export const PRODUCTION_ORIGIN =
  'https://birthday-surprise-vert-rho.vercel.app';

/**
 * Always return the permanent production domain.
 */
export function getProductionOrigin(): string {
  return PRODUCTION_ORIGIN;
}

/**
 * Generate the public URL for one birthday.
 */
export function getBirthdayShareUrl(birthday: BirthdayData): string {
  const slug = String(birthday.slug || '').trim();
  if (!slug) {
    throw new Error('Cannot generate birthday URL: slug is missing.');
  }
  return `${PRODUCTION_ORIGIN}/birthday/${encodeURIComponent(slug)}`;
}

/**
 * Alias used by other components.
 */
export function getBirthdayUrl(birthday: BirthdayData): string {
  return getBirthdayShareUrl(birthday);
}

/**
 * ============================================================
 * SLUG GENERATION
 * ============================================================
 */

export function generateRandomSlug(length = 8): string {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let slug = '';
  for (let i = 0; i < length; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

export async function generateUniqueSlug(maxAttempts = 10): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidate = generateRandomSlug(8);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('birthday_surprises')
          .select('id')
          .eq('slug', candidate)
          .maybeSingle();

        if (!error && !data) {
          return candidate;
        }
        if (!error && data) {
          continue;
        }
        if (error) {
          console.warn('Slug uniqueness check returned an error:', error);
        }
      } catch (error) {
        console.warn('Slug uniqueness check failed:', error);
      }
    } else {
      const locals = getLocalBirthdays();
      const exists = locals.some((birthday) => birthday.slug === candidate);
      if (!exists) {
        return candidate;
      }
    }
  }

  return `b${Date.now().toString(36)}${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * ============================================================
 * NORMALIZATION
 * ============================================================
 */

function normalizeBirthdayRecord(
  raw: Record<string, unknown>
): BirthdayData {
  const rel = (
    raw.relationship_type ||
    raw.experience_type ||
    'girlfriend'
  ) as ExperienceType;

  let memoryImages: string[] = [];
  if (Array.isArray(raw.memory_image_urls)) {
    memoryImages = raw.memory_image_urls.filter(
      (item): item is string => typeof item === 'string'
    );
  } else if (typeof raw.memory_image_urls === 'string') {
    try {
      const parsed = JSON.parse(raw.memory_image_urls);
      if (Array.isArray(parsed)) {
        memoryImages = parsed.filter(
          (item): item is string => typeof item === 'string'
        );
      }
    } catch {
      memoryImages = [];
    }
  }

  let storyData: BirthdayData['story_data'] = [];
  if (Array.isArray(raw.story_data)) {
    storyData = raw.story_data as BirthdayData['story_data'];
  } else if (typeof raw.story_data === 'string') {
    try {
      const parsed = JSON.parse(raw.story_data);
      if (Array.isArray(parsed)) {
        storyData = parsed as BirthdayData['story_data'];
      }
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
    profile_image_url: String(
      raw.profile_image_url ||
      SAMPLE_BIRTHDAY.profile_image_url ||
      ''
    ),
    memory_image_urls: memoryImages,
    intro_text: String(raw.intro_text || ''),
    birthday_message: String(raw.birthday_message || ''),
    music_url: raw.music_url ? String(raw.music_url) : null,
    theme_id: String(raw.theme_id || 'sakura-dream'),
    relationship_type: rel,
    experience_type: rel,
    design_id: raw.design_id ? String(raw.design_id) : undefined,
    relationship_role: raw.relationship_role
      ? String(raw.relationship_role)
      : undefined,
    nickname: raw.nickname ? String(raw.nickname) : undefined,
    custom_ending_message: raw.custom_ending_message
      ? String(raw.custom_ending_message)
      : undefined,
    story_data:
      storyData.length > 0 ? storyData : SAMPLE_BIRTHDAY.story_data,
    created_at: String(raw.created_at || new Date().toISOString()),
    updated_at: String(raw.updated_at || new Date().toISOString()),
  };
}

/**
 * ============================================================
 * IMAGE COMPRESSION & HELPERS
 * ============================================================
 */

export async function compressImageFile(
  file: File,
  maxWidth = 800,
  quality = 0.75
): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result !== 'string') {
        resolve('');
        return;
      }

      const image = new Image();
      image.onload = () => {
        let width = image.width;
        let height = image.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');
        if (!context) {
          resolve(result);
          return;
        }

        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };

      image.onerror = () => {
        resolve(result);
      };

      image.src = result;
    };

    reader.onerror = () => {
      resolve('');
    };

    reader.readAsDataURL(file);
  });
}

function isDataUrl(value: string): boolean {
  return typeof value === 'string' && value.startsWith('data:');
}

/**
 * ============================================================
 * LOCAL STORAGE STORAGE & CACHE
 * ============================================================
 */

export function getLocalBirthdays(): BirthdayData[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      return [SAMPLE_BIRTHDAY];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [SAMPLE_BIRTHDAY];
    }
    return parsed.map((item) => normalizeBirthdayRecord(item));
  } catch (error) {
    console.error('Error reading local birthdays:', error);
    return [SAMPLE_BIRTHDAY];
  }
}

export function saveLocalBirthdays(birthdays: BirthdayData[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(birthdays));
  } catch (err) {
    console.warn('LocalStorage quota exceeded, attempting pruned save', err);
    try {
      const pruned = birthdays.map((b) => ({
        ...b,
        profile_image_url: isDataUrl(b.profile_image_url) ? '' : b.profile_image_url,
        memory_image_urls: (b.memory_image_urls || []).map((img) =>
          isDataUrl(img) ? '' : img
        ),
        music_url: isDataUrl(b.music_url || '') ? null : b.music_url,
      }));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pruned));
    } catch (secondError) {
      console.error('Failed to save local birthdays:', secondError);
    }
  }
}

/**
 * ============================================================
 * MEDIA UPLOAD
 * ============================================================
 */

export async function uploadMediaFile(
  file: File,
  bucketName:
    | 'birthday-images'
    | 'birthday-music'
    | 'birthday-videos' = 'birthday-images'
): Promise<string> {
  if (isSupabaseConfigured && supabase) {
    try {
      const extension =
        file.name.split('.').pop()?.toLowerCase() ||
        (file.type.startsWith('audio/')
          ? 'mp3'
          : file.type.startsWith('video/')
          ? 'mp4'
          : 'webp');

      const uniqueId =
        typeof crypto !== 'undefined' &&
        typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

      const targetBucket =
        bucketName === 'birthday-videos' ? 'birthday-images' : bucketName;
      const filePath = `uploads/${uniqueId}.${extension}`;

      const { data, error } = await supabase.storage
        .from(targetBucket)
        .upload(filePath, file, {
          cacheControl: '31536000',
          upsert: false,
        });

      if (!error && data) {
        const { data: publicData } = supabase.storage
          .from(targetBucket)
          .getPublicUrl(filePath);

        if (publicData?.publicUrl) {
          return publicData.publicUrl;
        }
      }

      if (error) {
        console.warn('Supabase storage upload failed:', error);
      }
    } catch (error) {
      console.warn('Storage upload exception:', error);
    }
  }

  if (file.type.startsWith('image/')) {
    return compressImageFile(file, 800, 0.75);
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve((reader.result as string) || '');
    };
    reader.onerror = () => {
      resolve('');
    };
    reader.readAsDataURL(file);
  });
}

/**
 * ============================================================
 * URL PAYLOAD ENCODING / DECODING
 * ============================================================
 */

export function encodeBirthdayToUrlPayload(data: BirthdayData): string {
  try {
    const rel = (data.relationship_type ||
      data.experience_type ||
      'girlfriend') as ExperienceType;

    const compactObject = {
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
      sd: (data.story_data || []).map((story) => ({
        id: story.id,
        t: story.title,
        st: story.subtitle,
        d: story.description,
      })),
      p: isDataUrl(data.profile_image_url) ? '' : data.profile_image_url,
      m: (data.memory_image_urls || []).filter((url) => !isDataUrl(url)),
    };

    const json = JSON.stringify(compactObject);
    return btoa(unescape(encodeURIComponent(json)));
  } catch (error) {
    console.error('Failed to encode birthday payload:', error);
    return '';
  }
}

export function decodeBirthdayFromUrlPayload(
  payload: string,
  slug: string
): BirthdayData | null {
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
      memory_image_urls:
        Array.isArray(o.m) && o.m.length > 0
          ? o.m
          : SAMPLE_BIRTHDAY.memory_image_urls,
      intro_text: o.i || 'Someone special has prepared a surprise...',
      birthday_message: o.b || SAMPLE_BIRTHDAY.birthday_message,
      theme_id: o.t || 'sakura-dream',
      relationship_type: rel,
      experience_type: rel,
      design_id: o.did || undefined,
      relationship_role: o.rr || undefined,
      nickname: o.nk || undefined,
      custom_ending_message: o.cem || undefined,
      story_data: Array.isArray(o.sd)
        ? o.sd.map(
            (story: {
              id?: string;
              t?: string;
              st?: string;
              d?: string;
            }) => ({
              id: story.id || String(Math.random()),
              title: story.t || '',
              subtitle: story.st || '',
              description: story.d || '',
            })
          )
        : SAMPLE_BIRTHDAY.story_data,
      music_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Failed to decode birthday URL payload:', error);
    return null;
  }
}

/**
 * ============================================================
 * GET BIRTHDAY BY ID
 * ============================================================
 */

export async function getBirthdayById(
  id: string
): Promise<BirthdayData | null> {
  if (!id) {
    return null;
  }

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

      if (error) {
        console.warn('Supabase getBirthdayById error:', error);
      }
    } catch (error) {
      console.warn('Supabase fetch by ID failed:', error);
    }
  }

  const locals = getLocalBirthdays();
  return locals.find((birthday) => birthday.id === id) || null;
}

/**
 * ============================================================
 * GET BIRTHDAY BY SLUG
 * ============================================================
 */

export async function getBirthdayBySlug(
  slug: string
): Promise<BirthdayData | null> {
  const cleanSlug = String(slug || '').trim();
  if (!cleanSlug) {
    return null;
  }

  if (SAMPLE_BIRTHDAY.slug === cleanSlug) {
    return SAMPLE_BIRTHDAY;
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('birthday_surprises')
        .select('*')
        .eq('slug', cleanSlug)
        .maybeSingle();

      if (!error && data) {
        return normalizeBirthdayRecord(data);
      }

      if (error) {
        console.warn('Supabase getBirthdayBySlug error:', error);
      }
    } catch (error) {
      console.warn('Supabase fetch by slug failed:', error);
    }
  }

  const locals = getLocalBirthdays();
  return locals.find((birthday) => birthday.slug === cleanSlug) || null;
}

/**
 * ============================================================
 * GET ALL BIRTHDAYS
 * ============================================================
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
        supabaseBirthdays = data.map((record) =>
          normalizeBirthdayRecord(record)
        );
      }

      if (error) {
        console.warn('Supabase fetch all failed:', error);
      }
    } catch (error) {
      console.warn('Supabase fetch all exception:', error);
    }
  }

  const localBirthdays = getLocalBirthdays();
  const map = new Map<string, BirthdayData>();

  [...localBirthdays, ...supabaseBirthdays].forEach((birthday) => {
    if (birthday.slug) {
      map.set(birthday.slug, birthday);
    }
  });

  return Array.from(map.values()).sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

/**
 * ============================================================
 * CREATE BIRTHDAY
 * ============================================================
 */

export async function createBirthday(
  input: BirthdayFormInput
): Promise<BirthdayData> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      'Supabase is not configured. Please check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    );
  }

  const slug = await generateUniqueSlug();
  const now = new Date().toISOString();
  const rel = (input.relationship_type ||
    input.experience_type ||
    'girlfriend') as ExperienceType;

  const recordToInsert = {
    slug,
    name: input.name,
    birthday_date: input.birthday_date,
    sender_name: input.sender_name,
    profile_image_url:
      input.profile_image_url || SAMPLE_BIRTHDAY.profile_image_url,
    memory_image_urls:
      input.memory_image_urls && input.memory_image_urls.length > 0
        ? input.memory_image_urls
        : SAMPLE_BIRTHDAY.memory_image_urls,
    intro_text:
      input.intro_text || 'Someone has prepared a little surprise for you...',
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
    throw new Error(
      error?.message || 'Birthday could not be published to Supabase.'
    );
  }

  const saved = normalizeBirthdayRecord(data);
  const locals = getLocalBirthdays();
  saveLocalBirthdays([
    saved,
    ...locals.filter((birthday) => birthday.slug !== saved.slug),
  ]);

  return saved;
}

/**
 * ============================================================
 * UPDATE BIRTHDAY
 * ============================================================
 */

export async function updateBirthday(
  id: string,
  input: BirthdayFormInput
): Promise<BirthdayData> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      'Supabase is not configured. Please check your environment variables.'
    );
  }

  const existing = await getBirthdayById(id);
  if (!existing) {
    throw new Error('Birthday record was not found.');
  }

  const now = new Date().toISOString();
  const rel = (input.relationship_type ||
    input.experience_type ||
    existing.relationship_type ||
    existing.experience_type ||
    'girlfriend') as ExperienceType;

  const updatePayload = {
    name: input.name,
    birthday_date: input.birthday_date,
    sender_name: input.sender_name,
    profile_image_url: input.profile_image_url,
    memory_image_urls: input.memory_image_urls,
    intro_text: input.intro_text,
    birthday_message: input.birthday_message,
    music_url: input.music_url || null,
    theme_id: input.theme_id || existing.theme_id || 'sakura-dream',
    relationship_type: rel,
    experience_type: rel,
    design_id: input.design_id || existing.design_id || 'romantic-rose',
    relationship_role: input.relationship_role || null,
    nickname: input.nickname || null,
    custom_ending_message: input.custom_ending_message || null,
    story_data: input.story_data || existing.story_data,
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
    throw new Error(
      error?.message || 'Birthday could not be updated in Supabase.'
    );
  }

  const saved = normalizeBirthdayRecord(data);
  const locals = getLocalBirthdays().map((birthday) =>
    birthday.id === id ? saved : birthday
  );
  saveLocalBirthdays(locals);

  return saved;
}

/**
 * ============================================================
 * DELETE BIRTHDAY
 * ============================================================
 */

export async function deleteBirthday(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('birthday_surprises')
        .delete()
        .eq('id', id);

      if (error) {
        console.warn('Supabase delete error:', error);
        return false;
      }
    } catch (error) {
      console.warn('Supabase delete exception:', error);
      return false;
    }
  }

  const locals = getLocalBirthdays().filter(
    (birthday) => birthday.id !== id && birthday.slug !== id
  );
  saveLocalBirthdays(locals);
  return true;
}
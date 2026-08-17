-- ==============================================================================
-- BIRTHDAY BLOOM – PRODUCTION SUPABASE DATABASE & STORAGE SCHEMA
-- ==============================================================================

-- Enable UUID extension if not already available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create the main birthday surprises table
CREATE TABLE IF NOT EXISTS public.birthday_surprises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  birthday_date DATE NOT NULL,
  sender_name TEXT NOT NULL,
  profile_image_url TEXT,
  memory_image_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
  intro_text TEXT,
  birthday_message TEXT NOT NULL,
  music_url TEXT,
  theme_id TEXT NOT NULL DEFAULT 'sakura-dream',
  relationship_type TEXT NOT NULL DEFAULT 'girlfriend',
  experience_type TEXT DEFAULT 'girlfriend',
  design_id TEXT NOT NULL DEFAULT 'romantic-rose',
  relationship_role TEXT,
  nickname TEXT,
  custom_ending_message TEXT,
  story_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure all columns exist (in case table was created with default Supabase template)
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS birthday_date DATE;
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS sender_name TEXT;
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS profile_image_url TEXT;
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS memory_image_urls JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS intro_text TEXT;
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS birthday_message TEXT;
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS music_url TEXT;
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS theme_id TEXT DEFAULT 'sakura-dream';
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS relationship_type TEXT DEFAULT 'girlfriend';
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS experience_type TEXT DEFAULT 'girlfriend';
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS design_id TEXT DEFAULT 'romantic-rose';
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS relationship_role TEXT;
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS nickname TEXT;
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS custom_ending_message TEXT;
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS story_data JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- 2. Performance & Lookup Indexes
CREATE UNIQUE INDEX IF NOT EXISTS birthday_surprises_slug_idx ON public.birthday_surprises (slug);
CREATE INDEX IF NOT EXISTS birthday_surprises_created_at_idx ON public.birthday_surprises (created_at DESC);


-- 3. Automatic Updated_At Timestamp Trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_birthday_surprises_updated_at ON public.birthday_surprises;
CREATE TRIGGER set_birthday_surprises_updated_at
  BEFORE UPDATE ON public.birthday_surprises
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.birthday_surprises ENABLE ROW LEVEL SECURITY;

-- 5. Public RLS Policies for Birthday Bloom

-- Allow any visitor to view published birthday surprises by slug / id
DROP POLICY IF EXISTS "Allow public read access to birthday surprises" ON public.birthday_surprises;
CREATE POLICY "Allow public read access to birthday surprises"
  ON public.birthday_surprises
  FOR SELECT
  USING (true);

-- Allow public creation of birthday surprises
DROP POLICY IF EXISTS "Allow public insert to birthday surprises" ON public.birthday_surprises;
CREATE POLICY "Allow public insert to birthday surprises"
  ON public.birthday_surprises
  FOR INSERT
  WITH CHECK (true);

-- Allow public updates to existing surprises
DROP POLICY IF EXISTS "Allow public update to birthday surprises" ON public.birthday_surprises;
CREATE POLICY "Allow public update to birthday surprises"
  ON public.birthday_surprises
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow public deletion of surprises
DROP POLICY IF EXISTS "Allow public delete to birthday surprises" ON public.birthday_surprises;
CREATE POLICY "Allow public delete to birthday surprises"
  ON public.birthday_surprises
  FOR DELETE
  USING (true);

-- ==============================================================================
-- 6. SUPABASE STORAGE BUCKETS CONFIGURATION
-- ==============================================================================

-- Create public storage buckets for media assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('birthday-images', 'birthday-images', true, 26214400, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime']),
  ('birthday-music', 'birthday-music', true, 26214400, ARRAY['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a'])
ON CONFLICT (id) DO UPDATE SET 
  public = true,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage RLS Policies
DROP POLICY IF EXISTS "Public Read Birthday Images" ON storage.objects;
CREATE POLICY "Public Read Birthday Images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'birthday-images');

DROP POLICY IF EXISTS "Public Insert Birthday Images" ON storage.objects;
CREATE POLICY "Public Insert Birthday Images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'birthday-images');

DROP POLICY IF EXISTS "Public Update Birthday Images" ON storage.objects;
CREATE POLICY "Public Update Birthday Images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'birthday-images')
  WITH CHECK (bucket_id = 'birthday-images');

DROP POLICY IF EXISTS "Public Read Birthday Music" ON storage.objects;
CREATE POLICY "Public Read Birthday Music"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'birthday-music');

DROP POLICY IF EXISTS "Public Insert Birthday Music" ON storage.objects;
CREATE POLICY "Public Insert Birthday Music"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'birthday-music');

DROP POLICY IF EXISTS "Public Update Birthday Music" ON storage.objects;
CREATE POLICY "Public Update Birthday Music"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'birthday-music')
  WITH CHECK (bucket_id = 'birthday-music');

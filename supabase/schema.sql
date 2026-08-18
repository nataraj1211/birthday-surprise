-- ==============================================================================
-- BIRTHDAY BLOOM – PRODUCTION SUPABASE DATABASE & STORAGE SCHEMA
-- Multi-User Authentication, Row Level Security (RLS) & User Ownership
-- ==============================================================================

-- Enable UUID extension if not already available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create the main birthday surprises table
CREATE TABLE IF NOT EXISTS public.birthday_surprises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
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

-- Ensure all columns exist (safe non-destructive updates for existing databases)
ALTER TABLE public.birthday_surprises ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
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
CREATE INDEX IF NOT EXISTS birthday_surprises_user_id_idx ON public.birthday_surprises (user_id);
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

-- 5. Clean up any legacy public policies
DROP POLICY IF EXISTS "Allow public read access to birthday surprises" ON public.birthday_surprises;
DROP POLICY IF EXISTS "Allow public insert to birthday surprises" ON public.birthday_surprises;
DROP POLICY IF EXISTS "Allow public update to birthday surprises" ON public.birthday_surprises;
DROP POLICY IF EXISTS "Allow public delete to birthday surprises" ON public.birthday_surprises;
DROP POLICY IF EXISTS "Users can read own birthdays" ON public.birthday_surprises;
DROP POLICY IF EXISTS "Users can insert own birthdays" ON public.birthday_surprises;
DROP POLICY IF EXISTS "Users can update own birthdays" ON public.birthday_surprises;
DROP POLICY IF EXISTS "Users can delete own birthdays" ON public.birthday_surprises;
DROP POLICY IF EXISTS "Public can view single surprise by slug" ON public.birthday_surprises;

-- 6. User Isolation Policies (Strict Dashboard & Management Security)
-- Authenticated users can SELECT only their own birthday records
CREATE POLICY "Users can read own birthdays"
  ON public.birthday_surprises
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Authenticated users can INSERT only records with their own user_id
CREATE POLICY "Users can insert own birthdays"
  ON public.birthday_surprises
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can UPDATE only their own birthday records
CREATE POLICY "Users can update own birthdays"
  ON public.birthday_surprises
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can DELETE only their own birthday records
CREATE POLICY "Users can delete own birthdays"
  ON public.birthday_surprises
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 7. Public Surprise Access via Secure RPC Function
-- Enables anyone with a valid share URL /birthday/:slug to view only that specific birthday surprise
-- without exposing user_id or granting table-wide SELECT permissions to anonymous users.
CREATE OR REPLACE FUNCTION public.get_public_birthday_by_slug(lookup_slug TEXT)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  name TEXT,
  birthday_date DATE,
  sender_name TEXT,
  profile_image_url TEXT,
  memory_image_urls JSONB,
  intro_text TEXT,
  birthday_message TEXT,
  music_url TEXT,
  theme_id TEXT,
  relationship_type TEXT,
  experience_type TEXT,
  design_id TEXT,
  relationship_role TEXT,
  nickname TEXT,
  custom_ending_message TEXT,
  story_data JSONB,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id, slug, name, birthday_date, sender_name, profile_image_url, 
    memory_image_urls, intro_text, birthday_message, music_url, 
    theme_id, relationship_type, experience_type, design_id, 
    relationship_role, nickname, custom_ending_message, story_data, 
    created_at, updated_at
  FROM public.birthday_surprises 
  WHERE slug = lookup_slug 
  LIMIT 1;
$$;

-- Grant execution permission to public visitors (anon) and authenticated users
REVOKE ALL ON FUNCTION public.get_public_birthday_by_slug(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_birthday_by_slug(TEXT) TO anon, authenticated;

-- ==============================================================================
-- 8. SUPABASE STORAGE BUCKETS CONFIGURATION
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

DROP POLICY IF EXISTS "Authenticated Insert Birthday Images" ON storage.objects;
CREATE POLICY "Authenticated Insert Birthday Images"
  ON storage.objects FOR INSERT
  TO authenticated, anon
  WITH CHECK (bucket_id = 'birthday-images');

DROP POLICY IF EXISTS "Public Read Birthday Music" ON storage.objects;
CREATE POLICY "Public Read Birthday Music"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'birthday-music');

DROP POLICY IF EXISTS "Authenticated Insert Birthday Music" ON storage.objects;
CREATE POLICY "Authenticated Insert Birthday Music"
  ON storage.objects FOR INSERT
  TO authenticated, anon
  WITH CHECK (bucket_id = 'birthday-music');

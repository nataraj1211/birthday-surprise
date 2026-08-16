/**
 * Helper utility to determine whether a given URL or data URI represents a video or image.
 */

export function isVideoUrl(url: string | undefined | null): boolean {
  if (!url) return false;

  // Data URLs
  if (url.startsWith('data:video/')) return true;

  // Video file extensions
  const cleanUrl = url.split('?')[0].toLowerCase();
  if (
    cleanUrl.endsWith('.mp4') ||
    cleanUrl.endsWith('.webm') ||
    cleanUrl.endsWith('.mov') ||
    cleanUrl.endsWith('.m4v') ||
    cleanUrl.endsWith('.ogg') ||
    cleanUrl.endsWith('.ogv') ||
    cleanUrl.endsWith('.mkv')
  ) {
    return true;
  }

  // Common video hosting domains or keywords
  if (
    url.includes('youtube.com/watch') ||
    url.includes('youtu.be/') ||
    url.includes('youtube.com/shorts') ||
    url.includes('vimeo.com/') ||
    url.includes('streamable.com/') ||
    url.includes('supabase.co/storage/v1/object/public/birthday-videos/')
  ) {
    return true;
  }

  return false;
}

/**
 * Checks if the URL is a YouTube link and returns an embed URL
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;

  try {
    // youtu.be/ID
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch && shortMatch[1]) {
      return `https://www.youtube-nocookie.com/embed/${shortMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${shortMatch[1]}`;
    }

    // youtube.com/watch?v=ID or shorts/ID
    const longMatch = url.match(/(?:watch\?v=|shorts\/)([a-zA-Z0-9_-]+)/);
    if (longMatch && longMatch[1]) {
      return `https://www.youtube-nocookie.com/embed/${longMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${longMatch[1]}`;
    }
  } catch {
    return null;
  }

  return null;
}

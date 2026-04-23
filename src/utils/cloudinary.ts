/**
 * Cloudinary image optimization utility.
 *
 * Injects transformation parameters (f_auto, q_auto, width) into a
 * Cloudinary upload URL so the CDN returns an optimally compressed,
 * browser-appropriate format (WebP / AVIF) at the requested size.
 *
 * Usage:
 *   optimizeImage(url)          → auto format + auto quality (full res)
 *   optimizeImage(url, 600)     → auto format + auto quality + 600px wide
 */

const UPLOAD_SEGMENT = '/upload/';

export function optimizeImage(url: string, width?: number): string {
  if (!url || !url.includes(UPLOAD_SEGMENT)) return url;

  const transforms = ['f_auto', 'q_auto'];
  if (width) transforms.push(`w_${width}`);

  const idx = url.indexOf(UPLOAD_SEGMENT) + UPLOAD_SEGMENT.length;
  return url.slice(0, idx) + transforms.join(',') + '/' + url.slice(idx);
}

/**
 * Pre-configured presets for common use-cases.
 */
export const cloudImg = {
  /** Gallery thumbnail — 600px wide, auto format+quality */
  thumb:    (url: string) => optimizeImage(url, 600),
  /** Medium view — 900px wide */
  medium:   (url: string) => optimizeImage(url, 900),
  /** Lightbox / full — 1400px wide (still optimised format) */
  full:     (url: string) => optimizeImage(url, 1400),
  /** Hero images — 1200px wide */
  hero:     (url: string) => optimizeImage(url, 1200),
  /** Original with only format + quality optimisation */
  original: (url: string) => optimizeImage(url),
};

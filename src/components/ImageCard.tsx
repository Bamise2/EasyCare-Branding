import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { cloudImg } from '../utils/cloudinary';

interface ImageCardProps {
  imageUrl: string;
  title: string;
  category: string;
  variant?: 'flyer' | 'logo' | 'social' | 'book';
  index?: number;
  onImageClick?: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  title,
  category,
  variant = 'flyer',
  index = 0,
  onImageClick,
}) => {
  const cardRef    = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    /* ── Logo & Book  →  deep 3-D tilt + shimmer ── */
    if (variant === 'logo' || variant === 'book') {
      const onMove = (e: MouseEvent) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const nx = (e.clientX - left) / width  - 0.5;   // -0.5 … 0.5
        const ny = (e.clientY - top)  / height - 0.5;

        gsap.to(card, {
          rotateY: nx * 22,
          rotateX: -ny * 22,
          z: 18,
          transformPerspective: 700,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        if (shimmerRef.current) {
          gsap.to(shimmerRef.current, {
            x: nx * 40, y: ny * 40,
            opacity: 0.18,
            duration: 0.35,
            overwrite: 'auto',
          });
        }
        if (glowRef.current) {
          // Move the glow to follow pointer
          gsap.to(glowRef.current, {
            left: `${(e.clientX - card.getBoundingClientRect().left)}px`,
            top:  `${(e.clientY - card.getBoundingClientRect().top )}px`,
            opacity: 1,
            duration: 0.25,
            overwrite: 'auto',
          });
        }
      };
      const onLeave = () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, z: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
        if (shimmerRef.current) gsap.to(shimmerRef.current, { opacity: 0, duration: 0.5 });
        if (glowRef.current)    gsap.to(glowRef.current,    { opacity: 0, duration: 0.4 });
      };

      card.addEventListener('mousemove',  onMove);
      card.addEventListener('mouseleave', onLeave);
      return () => {
        card.removeEventListener('mousemove',  onMove);
        card.removeEventListener('mouseleave', onLeave);
      };
    }

    /* ── Flyer  →  magnetic float + subtle tilt ── */
    if (variant === 'flyer') {
      const onMove = (e: MouseEvent) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const nx = (e.clientX - left) / width  - 0.5;
        const ny = (e.clientY - top)  / height - 0.5;
        gsap.to(card, {
          x: nx * 10, y: ny * 10,
          rotateZ: nx * 1.5,
          rotateX: -ny * 6,
          rotateY:  nx * 6,
          transformPerspective: 900,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };
      const onLeave = () => {
        gsap.to(card, {
          x: 0, y: 0, rotateZ: 0, rotateX: 0, rotateY: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.3)',
        });
      };

      card.addEventListener('mousemove',  onMove);
      card.addEventListener('mouseleave', onLeave);
      return () => {
        card.removeEventListener('mousemove',  onMove);
        card.removeEventListener('mouseleave', onLeave);
      };
    }

    /* ── Social  →  image parallax zoom ── */
    if (variant === 'social') {
      const onMove = (e: MouseEvent) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const nx = (e.clientX - left) / width  - 0.5;
        const ny = (e.clientY - top)  / height - 0.5;
        if (imgRef.current) {
          gsap.to(imgRef.current, {
            x: nx * 14, y: ny * 14,
            scale: 1.07,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      };
      const onLeave = () => {
        if (imgRef.current) {
          gsap.to(imgRef.current, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' });
        }
      };

      card.addEventListener('mousemove',  onMove);
      card.addEventListener('mouseleave', onLeave);
      return () => {
        card.removeEventListener('mousemove',  onMove);
        card.removeEventListener('mouseleave', onLeave);
      };
    }
  }, [variant]);

  return (
    <div
      ref={cardRef}
      onClick={onImageClick}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      className={`
        group relative overflow-hidden bg-[rgba(0,24,48,0.6)] border border-white/12 rounded-sm cursor-none
        ${variant === 'book'  ? 'aspect-[2/3]' : 'aspect-square'}
        ${variant === 'logo'  ? 'shadow-[0_20px_60px_rgba(0,0,0,0.5)]' : ''}
        ${variant === 'book'  ? 'shadow-[0_20px_60px_rgba(0,0,0,0.6)]' : ''}
      `}
    >
      {/* Image */}
      <img
        ref={imgRef}
        src={cloudImg.thumb(imageUrl)}
        alt={title}
        loading={index < 8 ? 'eager' : 'lazy'}
        decoding="async"
        className="w-full h-full object-cover"
        style={{ willChange: 'transform', transition: 'filter 0.4s' }}
      />

      {/* Moving pointer glow (logo / book) */}
      {(variant === 'logo' || variant === 'book') && (
        <div
          ref={glowRef}
          className="absolute w-40 h-40 rounded-full pointer-events-none opacity-0"
          style={{
            background: 'radial-gradient(circle, rgba(255,140,0,0.2) 0%, transparent 70%)',
            transform: 'translate(-50%,-50%)',
          }}
        />
      )}

      {/* Shimmer (logo / book) */}
      {(variant === 'logo' || variant === 'book') && (
        <div
          ref={shimmerRef}
          className="absolute inset-0 pointer-events-none opacity-0 rounded-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
          }}
        />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/30 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-350
        flex flex-col justify-end p-4 gap-0.5">
        <p className="text-[9px] uppercase tracking-[0.45em] text-white/60 font-black">{category}</p>
        <h3 className="text-sm font-black uppercase tracking-tight leading-snug text-white">{title}</h3>
        <p className="text-[9px] text-white/50 mt-1.5 uppercase tracking-[0.3em]">Click to expand</p>
      </div>

      {/* White border on hover */}
      <div className="absolute inset-0 border border-transparent group-hover:border-white/25
        transition-colors duration-500 rounded-sm pointer-events-none" />
    </div>
  );
};

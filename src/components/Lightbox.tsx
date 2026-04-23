import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { ProjectItem } from '../types';
import { cloudImg } from '../utils/cloudinary';

interface LightboxProps {
  items: ProjectItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ items, currentIndex, onClose, onNavigate }) => {
  const overlayRef    = useRef<HTMLDivElement>(null);
  const backdropRef   = useRef<HTMLDivElement>(null);
  const contentRef    = useRef<HTMLDivElement>(null);
  const imageRef      = useRef<HTMLImageElement>(null);
  const infoRef       = useRef<HTMLDivElement>(null);
  const closingRef    = useRef(false);

  const current = items[currentIndex];

  /* ─── entrance ─── */
  useEffect(() => {
    closingRef.current = false;
    const tl = gsap.timeline();

    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.out' }
    )
    .fromTo(backdropRef.current,
      { scale: 1.08, opacity: 0 },
      { scale: 1,    opacity: 0.18, duration: 0.6, ease: 'power2.out' },
      0
    )
    .fromTo(contentRef.current,
      { scale: 0.82, y: 40, opacity: 0 },
      { scale: 1,    y: 0,  opacity: 1, duration: 0.55, ease: 'back.out(1.6)' },
      0.1
    )
    .fromTo(infoRef.current,
      { y: 20, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.45, ease: 'power3.out' },
      0.35
    );

    /* keyboard */
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      handleClose();
      if (e.key === 'ArrowRight')  handleNext();
      if (e.key === 'ArrowLeft')   handlePrev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── image swap animation ─── */
  useEffect(() => {
    if (!imageRef.current) return;
    gsap.fromTo(imageRef.current,
      { opacity: 0, scale: 0.94, filter: 'blur(6px)' },
      { opacity: 1, scale: 1,    filter: 'blur(0px)', duration: 0.4, ease: 'power2.out' }
    );
    gsap.fromTo(infoRef.current,
      { y: 12, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.35, ease: 'power2.out', delay: 0.1 }
    );
  }, [currentIndex]);

  /* ─── close ─── */
  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current,
      { scale: 0.88, y: 24, opacity: 0, duration: 0.3, ease: 'power2.in' }
    )
    .to(overlayRef.current,
      { opacity: 0, duration: 0.28, ease: 'power2.in' },
      '-=0.12'
    );
  }, [onClose]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) onNavigate(currentIndex + 1);
  }, [currentIndex, items.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) onNavigate(currentIndex - 1);
  }, [currentIndex, onNavigate]);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: 'rgba(0,5,12,0.96)', backdropFilter: 'blur(2px)' }}
    >
      {/* Blurred bg replica */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-cover bg-center blur-3xl scale-110 pointer-events-none"
        style={{ backgroundImage: `url(${cloudImg.thumb(current.imageUrl)})`, opacity: 0 }}
      />

      {/* Radial vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)' }}
      />

      {/* Clickable backdrop to close */}
      <div className="absolute inset-0 cursor-none" onClick={handleClose} />

      {/* ── Main panel ── */}
      <div ref={contentRef} className="relative z-10 flex items-center gap-4 md:gap-8 max-w-6xl w-full px-4 md:px-10">

        {/* Prev */}
        <button
          onClick={handlePrev}
          disabled={!hasPrev}
          className="shrink-0 w-11 h-11 rounded-full border border-white/10 flex items-center justify-center
            text-white/40 hover:text-white hover:border-brand-orange/50 hover:shadow-[0_0_20px_rgba(255,140,0,0.2)]
            transition-all duration-300 disabled:opacity-[0.12] cursor-none backdrop-blur-sm bg-white/5"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Image + info */}
        <div className="flex-1 flex flex-col items-center gap-5 min-w-0">
          {/* Image frame */}
          <div className="relative group/img w-full flex justify-center">
            <div className="absolute inset-0 rounded-sm border border-brand-orange/10 group-hover/img:border-brand-orange/30 transition-colors duration-500 pointer-events-none z-10" />
            <img
              ref={imageRef}
              src={cloudImg.full(current.imageUrl)}
              alt={current.title}
              className="max-h-[75vh] max-w-full object-contain rounded-sm shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
              style={{ willChange: 'transform, opacity, filter' }}
            />
            {/* Zoom hint */}
            <div className="absolute top-3 right-3 z-20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
              <ZoomIn size={14} className="text-brand-orange" />
            </div>
          </div>

          {/* Info */}
          <div ref={infoRef} className="text-center px-4">
            <p className="text-[9px] uppercase tracking-[0.5em] text-brand-orange mb-1.5 font-black">{current.category}</p>
            <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-white leading-tight">{current.title}</h3>
            {current.description && (
              <p className="text-xs text-white/35 mt-2 leading-relaxed">{current.description}</p>
            )}
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="w-6 h-[1px] bg-brand-orange/30" />
              <span className="text-[9px] tracking-[0.4em] text-white/20 uppercase font-black">
                {currentIndex + 1} / {items.length}
              </span>
              <div className="w-6 h-[1px] bg-brand-orange/30" />
            </div>
            {/* Dot nav */}
            <div className="mt-3 flex items-center justify-center gap-1.5 flex-wrap">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
                  className={`rounded-full transition-all duration-300 cursor-none ${
                    i === currentIndex
                      ? 'w-4 h-1.5 bg-brand-orange shadow-[0_0_8px_#ff8c00]'
                      : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={!hasNext}
          className="shrink-0 w-11 h-11 rounded-full border border-white/10 flex items-center justify-center
            text-white/40 hover:text-white hover:border-brand-orange/50 hover:shadow-[0_0_20px_rgba(255,140,0,0.2)]
            transition-all duration-300 disabled:opacity-[0.12] cursor-none backdrop-blur-sm bg-white/5"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Close */}
      <button
        onClick={handleClose}
        className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full border border-white/10 bg-white/5
          flex items-center justify-center text-white/40 hover:text-white hover:border-brand-orange/50
          hover:shadow-[0_0_20px_rgba(255,140,0,0.2)] transition-all duration-300 cursor-none backdrop-blur-sm"
      >
        <X size={16} />
      </button>

      {/* Keyboard hint */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-4 text-[9px] uppercase tracking-widest text-white/15 font-black pointer-events-none">
        <span>← → Navigate</span>
        <span className="text-white/10">|</span>
        <span>ESC Close</span>
      </div>
    </div>
  );
};

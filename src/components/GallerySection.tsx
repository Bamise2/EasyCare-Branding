import React, { useEffect, useRef, useState } from 'react';
import { ProjectItem, SectionType } from '../types';
import { ImageCard } from './ImageCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GallerySectionProps {
  type: SectionType;
  title: string;
  items: ProjectItem[];
  id?: string;
  onImageClick: (items: ProjectItem[], index: number) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  type, title, items, id, onImageClick,
}) => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);

  const INITIAL_COUNT = type === 'books' ? 12 : 10;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const displayedItems = items.slice(0, visibleCount);

  /* ─────────────────────────────────────────────────────────
     Heading character split animation
  ───────────────────────────────────────────────────────── */
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const chars = heading.querySelectorAll<HTMLElement>('.char');
    const label = labelRef.current;
    const divider = dividerRef.current;

    const ctx = gsap.context(() => {
      gsap.set(chars, { y: 90, opacity: 0, rotateX: -80 });

      // Heading chars
      gsap.fromTo(chars,
        { y: 90, opacity: 0, rotateX: -80 },
        {
          y: 0, opacity: 1, rotateX: 0,
          stagger: { each: 0.015, from: 'start' },
          duration: 0.8,
          ease: 'power3.out',
          transformPerspective: 800,
          scrollTrigger: {
            trigger: heading,
            start: 'top 95%',
            once: true,
          },
        }
      );

      if (label) {
        gsap.fromTo(label,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 95%', once: true },
          }
        );
      }

      if (divider) {
        gsap.fromTo(divider,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1, opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: heading, start: 'top 90%', once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ─────────────────────────────────────────────────────────
     Per-section gallery animations
  ───────────────────────────────────────────────────────── */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || displayedItems.length === 0) return;

    const ctx = gsap.context(() => {
      // Scope item query inside context so TypeScript correctly narrows to HTMLElement[]
      const items: HTMLElement[] = Array.from(
        grid.querySelectorAll<HTMLElement>('.gallery-item')
      );
      if (!items.length) return;

      /* ══════════════════════════════════════════════════════
         01 — LOGOS  "Pressed onto the page from above"
         Cards plunge down from high up, tilted forward on X,
         then land flat. Stagger from the centre outward.
      ══════════════════════════════════════════════════════ */
      if (type === 'logos') {
        gsap.fromTo(items,
          { y: -90, opacity: 0, scale: 0.72, rotateX: -65, z: -60 },
          {
            y: 0, opacity: 1, scale: 1, rotateX: 0, z: 0,
            stagger: { each: 0.06, from: 'center' },
            duration: 0.8,
            ease: 'back.out(1.2)',
            transformPerspective: 800,
            scrollTrigger: {
              id: `${id}-logos`,
              trigger: grid,
              start: 'top 92%',
              once: true,
            },
          }
        );
      }

      /* ══════════════════════════════════════════════════════
         02 — SOCIAL  "Depth-burst: cards erupt from behind"
         Cards start deep in z-space, small, and rush toward
         the viewer while fading in — like a feed loading.
         Stagger from the end (bottom-right → top-left).
      ══════════════════════════════════════════════════════ */
      if (type === 'social') {
        const cols = sectionRef.current?.querySelectorAll<HTMLElement>('.parallax-col');
        if (!cols) return;

        const speeds = [-70, 50, -100];

        cols.forEach((col: HTMLElement, i: number) => {
          // Parallax depth scrub on whole column
          gsap.to(col, {
            y: speeds[i],
            ease: 'none',
            scrollTrigger: {
              id: `${id}-parallax-${i}`,
              trigger: sectionRef.current,
              scrub: 1.8,
              start: 'top bottom',
              end:   'bottom top',
            },
          });

          // Column container fade
          gsap.fromTo(col,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: col, start: 'top 95%', once: true },
            }
          );

          // Cards burst forward from z-depth — unique to social
          const colItems = col.querySelectorAll<HTMLElement>('.gallery-item');
          gsap.fromTo(colItems,
            { opacity: 0, scale: 0.6, z: -120, rotateX: 28 },
            {
              opacity: 1, scale: 1, z: 0, rotateX: 0,
              stagger: { each: 0.08, from: 'end' },
              duration: 0.8,
              ease: 'back.out(1.2)',
              transformPerspective: 700,
              scrollTrigger: {
                trigger: col,
                start: 'top 90%',
                once: true,
              },
            }
          );
        });
      }

      /* ══════════════════════════════════════════════════════
         03 — BOOKS  "Rising off the shelf"  (baseline style)
         Books slide up from below while un-rotating in Y,
         like being lifted off a physical shelf. Left → right.
      ══════════════════════════════════════════════════════ */
      if (type === 'books') {
        gsap.fromTo(items,
          { y: 90, opacity: 0, scale: 0.82, rotateY: -22 },
          {
            y: 0, opacity: 1, scale: 1, rotateY: 0,
            stagger: { each: 0.05, from: 'start' },
            duration: 0.8,
            ease: 'back.out(1.2)',
            transformPerspective: 900,
            scrollTrigger: {
              id: `${id}-books`,
              trigger: grid,
              start: 'top 92%',
              once: true,
            },
          }
        );
      }

      /* ══════════════════════════════════════════════════════
         04 — FLYERS  "Dealt like cards from the right"
         Each flyer slides in from the right carrying a
         clockwise spin (rotateZ), like a deck being dealt
         across a table. Right → left reveal.
      ══════════════════════════════════════════════════════ */
      if (type === 'flyers') {
        gsap.fromTo(items,
          { x: 130, opacity: 0, scale: 0.84, rotateZ: -10 },
          {
            x: 0, opacity: 1, scale: 1, rotateZ: 0,
            stagger: { each: 0.05, from: 'end' },
            duration: 0.8,
            ease: 'back.out(1.2)',
            transformPerspective: 1000,
            scrollTrigger: {
              id: `${id}-flyers`,
              trigger: grid,
              start: 'top 92%',
              once: true,
            },
          }
        );
      }

    }, sectionRef); // ← closes gsap.context()

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedItems.length, type, id]);


  /* ─────────────────────────────────────────────────────────
     Section metadata
  ───────────────────────────────────────────────────────── */
  const sectionMetaMap: Record<SectionType, { index: string; subtitle: string }> = {
    logos:  { index: '01', subtitle: 'Branding & Visual Identity' },
    social: { index: '02', subtitle: 'Digital Campaigns' },
    books:  { index: '03', subtitle: 'Cover & Editorial Design' },
    flyers: { index: '04', subtitle: 'Church & Event Promotions' },
  };
  const sectionMeta = sectionMetaMap[type];

  const [line1, line2] = title.split(' & ');
  const mkChars = (word: string) =>
    word.split('').map((ch, i) => (
      <span key={i} className="char inline-block" style={{ perspective: '600px' }}>
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ));

  /* ─────────────────────────────────────────────────────────
     Render layouts
  ───────────────────────────────────────────────────────── */
  const renderGrid = () => {
    switch (type) {

      /* FLYERS — masonry-style 4-col, big accent card every 7th */
      case 'flyers':
        return (
          <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 auto-rows-auto">
            {displayedItems.map((item, idx) => (
              <div
                key={item.id}
                className={`gallery-item ${idx % 7 === 0 ? 'col-span-2 row-span-2' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ImageCard
                  imageUrl={item.imageUrl}
                  title={item.title}
                  category={item.category}
                  variant="flyer"
                  index={idx}
                  onImageClick={() => onImageClick(displayedItems, idx)}
                />
              </div>
            ))}
          </div>
        );

      /* LOGOS — 4-col grid with 3-D tilt cards */
      case 'logos':
        return (
          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6" style={{ perspective: '1200px' }}>
            {displayedItems.map((item, idx) => (
              <div key={item.id} className="gallery-item" style={{ transformStyle: 'preserve-3d' }}>
                <ImageCard
                  imageUrl={item.imageUrl}
                  title={item.title}
                  category={item.category}
                  variant="logo"
                  index={idx}
                  onImageClick={() => onImageClick(displayedItems, idx)}
                />
              </div>
            ))}
          </div>
        );

      /* SOCIAL — 3 parallax columns */
      case 'social': {
        const col1 = displayedItems.filter((_, i) => i % 3 === 0);
        const col2 = displayedItems.filter((_, i) => i % 3 === 1);
        const col3 = displayedItems.filter((_, i) => i % 3 === 2);
        return (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden" style={{ maxHeight: '135vh' }}>
            {[col1, col2, col3].map((colItems, colIdx) => (
              <div
                key={colIdx}
                className={`parallax-col flex flex-col gap-4 ${colIdx === 1 ? 'mt-10' : colIdx === 2 ? 'mt-5' : ''}`}
              >
                {colItems.map((item, itemIdx) => (
                  <div key={item.id} className="gallery-item">
                    <ImageCard
                      imageUrl={item.imageUrl}
                      title={item.title}
                      category={item.category}
                      variant="social"
                      index={itemIdx}
                      onImageClick={() => onImageClick(displayedItems, itemIdx * 3 + colIdx)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      }

      /* BOOKS — cover shelf layout */
      case 'books':
        return (
          <div
            ref={gridRef}
            className="flex flex-wrap justify-center gap-3 lg:gap-5 py-10"
            style={{ perspective: '1400px' }}
          >
            {displayedItems.map((item, idx) => (
              <div
                key={item.id}
                className="gallery-item w-28 md:w-40 lg:w-52 hover:-translate-y-3 hover:z-50 transition-transform duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ImageCard
                  imageUrl={item.imageUrl}
                  title={item.title}
                  category={item.category}
                  variant="book"
                  index={idx}
                  onImageClick={() => onImageClick(displayedItems, idx)}
                />
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className="py-32 px-4 md:px-12 lg:px-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #001525 0%, #001e38 60%, #001525 100%)' }}
    >
      {/* Dot-grid accent */}
      <div
        className="absolute top-0 right-0 w-80 h-80 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '22px 22px' }}
      />
      {/* Horizontal white rule at top of section */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Side line rule */}
      <div
        ref={dividerRef}
        className="absolute left-0 top-32 w-full h-[1px] origin-left"
        style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.12) 0%, transparent 60%)' }}
      />

      {/* ── Section header ── */}
      <div ref={labelRef} className="mb-16 flex items-start gap-6">
        <div className="flex flex-col items-center gap-2 pt-1 shrink-0">
          <span className="text-[9px] font-black text-orange uppercase tracking-[0.3em] md:tracking-[0.5em]">
            {sectionMeta?.index}
          </span>
          <div className="w-px h-14 bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        <div className="flex flex-col overflow-hidden">
          <span className="text-[9px] font-black uppercase tracking-[0.25em] md:tracking-[0.45em] text-white/50 mb-4 md:mb-5">
            {sectionMeta?.subtitle}
          </span>
          <h3
            ref={headingRef}
            className="text-3xl sm:text-5xl md:text-8xl font-black tracking-normal md:tracking-tighter uppercase leading-[1.1] md:leading-[0.85]"
            style={{ perspective: '600px' }}
          >
            <div className="flex flex-wrap text-white">{mkChars(line1)}</div>
            <div className="flex flex-wrap text-gradient-orange">{mkChars(line2 || 'Portfolio')}</div>
          </h3>
        </div>
      </div>

      {/* ── Grid ── */}
      {renderGrid()}

      {/* ── Load more ── */}
      {visibleCount < items.length && (
        <div className="mt-20 flex justify-center">
          <button
            onClick={() => setVisibleCount(prev => prev + 10)}
            className="group flex items-center gap-2 md:gap-3 px-6 md:px-10 py-4 md:py-5 border border-white/20 rounded-full
              text-white/80 uppercase text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.35em] font-black
              hover:bg-white hover:text-navy hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]
              transition-all duration-500 cursor-none"
          >
            <Plus size={14} className="group-hover:rotate-90 transition-transform duration-500" />
            See More Designs
          </button>
        </div>
      )}
    </section>
  );
};

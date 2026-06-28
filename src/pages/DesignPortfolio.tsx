import { useEffect, useRef, useState, useCallback } from 'react';
import { Navbar } from '../components/Navbar';
import { CanvasIntro } from '../components/CanvasIntro';
import { GallerySection } from '../components/GallerySection';
import { Outro } from '../components/Outro';
import { Lightbox } from '../components/Lightbox';
import { PORTFOLIO_DATA } from '../constants';
import { ProjectItem } from '../types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface LightboxState {
  open: boolean;
  items: ProjectItem[];
  index: number;
}

export default function App() {
  const cursorDotRef  = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [scrolled,    setScrolled]    = useState(false);
  const [lightbox,    setLightbox]    = useState<LightboxState>({ open: false, items: [], index: 0 });

  /* ── Dual-layer custom cursor ── */
  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) {
      if (cursorDotRef.current) cursorDotRef.current.style.display = 'none';
      if (cursorRingRef.current) cursorRingRef.current.style.display = 'none';
      return;
    }

    let curX = 0, curY = 0;
    let dotX = 0, dotY = 0;
    let animFrameId = 0;
    let scaleVal = 1;

    const moveCursor = (e: MouseEvent) => {
      curX = e.clientX;
      curY = e.clientY;
    };

    const animateRing = () => {
      dotX += (curX - dotX) * 0.15;
      dotY += (curY - dotY) * 0.15;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate3d(-50%, -50%, 0)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate3d(-50%, -50%, 0) scale(${scaleVal})`;
      }
      animFrameId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    animFrameId = requestAnimationFrame(animateRing);

    // Scale cursor on clickable elements
    const onHoverIn  = () => { scaleVal = 2.2; };
    const onHoverOut = () => { scaleVal = 1; };

    const hoverElements: HTMLElement[] = [];
    const setupHoverListeners = () => {
      document.querySelectorAll('button, a, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onHoverIn, { passive: true });
        el.addEventListener('mouseleave', onHoverOut, { passive: true });
        hoverElements.push(el as HTMLElement);
      });
    };

    const timerId = setTimeout(setupHoverListeners, 500);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(animFrameId);
      clearTimeout(timerId);
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
    };
  }, []);

  /* ── Gallery container fade-in ── */
  useEffect(() => {
    gsap.to('.gallery-container', {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.gallery-container', start: 'top 85%' },
    });
  }, []);

  /* ── Scroll-to-top button visibility ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Smooth scrollTo top ── */
  const scrollToTop = () => {
    gsap.to(window, { scrollTo: 0, duration: 1.8, ease: 'power4.inOut' });
  };

  /* ── Lightbox handlers ── */
  const openLightbox = useCallback((items: ProjectItem[], index: number) => {
    setLightbox({ open: true, items, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(prev => ({ ...prev, open: false }));
  }, []);

  const navigateLightbox = useCallback((index: number) => {
    setLightbox(prev => ({ ...prev, index }));
  }, []);

  return (
    <>
      <main className="relative bg-[#001529] text-white selection:bg-orange selection:text-white">

        {/* ── Custom Cursor ── */}
        <div
          ref={cursorDotRef}
          className="fixed w-2 h-2 bg-brand-orange rounded-full pointer-events-none z-[500] -translate-x-1/2 -translate-y-1/2"
          style={{ mixBlendMode: 'difference' }}
        />
        <div
          ref={cursorRingRef}
          className="fixed w-7 h-7 rounded-full border border-brand-orange/50 pointer-events-none z-[499] -translate-x-1/2 -translate-y-1/2"
          style={{ mixBlendMode: 'difference' }}
        />

        {/* ── Atmospheric glows ── */}
        <div className="fixed top-[-15%] left-[-8%]  w-[750px] h-[750px] rounded-full blur-[160px] pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle, rgba(0,60,120,0.35) 0%, transparent 70%)' }} />
        <div className="fixed bottom-[-10%] right-[-5%]  w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle, rgba(255,140,0,0.18) 0%, transparent 70%)' }} />
        {/* Shimmer top-right */}
        <div className="fixed top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 70%)' }} />

        <Navbar />

        {/* ── Hero intro ── */}
        <CanvasIntro />

        {/* ── Gallery sections: Logos → Social → Books → Flyers ── */}
        <div className="gallery-container opacity-0 relative z-10">
          <GallerySection
            id="logos"
            type="logos"
            title="Logos"
            items={PORTFOLIO_DATA.logos}
            onImageClick={openLightbox}
          />
          <GallerySection
            id="social"
            type="social"
            title="Social Media Campaigns  "
            items={PORTFOLIO_DATA.social}
            onImageClick={openLightbox}
          />
          <GallerySection
            id="books"
            type="books"
            title="Cover Designs  "
            items={PORTFOLIO_DATA.books}
            onImageClick={openLightbox}
          />
          <GallerySection
            id="flyers"
            type="flyers"
            title="Event Flyers  "
            items={PORTFOLIO_DATA.flyers}
            onImageClick={openLightbox}
          />
        </div>

        <Outro />

        {/* ── Scroll to top ── */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-[60] p-4 rounded-full border border-orange/40
            text-orange hover:bg-orange hover:text-navy
            hover:shadow-[0_0_30px_rgba(255,140,0,0.5)]
            transition-all duration-400 cursor-none
            ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        >
          <ArrowUp size={18} />
        </button>

        {/* ── Global vignette ── */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </main>

      {/* ── Lightbox (outside main to avoid stacking context issues) ── */}
      {lightbox.open && (
        <Lightbox
          items={lightbox.items}
          currentIndex={lightbox.index}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </>
  );
}

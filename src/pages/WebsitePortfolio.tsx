import { useEffect, useRef, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Outro } from '../components/Outro';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowUp, ExternalLink, Globe, Code2, Smartphone, Monitor } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ── Website Project Data ── */
interface WebProject {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  accentColor: string;
  link: string;
  year: string;
  mockupUrl?: string;
}

const WEB_PROJECTS: WebProject[] = [
  {
    id: 'web-1',
    title: 'EasyCare Branding',
    category: 'Agency Website',
    description: 'Our own creative branding agency landing page — featuring GSAP scroll-driven animations, a dynamic typewriter hero, interactive portfolio cards, and a dark-themed design portfolio showcase.',
    tags: ['React', 'TypeScript', 'GSAP', 'Tailwind CSS'],
    gradient: 'from-[#ff8c00] to-[#cc5500]',
    accentColor: 'rgba(255,140,0,0.2)',
    link: '/',
    year: '2026',
  },
  {
    id: 'web-2',
    title: 'EasyPrint Marketplace',
    category: 'E-Commerce Platform',
    description: 'A multi-vendor print marketplace connecting customers with local print shops. Features vendor dashboards, dynamic order flows, real-time tracking, and full Naira-based checkout with Paystack.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Paystack'],
    gradient: 'from-[#3b82f6] to-[#1e3a5f]',
    accentColor: 'rgba(59,130,246,0.2)',
    link: '#',
    year: '2026',
  },
  {
    id: 'web-3',
    title: 'Premium Hair Gallery',
    category: 'E-Commerce Store',
    description: 'High-end hair product e-commerce store with a luxurious dark-mode aesthetic. Immersive shopping experience with high-resolution imagery, smooth transitions, and integrated payment flow.',
    tags: ['React', 'Node.js', 'Tailwind CSS', 'Stripe'],
    gradient: 'from-[#a855f7] to-[#581c87]',
    accentColor: 'rgba(168,85,247,0.2)',
    link: '#',
    year: '2025',
  },
  {
    id: 'web-4',
    title: 'Ibile Plus Logistics',
    category: 'Corporate Website',
    description: 'Modern corporate landing page with rich scroll animations and dynamic content management. Designed to showcase logistics services with interactive route tracking and fleet visualisation.',
    tags: ['React', 'GSAP', 'Framer Motion', 'CSS'],
    gradient: 'from-[#10b981] to-[#064e3b]',
    accentColor: 'rgba(16,185,129,0.2)',
    link: '#',
    year: '2025',
  },
  {
    id: 'web-5',
    title: '0965 Foods',
    category: 'Restaurant Website',
    description: 'A visually rich restaurant brand website with online menu browsing, location finder, and catering enquiry forms. Warm gold tones and food photography create an appetising digital experience.',
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    gradient: 'from-[#f59e0b] to-[#78350f]',
    accentColor: 'rgba(245,158,11,0.2)',
    link: '#',
    year: '2024',
  },
  {
    id: 'web-6',
    title: 'Smoky Sips Dashboard',
    category: 'Web Application',
    description: 'Internal admin dashboard and customer-facing app for managing inventory, orders, and user analytics. Built with a minimalist, data-focused UI for maximum operational efficiency.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
    gradient: 'from-[#06b6d4] to-[#164e63]',
    accentColor: 'rgba(6,182,212,0.2)',
    link: '#',
    year: '2024',
  },
];

export default function WebsitePortfolio() {
  const cursorDotRef  = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  /* ── Custom cursor ── */
  useEffect(() => {
    let curX = 0, curY = 0;
    let dotX = 0, dotY = 0;

    const moveCursor = (e: MouseEvent) => {
      curX = e.clientX;
      curY = e.clientY;
      gsap.to(cursorDotRef.current, { x: curX, y: curY, duration: 0.08, ease: 'none' });
    };

    const animateRing = () => {
      dotX += (curX - dotX) * 0.12;
      dotY += (curY - dotY) * 0.12;
      gsap.set(cursorRingRef.current, { x: dotX, y: dotY });
      requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', moveCursor);
    animateRing();

    const onHoverIn  = () => gsap.to(cursorRingRef.current, { scale: 2.2, duration: 0.3, ease: 'power2.out' });
    const onHoverOut = () => gsap.to(cursorRingRef.current, { scale: 1,   duration: 0.3, ease: 'power2.out' });

    setTimeout(() => {
      document.querySelectorAll('button, a, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onHoverIn);
        el.addEventListener('mouseleave', onHoverOut);
      });
    }, 500);

    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  /* ── Scroll-triggered animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text entrance
      gsap.fromTo('.web-hero-line',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.3 }
      );

      gsap.fromTo('.web-hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.9 }
      );

      // Each project card
      gsap.utils.toArray<HTMLElement>('.web-project').forEach((card) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );
      });

      // Counter animation
      gsap.utils.toArray<HTMLElement>('.stat-number').forEach((el) => {
        const target = parseInt(el.dataset.value || '0', 10);
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ── Scroll-to-top visibility ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    gsap.to(window, { scrollTo: 0, duration: 1.8, ease: 'power4.inOut' });
  };

  return (
    <div ref={containerRef} className="relative bg-[#001529] text-white selection:bg-orange selection:text-white">

      {/* ── Custom Cursor ── */}
      <div ref={cursorDotRef}
        className="fixed w-2 h-2 bg-brand-orange rounded-full pointer-events-none z-[500] -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'difference' }} />
      <div ref={cursorRingRef}
        className="fixed w-7 h-7 rounded-full border border-brand-orange/50 pointer-events-none z-[499] -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'difference' }} />

      {/* ── Atmospheric glows ── */}
      <div className="fixed top-[-15%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[180px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(0,80,160,0.18) 0%, transparent 70%)' }} />
      <div className="fixed bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(255,140,0,0.10) 0%, transparent 70%)' }} />

      <Navbar />

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center pt-32 pb-20 px-6 z-10 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #001529 0%, #001020 50%, #001529 100%)' }}>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

        {/* Floating code brackets decoration */}
        <div className="absolute top-1/4 left-[8%] text-white/[0.04] text-[180px] font-black select-none pointer-events-none hidden lg:block">
          {'</>'}
        </div>
        <div className="absolute bottom-1/4 right-[8%] text-white/[0.04] text-[140px] font-black select-none pointer-events-none hidden lg:block rotate-12">
          {'{ }'}
        </div>

        <div className="text-center max-w-5xl mx-auto z-10">
          {/* Badge */}
          <div className="web-hero-line inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-10">
            <Code2 size={16} className="text-orange" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/80">Web Development Portfolio</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-[90px] lg:text-[120px] font-black leading-[0.92] tracking-tight uppercase mb-10 overflow-hidden">
            <span className="web-hero-line block text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">We Build</span>
            <span className="web-hero-line block text-gradient">The Web.</span>
          </h1>

          {/* Subtitle */}
          <p className="web-hero-sub text-base md:text-xl text-white/50 font-medium max-w-2xl mx-auto leading-relaxed">
            High-performance websites and digital platforms engineered for conversion, speed, and unforgettable user experiences.
          </p>

          {/* Stats strip */}
          <div className="web-hero-sub flex justify-center gap-12 md:gap-20 mt-16 pt-8 border-t border-white/10">
            {[
              { value: 12, label: 'Projects Shipped', suffix: '+' },
              { value: 100, label: 'Performance Score', suffix: '%' },
              { value: 98, label: 'Client Satisfaction', suffix: '%' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-brand-orange">
                  <span className="stat-number" data-value={stat.value}>0</span>{stat.suffix}
                </div>
                <div className="text-[10px] md:text-xs text-white/40 font-bold tracking-wider uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[9px] uppercase tracking-[0.35em] text-white/30 font-bold">Scroll to explore</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent animate-bounce" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROJECT SHOWCASE
      ══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32">

        {/* Section header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-28">
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center gap-2 pt-1 shrink-0">
              <span className="text-[9px] font-black text-orange uppercase tracking-[0.5em]">01</span>
              <div className="w-px h-14 bg-gradient-to-b from-white/40 to-transparent" />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.45em] text-white/50 mb-5 block">Selected Projects</span>
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                <span className="text-white">Featured</span>{' '}
                <span className="text-gradient">Work</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-32 md:gap-44">
          {WEB_PROJECTS.map((project, index) => (
            <div key={project.id} className="web-project max-w-7xl mx-auto px-6 md:px-12 w-full">
              <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center`}>

                {/* ── Mockup / Visual ── */}
                <div className="w-full lg:w-3/5 group relative" style={{ perspective: '1200px' }}>
                  {/* Glow behind card */}
                  <div className={`absolute -inset-6 bg-gradient-to-br ${project.gradient} rounded-[40px] opacity-15 blur-3xl group-hover:opacity-30 transition-opacity duration-700`} />

                  {/* Browser frame */}
                  <div className="relative rounded-xl md:rounded-2xl border border-white/10 bg-[#0a1628]/90 backdrop-blur-xl shadow-2xl overflow-hidden
                    transform transition-all duration-700 group-hover:scale-[1.015] group-hover:-translate-y-1"
                    style={{ transformStyle: 'preserve-3d' }}>

                    {/* Top bar */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.03]">
                      <div className="flex gap-[6px]">
                        <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
                        <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
                        <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
                      </div>
                      <div className="mx-auto bg-black/30 rounded-md px-6 py-1 text-[10px] text-white/30 font-mono tracking-wider max-w-[200px] md:max-w-[300px] text-center truncate">
                        {project.title.toLowerCase().replace(/\s+/g, '-')}.easycare.ng
                      </div>
                      <Globe size={12} className="text-white/20" />
                    </div>

                    {/* Content area — abstract layout mockup */}
                    <div className={`aspect-[16/10] w-full bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                      {/* Simulated page layout */}
                      <div className="absolute inset-0 p-6 md:p-10 flex flex-col gap-4">
                        {/* Nav bar mock */}
                        <div className="flex items-center justify-between">
                          <div className="w-20 h-3 bg-white/20 rounded-full" />
                          <div className="flex gap-3">
                            <div className="w-12 h-2 bg-white/15 rounded-full" />
                            <div className="w-12 h-2 bg-white/15 rounded-full" />
                            <div className="w-12 h-2 bg-white/15 rounded-full" />
                          </div>
                        </div>

                        {/* Hero mock */}
                        <div className="flex-1 flex items-center gap-6">
                          <div className="flex-1 space-y-3">
                            <div className="w-3/4 h-5 bg-white/25 rounded" />
                            <div className="w-1/2 h-5 bg-white/20 rounded" />
                            <div className="w-full h-2 bg-white/10 rounded mt-4" />
                            <div className="w-4/5 h-2 bg-white/10 rounded" />
                            <div className="w-24 h-8 bg-white/30 rounded-full mt-4" />
                          </div>
                          <div className="hidden md:block w-2/5 aspect-square bg-white/10 rounded-2xl" />
                        </div>

                        {/* Card row mock */}
                        <div className="flex gap-3">
                          <div className="flex-1 h-16 bg-white/8 rounded-lg border border-white/5" />
                          <div className="flex-1 h-16 bg-white/8 rounded-lg border border-white/5" />
                          <div className="flex-1 h-16 bg-white/8 rounded-lg border border-white/5 hidden md:block" />
                        </div>
                      </div>

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Floating device icons */}
                  <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#0a1628] border border-white/10 flex items-center justify-center shadow-xl
                    opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-2">
                    <Smartphone size={18} className="text-white/60" />
                  </div>
                  <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#0a1628] border border-white/10 flex items-center justify-center shadow-xl
                    opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 -translate-y-2">
                    <Monitor size={18} className="text-white/60" />
                  </div>
                </div>

                {/* ── Project Info ── */}
                <div className="w-full lg:w-2/5 flex flex-col justify-center">
                  {/* Meta line */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-orange font-black tracking-[0.15em] text-xs uppercase">{project.category}</span>
                    <span className="w-10 h-[1px] bg-white/15" />
                    <span className="text-white/30 font-mono text-sm">{project.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-5xl font-black text-white mb-5 leading-[1.05] tracking-tight">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base md:text-lg text-white/50 mb-8 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-4 py-[6px] rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-semibold text-white/70 tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  {project.link !== '#' ? (
                    <a href={project.link} data-hover
                      className="inline-flex items-center gap-3 text-white font-black uppercase tracking-[0.15em] text-sm w-fit group/link cursor-none">
                      <span className="relative">
                        View Live Site
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-orange scale-x-100 origin-left" />
                      </span>
                      <ExternalLink size={14} className="transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform text-orange" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-3 text-white/30 font-black uppercase tracking-[0.15em] text-sm w-fit">
                      <span className="relative">
                        Coming Soon
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10" />
                      </span>
                    </span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TECH STACK BAR
      ══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-20 border-y border-white/5"
        style={{ background: 'linear-gradient(180deg, rgba(0,21,41,0) 0%, rgba(0,30,56,0.5) 50%, rgba(0,21,41,0) 100%)' }}>
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-10">Technologies We Work With</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-white/25 text-sm font-bold tracking-wider uppercase">
            {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Node.js', 'PostgreSQL', 'Vercel', 'Figma', 'Framer Motion'].map(tech => (
              <span key={tech} className="hover:text-orange transition-colors duration-300 cursor-none">{tech}</span>
            ))}
          </div>
        </div>
      </section>

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
    </div>
  );
}

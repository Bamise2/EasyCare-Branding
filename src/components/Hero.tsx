import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { cloudImg } from '../utils/cloudinary';

gsap.registerPlugin(ScrollToPlugin);

const HERO_IMAGES = [
  { src: 'https://res.cloudinary.com/dxzw0j1tf/image/upload/v1776853162/hero1_dlfmkm.jpg', alt: 'Brand Strategy', label: 'Brand Strategy', caption: 'Creative Excellence', float: 'float-1', pos: 'top-0 right-0', size: 'w-[55%] h-[58%]', z: 'z-30' },
  { src: 'https://res.cloudinary.com/dxzw0j1tf/image/upload/v1776853165/hero2_vliuwd.jpg', alt: 'Design Process', label: 'Design Process', caption: 'Strategic Thinking', float: 'float-2', pos: 'bottom-[10%] left-0', size: 'w-[50%] h-[52%]', z: 'z-20' },
  { src: 'https://res.cloudinary.com/dxzw0j1tf/image/upload/v1776853172/hero3_u58lt9.jpg', alt: 'Marketing', label: 'Marketing Results', caption: 'Client Success', float: 'float-3', pos: 'bottom-[5%] right-[15%]', size: 'w-[44%] h-[48%]', z: 'z-10' },
];

export const Hero: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const imgsRef = useRef<HTMLDivElement>(null);

  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const TYPEWRITER_TEXTS = ["Creative Branding.", "Effective Strategy.", "Engaging Socials."];

  useEffect(() => {
    // Start typing after entrance animation
    const startTimer = setTimeout(() => setHasStarted(true), 1500);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    // 1. Entrance animation
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(textRef.current!.querySelectorAll('.hero-anim'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.18, duration: 0.9, ease: 'power3.out' }
    );
    tl.fromTo(imgsRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.5'
    );
  }, []);

  // 2. Typewriter animation
  useEffect(() => {
    if (!hasStarted) return;

    const currentFullText = TYPEWRITER_TEXTS[textIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentFullText.substring(0, currentText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % TYPEWRITER_TEXTS.length);
      }
    } else {
      if (currentText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setCurrentText(currentFullText.substring(0, currentText.length + 1));
        }, 100);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex, hasStarted]);

  const scrollTo = (id: string) =>
    gsap.to(window, { scrollTo: id, duration: 1.2, ease: 'power4.inOut', offsetY: 80 });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #fff4e6 50%, #e6f0f9 100%)' }}>

      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #001529 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Background video */}
      <video autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none">
        <source src="https://res.cloudinary.com/dxzw0j1tf/video/upload/v1776974007/background_uyvu39.webm" type="video/webm" />
      </video>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full grid md:grid-cols-2 gap-8 items-center py-20">

        {/* Text Area */}
        <div ref={textRef} className="flex flex-col gap-6">
          <span className="hero-anim inline-flex items-center gap-2 text-orange font-semibold text-sm uppercase tracking-widest">
            <span className="w-8 h-0.5 bg-orange inline-block rounded-full" />
            Creative Agency
          </span>

          {/* Typewriter Container - Fixed height to prevent layout shift */}
          <h1 className="hero-anim flex flex-wrap items-center text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy leading-[1.2] md:leading-[1.1] tracking-normal md:tracking-tight min-h-[1.3em] md:min-h-[1.4em]">
            <span className={textIndex === 1 ? "text-gradient-orange" : ""}>
              {currentText}
            </span>
            <span className="inline-block w-[3px] h-[0.9em] bg-orange ml-2 animate-pulse opacity-80" />
          </h1>

          <p className="hero-anim text-text-medium text-base md:text-lg leading-relaxed max-w-lg">
            We help you create, grow, and show off a brand that sticks. Our team crafts tailor-made
            strategies that elevate your brand's presence and ensure your message resonates
            with the right audience.
          </p>

          <div className="hero-anim flex flex-wrap gap-4">
            <button onClick={() => scrollTo('#services')}
              className="bg-orange hover:bg-orange-dark text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all duration-300 shadow-lg shadow-orange/25 cursor-pointer">
              Our Services
            </button>
            <button onClick={() => scrollTo('#contact')}
              className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all duration-300 cursor-pointer">
              Get in Touch
            </button>
          </div>

          <div className="hero-anim flex gap-8 pt-4 border-t border-navy/10">
            {[['120+', 'Projects Done'], ['8+', 'Years Experience'], ['98%', 'Client Satisfaction']].map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl font-extrabold text-orange">{n}</div>
                <div className="text-xs text-text-medium font-medium">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Images */}
        <div ref={imgsRef} className="relative h-[480px] md:h-[520px] hidden md:block">
          {HERO_IMAGES.map(img => (
            <div key={img.alt}
              className={`absolute ${img.pos} ${img.size} ${img.z} ${img.float}
                group rounded-xl overflow-hidden shadow-2xl bg-white p-3 pb-10
                hover:-translate-y-4 hover:scale-105 hover:z-50 transition-all duration-500 cursor-pointer`}
            >
              <img src={cloudImg.hero(img.src)} alt={img.alt}
                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute bottom-3 left-0 w-full text-center text-xs font-medium text-text-medium italic">
                {img.label}
              </div>
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange rounded-lg opacity-80" />
              <div className="absolute inset-0 bg-navy/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                <span className="text-white font-semibold text-sm bg-navy/80 px-3 py-1 rounded-full">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] text-text-medium uppercase tracking-widest">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-orange to-transparent rounded-full" />
      </div>
    </section>
  );
};
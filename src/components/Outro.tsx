import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Outro: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(".outro-text",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%"
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #001e38 0%, #001025 50%, #001e38 100%)' }}>
      {/* White radial glow at center */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.04) 0%, transparent 55%), radial-gradient(ellipse at 50% 40%, rgba(255,140,0,0.08) 0%, transparent 65%)' }} />
      {/* Top white line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="outro-text space-y-8 md:space-y-12">
        <h2 className="text-3xl sm:text-5xl md:text-9xl font-black tracking-tight md:tracking-tighter uppercase leading-[1.1] md:leading-[0.8] mb-2 md:mb-1 italic">
          <span className="text-white drop-shadow-[0_0_60px_rgba(255,255,255,0.12)]">We don't just design.</span> <br />
          <span className="text-gradient">We build brands.</span>
        </h2>
        
        <div className="pt-12 md:pt-20 flex flex-col items-center gap-4 md:gap-6 w-full">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <h1 className="text-lg md:text-2xl tracking-[0.3em] md:tracking-[0.6em] uppercase font-black text-white/70">
            EasyCare <span className="text-brand-orange">Designs</span>
          </h1>
          <a href="/#contact" className="mt-8 px-8 md:px-12 py-4 md:py-5 rounded-full font-black uppercase text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.4em] cursor-none
            bg-white text-navy shadow-[0_0_40px_rgba(255,255,255,0.2)]
            hover:bg-orange hover:shadow-[0_0_40px_rgba(255,140,0,0.5)] hover:text-white
            transition-all duration-500 inline-block">
            Inquire Project
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-6 md:bottom-10 text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.25em] text-white/35 uppercase font-bold text-center w-full px-4">
        © 2026 EasyCare Designs — All Rights Reserved
      </div>
    </section>
  );
};

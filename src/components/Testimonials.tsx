import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    quote: '"EasyCare transformed our brand from forgettable to unforgettable. Our customer engagement has increased by 200% since the rebrand."',
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    initials: 'SJ',
  },
  {
    quote: '"The team at EasyCare truly understands how to create branding that resonates with the right audience. Our conversion rates have never been better."',
    name: 'Michael Chen',
    role: 'Marketing Director, GrowthBox',
    initials: 'MC',
  },
  {
    quote: '"Working with EasyCare was the best decision we made for our business. Their strategic approach has given us a competitive edge in our market."',
    name: 'Jessica Williams',
    role: 'Founder, Bloom Retail',
    initials: 'JW',
  },
];

export const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const cardRef   = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const animateSlide = (_dir: 'in' | 'out', fromDir: number) => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current,
      { x: fromDir * 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
  };

  const go = (delta: number) => {
    const fromDir = delta > 0 ? 1 : -1;
    setCurrent(c => {
      const next = (c + delta + TESTIMONIALS.length) % TESTIMONIALS.length;
      return next;
    });
    animateSlide('in', fromDir);
  };

  useEffect(() => {
    animateSlide('in', 1);
  }, [current]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-10">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy section-underline inline-block">Client Testimonials</h2>
          <p className="text-text-medium mt-8 max-w-xl mx-auto">What our clients say about working with us</p>
        </div>

        {/* Card */}
        <div ref={cardRef}
          className="bg-navy-pale rounded-3xl p-10 md:p-14 relative shadow-xl">
          <Quote size={56} className="text-orange/20 absolute top-8 left-8" />

          <p className="text-navy text-lg md:text-xl leading-relaxed italic relative z-10 mb-8">
            {t.quote}
          </p>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-orange flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0">
              {t.initials}
            </div>
            <div>
              <div className="font-bold text-navy">{t.name}</div>
              <div className="text-text-medium text-sm">{t.role}</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button onClick={() => go(-1)}
            className="w-12 h-12 rounded-full border-2 border-orange text-orange hover:bg-orange hover:text-white transition-colors duration-300 flex items-center justify-center cursor-pointer">
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => { setCurrent(i); animateSlide('in', 1); }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === current ? 'w-8 h-3 bg-orange' : 'w-3 h-3 bg-navy/20'
                }`} />
            ))}
          </div>

          <button onClick={() => go(1)}
            className="w-12 h-12 rounded-full border-2 border-orange text-orange hover:bg-orange hover:text-white transition-colors duration-300 flex items-center justify-center cursor-pointer">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

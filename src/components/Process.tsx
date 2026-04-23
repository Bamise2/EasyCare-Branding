import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { num: '01', title: 'Discovery',       desc: 'We deep-dive into your brand, audience, competitors, and goals to understand what makes you unique.' },
  { num: '02', title: 'Strategy',        desc: 'We create a comprehensive game plan — positioning, messaging, and visual direction tailored to you.' },
  { num: '03', title: 'Creation',        desc: 'Our creative team breathes life into your brand — logos, visuals, copy, and digital presence.' },
  { num: '04', title: 'Implementation',  desc: 'We roll out your brand across every touchpoint and ensure a consistent, powerful presence.' },
];

export const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.step-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.steps-grid', start: 'top 80%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: '#001529' }}>

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5"
           style={{ background: 'radial-gradient(circle, #ff8c00, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5"
           style={{ background: 'radial-gradient(circle, #ff8c00, transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white section-underline inline-block">Our Process</h2>
          <p className="text-white/60 mt-8 max-w-xl mx-auto">A proven 4-step methodology that consistently delivers results</p>
        </div>

        <div className="steps-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <div key={i}
              className="step-card bg-white rounded-2xl p-8 text-center group
                hover:-translate-y-3 hover:border-orange hover:shadow-xl
                transition-all duration-300 border-2 border-transparent cursor-default">
              <div className="text-5xl font-extrabold text-orange/40 group-hover:text-orange/70 mb-4 transition-colors duration-300">
                {s.num}
              </div>
              <h3 className="text-xl font-extrabold text-navy mb-3">{s.title}</h3>
              <p className="text-text-medium text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

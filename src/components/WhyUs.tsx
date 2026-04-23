import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ROWS = [
  { feature: 'Focus',             others: 'Generic, broad-stroke offerings',          we: 'Niche expertise in branding & high-impact web design' },
  { feature: 'Client Approach',   others: 'Basic service delivery',                   we: 'Deep partnerships rooted in clarity and shared vision' },
  { feature: 'Design Philosophy', others: 'Pre-made templates, reused assets',        we: 'Crafted-from-scratch visuals aligned with your brand' },
  { feature: 'Technical Process', others: 'Rigid, limited adaptability',              we: 'Agile, scalable, and optimised for performance' },
  { feature: 'Managing Projects', others: 'Unclear timelines, reactive handling',     we: 'Transparent workflows with precision and structure' },
];

export const WhyUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.why-row',
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.why-table', start: 'top 80%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why_us" ref={sectionRef} className="py-24 overflow-hidden" style={{ background: '#e6f0f9' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Header — split layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-orange font-semibold text-sm uppercase tracking-widest block mb-1">Our Edge</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight">Why Choose Us</h2>
          </div>
          <p className="text-text-medium max-w-md">How we stand out from competitors with tailored solutions and results that drive real business growth.</p>
        </div>

        {/* Comparison table */}
        <div className="why-table rounded-2xl overflow-hidden shadow-xl border border-gray-200">

          {/* Table header */}
          <div className="grid grid-cols-3 bg-navy text-white text-sm font-bold">
            <div className="p-4 md:p-5">Feature</div>
            <div className="p-4 md:p-5 flex items-center gap-2">
              The Others
              <span className="w-5 h-5 rounded-full bg-red-400/20 flex items-center justify-center flex-shrink-0">
                <X size={12} className="text-red-400" />
              </span>
            </div>
            <div className="p-4 md:p-5 flex items-center gap-2 text-orange">
              Our Approach
              <span className="w-5 h-5 rounded-full bg-orange/20 flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-orange" />
              </span>
            </div>
          </div>

          {ROWS.map((row, i) => (
            <div key={i}
              className={`why-row grid grid-cols-3 text-sm border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-navy-pale/50'}`}>
              <div className="p-4 md:p-5 font-bold text-navy">{row.feature}</div>
              <div className="p-4 md:p-5 text-text-medium">{row.others}</div>
              <div className="p-4 md:p-5 font-semibold text-navy">{row.we}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

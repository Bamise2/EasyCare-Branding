import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Brain, Handshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VALUES = [
  { icon: <Lightbulb size={32} className="text-white" />, title: 'Creative Excellence', desc: 'We push boundaries and challenge conventions to create brands that are truly distinctive and memorable.' },
  { icon: <Brain size={32} className="text-white" />, title: 'Strategic Thinking', desc: 'Every design decision is backed by strategy, ensuring your brand has purpose and clear direction.' },
  { icon: <Handshake size={32} className="text-white" />, title: 'Client Partnership', desc: 'We view our clients as partners, building long-term relationships based on trust and measurable results.' },
];

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-left',
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-left', start: 'top 80%', once: true }
        }
      );
      gsap.fromTo('.about-right',
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-right', start: 'top 80%', once: true }
        }
      );
      gsap.fromTo('.value-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.values-grid', start: 'top 80%', once: true }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 overflow-hidden" style={{ background: '#e6f0f9' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy section-underline inline-block pb-2">About Us</h2>
          <p className="text-text-medium mt-8 max-w-xl mx-auto">We create brands that matter and drive real business results</p>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">

          {/* Image */}
          <div className="about-left relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://res.cloudinary.com/dxzw0j1tf/image/upload/v1776853162/about_bstilz.jpg" alt="EasyCare Team"
                className="w-full h-80 md:h-96 object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            {/* Orange accent block */}
            <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-orange rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-navy rounded-xl -z-10" />
            {/* Experience badge */}
            <div className="absolute top-6 -right-4 bg-navy text-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-xl">
              <span className="text-2xl font-extrabold text-orange leading-none">8+</span>
              <span className="text-[10px] text-center leading-tight mt-0.5">Years<br />Experience</span>
            </div>
          </div>

          {/* Text */}
          <div className="about-right bg-white rounded-2xl p-8 shadow-lg">
            <span className="text-orange font-semibold text-sm uppercase tracking-widest">Our Story</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-navy mt-2 mb-6 pb-4 border-b-2 border-orange w-fit">
              Who We Are
            </h3>
            <div className="space-y-4 text-text-medium leading-relaxed">
              <p>Founded with a passion for transformative branding, EasyCare has evolved into a full-service agency dedicated to helping businesses stand out in today's competitive landscape.</p>
              <p>Our team combines strategic thinking with creative excellence to deliver brands that not only look stunning but also drive measurable results. We believe exceptional branding should be accessible to businesses of all sizes.</p>
              <p>What sets us apart is our commitment to understanding your unique challenges and opportunities. We craft strategic brand experiences that connect with your audience and accelerate your growth.</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-navy text-center mb-10">Our Core Values</h3>
          <div className="values-grid grid md:grid-cols-3 gap-6">
            {VALUES.map(v => (
              <div key={v.title}
                className="value-card bg-navy-light rounded-2xl p-8 text-center hover:-translate-y-2 transition-transform duration-300 shadow-lg relative overflow-hidden">
                {/* Orange glow blob */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-orange/20" />
                <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center mx-auto mb-5 relative z-10">
                  {v.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3 relative z-10">{v.title}</h4>
                <p className="text-white/75 text-sm leading-relaxed relative z-10">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

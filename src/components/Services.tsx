import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Paintbrush, Megaphone, Laptop, BarChart3, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: <Paintbrush size={30} className="text-white" />,
    title: 'Brand Strategy & Consulting',
    desc: 'We help you define your brand\'s identity, voice, and market position to ensure it stands out, connects with the right audience, and stays ahead of competitors.',
  },
  {
    icon: <Megaphone size={30} className="text-white" />,
    title: 'Visual Identity & Design',
    desc: 'We craft expert logos, colors, fonts, and packaging to ensure a consistent, professional, and memorable look across all platforms.',
  },
  {
    icon: <Laptop size={30} className="text-white" />,
    title: 'Digital & Online Branding',
    desc: 'Build a strong online presence through professional websites, user-friendly design, social media aesthetics, and strategic content to boost visibility.',
  },
  {
    icon: <BarChart3 size={30} className="text-white" />,
    title: 'Advertising Collaterals',
    desc: 'Brochures, ads, billboards, and branded merchandise that promote your brand and leave a lasting impression on your audience.',
  },
  {
    icon: <MessageSquare size={30} className="text-white" />,
    title: 'Content & Brand Communication',
    desc: 'Copywriting, videos, social media, and photography — to tell your brand\'s story and keep your audience engaged and inspired.',
  },
];

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-card-anim',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-grid', start: 'top 80%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-navy section-underline inline-block">Our Services</h2>
          <p className="text-text-medium mt-8 max-w-xl mx-auto">Comprehensive branding solutions to elevate your business</p>
        </div>

        <div className="services-grid flex flex-wrap justify-center gap-6">
          {SERVICES.map((s, i) => (
            <div key={i}
              className="service-card-anim flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.3%-16px)] min-w-[260px]
                bg-navy-pale rounded-2xl p-8 text-center border border-gray-100
                hover:-translate-y-3 hover:border-orange hover:shadow-xl transition-all duration-300 cursor-default group">
              <div className="w-16 h-16 bg-orange group-hover:bg-navy rounded-full flex items-center justify-center mx-auto mb-5 transition-colors duration-300">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-navy mb-3">{s.title}</h3>
              <p className="text-text-medium text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

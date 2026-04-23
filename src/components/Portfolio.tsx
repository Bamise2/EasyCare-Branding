import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Palette, Code2, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// The designs portfolio URL — update to your deployed URL when live
const DESIGNS_URL = '/design-portfolio';
const WEB_URL = '/website-portfolio';

const ITEMS = [
  {
    id: 'designs',
    icon: <Palette size={40} className="text-white" />,
    title: 'Design Portfolio',
    subtitle: 'Graphic Design Work',
    desc: 'Browse our full collection of graphic design works. Logos, book covers, church flyers, and social media campaigns, all crafted to make brands memorable.',
    tags: ['Logos', 'Book Covers', 'Church Flyers', 'Social Media'],
    cta: 'View Designs',
    href: DESIGNS_URL,
    external: false,
    bg: 'from-orange to-orange-dark',
    badge: 'Live',
    badgeColor: 'bg-green-400 text-green-900',
  },
  {
    id: 'websites',
    icon: <Code2 size={40} className="text-white" />,
    title: 'Web Development',
    subtitle: 'Website & Web App Projects',
    desc: 'Modern, responsive websites and web applications designed and developed for businesses of all sizes from landing pages to full e-commerce platforms.',
    tags: ['Landing Pages', 'E-commerce', 'Web Apps', 'UI/UX'],
    cta: 'View Websites',
    href: WEB_URL,
    external: false,
    bg: 'from-navy to-navy-accent',
    badge: 'Live',
    badgeColor: 'bg-green-400 text-green-900',
  },
];

export const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-card',
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.2, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.portfolio-cards', start: 'top 80%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 overflow-hidden" style={{ background: '#e6f0f9' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy section-underline inline-block pb-2">Portfolio</h2>
          <p className="text-text-medium mt-8 max-w-xl mx-auto">Explore our creative work across design and web development</p>
        </div>

        <div className="portfolio-cards grid md:grid-cols-2 gap-8">
          {ITEMS.map(item => (
            <div key={item.id}
              className={`portfolio-card group relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer
                bg-gradient-to-br ${item.bg} p-8 md:p-10 flex flex-col gap-6
                hover:scale-[1.02] hover:shadow-3xl transition-all duration-500`}
            >
              {/* Badge */}
              <span className={`self-start text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${item.badgeColor}`}>
                {item.badge}
              </span>

              {/* Icon */}
              <div className="w-20 h-20 rounded-2xl bg-white/15 flex items-center justify-center">
                {item.icon}
              </div>

              {/* Text */}
              <div>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">{item.subtitle}</p>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">{item.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{item.desc}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map(t => (
                  <span key={t} className="text-[11px] font-semibold bg-white/15 text-white px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>

              {/* CTA */}
              {item.href !== '#' ? (
                <a href={item.href} target={item.external ? "_blank" : "_self"} rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!item.external && item.href.startsWith('/')) {
                      e.preventDefault();
                      window.history.pushState(null, '', item.href);
                      window.dispatchEvent(new Event('popstate'));
                      window.scrollTo(0, 0);
                    }
                  }}
                  className="inline-flex items-center gap-2 self-start bg-white text-navy font-bold px-6 py-3 rounded-full text-sm
                    hover:bg-orange hover:text-white shadow-lg transition-all duration-300">
                  {item.cta} {item.external && <ExternalLink size={14} />}
                </a>
              ) : (
                <button disabled
                  className="inline-flex items-center gap-2 self-start bg-white/15 text-white/60 font-bold px-6 py-3 rounded-full text-sm cursor-not-allowed border border-white/20">
                  {item.cta}
                </button>
              )}

              {/* Decorative circles */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

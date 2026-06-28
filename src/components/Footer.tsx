import React from 'react';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const cols = [
    {
      heading: 'Services',
      links: ['Brand Strategy & Consulting','Visual Identity & Design','Digital & Online Branding','Advertising Collaterals','Content & Brand Communication'],
    },
    {
      heading: 'Company',
      links: ['About Us','Our Work','Portfolio','Blog','Careers'],
    },
    {
      heading: 'Legal',
      links: ['Privacy Policy','Terms of Service','Cookie Policy'],
    },
  ];

  return (
    <footer className="bg-navy-dark text-white/70 py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/brandLogo.png" alt="EasyCare" loading="lazy" className="w-9 h-9 object-contain" />
              <span className="text-white font-extrabold text-lg">EasyCare</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">Transforming businesses with branding that actually works.</p>
            <div className="flex gap-3">
              {[
                { href: 'https://x.com/Easycarebrand', Icon: Twitter },
                { href: 'https://www.instagram.com/easycarebranding', Icon: Instagram },
                { href: 'https://www.linkedin.com/company/easycare-branding-ltd/', Icon: Linkedin },
              ].map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center
                    hover:bg-orange hover:border-orange hover:text-white text-white/50 transition-all duration-300">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.heading}>
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm hover:text-orange transition-colors duration-200">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">&copy; {year} EasyCare Branding. All rights reserved.</p>
          <p className="text-xs">Built with ❤️ for brands that mean business.</p>
        </div>
      </div>
    </footer>
  );
};

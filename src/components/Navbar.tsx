import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollToPlugin);

const links = [
  { label: 'Home',       href: '#home'      },
  { label: 'About Us',   href: '#about'     },
  { label: 'Services',   href: '#services'  },
  { label: 'Portfolio',  href: '#portfolio' },
  { label: 'Our Process',href: '#process'   },
];

export const Navbar: React.FC = () => {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Animate navbar in on mount */
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    if (location.pathname !== '/') {
      navigate(`/${href}`);
      setTimeout(() => {
        gsap.to(window, { scrollTo: href, duration: 1.2, ease: 'power4.inOut', offsetY: 80 });
      }, 150);
    } else {
      gsap.to(window, { scrollTo: href, duration: 1.2, ease: 'power4.inOut', offsetY: 80 });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
      style={{ background: '#001529' }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 md:px-10">

        {/* Logo */}
        <a href="#home" onClick={() => scrollTo('#home')}
          className="flex items-center gap-3 cursor-pointer">
          <img src="https://res.cloudinary.com/dxzw0j1tf/image/upload/v1776853157/brandLogo_twwgtl.png" alt="EasyCare Logo"
               className="w-10 h-10 object-contain" />
          <span className="text-white font-bold text-lg leading-tight">
            EasyCare <span className="text-orange">Branding</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.label}>
              <button
                onClick={() => scrollTo(l.href)}
                className="nav-link-hover text-white/80 hover:text-orange-light font-medium text-sm transition-colors duration-200 cursor-pointer"
              >{l.label}</button>
            </li>
          ))}
          <li>
            <button
              onClick={() => scrollTo('#contact')}
              className="bg-orange hover:bg-orange-dark text-white font-semibold px-5 py-2 rounded-full text-sm transition-colors duration-200 cursor-pointer"
            >Start a Project</button>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-navy border-t border-white/10">
          {links.map(l => (
            <button key={l.label} onClick={() => scrollTo(l.href)}
              className="text-white/80 hover:text-orange text-left font-medium py-1 cursor-pointer">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo('#contact')}
            className="bg-orange text-white font-semibold px-5 py-2 rounded-full text-sm w-fit cursor-pointer">
            Start a Project
          </button>
        </div>
      )}
    </nav>
  );
};

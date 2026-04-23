import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Navbar }       from '../components/Navbar';
import { Hero }         from '../components/Hero';
import { About }        from '../components/About';
import { Services }     from '../components/Services';
import { Portfolio }    from '../components/Portfolio';
import { Process }      from '../components/Process';
import { Testimonials } from '../components/Testimonials';
import { WhyUs }        from '../components/WhyUs';
import { Contact }      from '../components/Contact';
import { Footer }       from '../components/Footer';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App: React.FC = () => {
  /* Active nav-link highlight on scroll */
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            document.querySelectorAll('nav button.nav-link-hover').forEach(btn => {
              (btn as HTMLButtonElement).style.color = '';
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative font-sans">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <Testimonials />
      <WhyUs />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-info-anim',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      );
      gsap.fromTo('.contact-form-anim',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    try {
      const res = await fetch('https://formspree.io/f/xvgrzadr', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) form.reset();
    } catch {
      setStatus('error');
    }
  };

  const inputCls = `w-full bg-white/10 border border-white/20 text-white placeholder-white/40
    rounded-xl px-4 py-3.5 focus:outline-none focus:border-orange transition-colors duration-200 text-sm`;

  return (
    <section id="contact" ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #001529 0%, #002a4e 100%)' }}>

      {/* Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
           style={{ background: 'radial-gradient(circle, #ff8c00, transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white section-underline inline-block">Get in Touch</h2>
          <p className="text-white/60 mt-8 max-w-xl mx-auto">Ready to transform your brand? Let's start a conversation</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Info */}
          <div className="contact-info-anim flex flex-col gap-8">
            {[
              { Icon: MapPin, title: 'Location', val: 'Ibadan, Nigeria' },
              { Icon: Mail,   title: 'Email',    val: 'easycarebranding@gmail.com', href: 'mailto:easycarebranding@gmail.com' },
              { Icon: Phone,  title: 'Phone',    val: '+234 7063682114',            href: 'tel:+2347063682114' },
            ].map(({ Icon, title, val, href }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-orange" />
                </div>
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-widest">{title}</div>
                  {href
                    ? <a href={href} className="text-white font-medium hover:text-orange transition-colors">{val}</a>
                    : <div className="text-white font-medium">{val}</div>}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="flex gap-4 pt-2">
              {[
                { href: 'https://x.com/Easycarebrand', Icon: Twitter },
                { href: 'https://www.instagram.com/easycarebranding', Icon: Instagram },
                { href: 'https://www.linkedin.com/company/easycare-branding-ltd/', Icon: Linkedin },
              ].map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60
                    hover:bg-orange hover:border-orange hover:text-white transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="contact-form-anim flex flex-col gap-4">
            <input type="hidden" name="_subject" value="New Message from EasyCare Branding site!" />
            <input className={inputCls} name="name"    placeholder="Your Name"    required />
            <input className={inputCls} name="email"   placeholder="Your Email"   type="email" required />
            <input className={inputCls} name="subject" placeholder="Subject" />
            <textarea className={`${inputCls} resize-none h-36`} name="message" placeholder="Your Message" required />

            <button type="submit" disabled={status === 'sending' || status === 'sent'}
              className="flex items-center justify-center gap-2 bg-orange hover:bg-orange-dark disabled:opacity-60
                text-white font-bold px-8 py-4 rounded-xl transition-colors duration-300 cursor-pointer">
              {status === 'sending' ? 'Sending…' : status === 'sent' ? '✅ Sent!' : <><Send size={16} /> Send Message</>}
            </button>
            {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

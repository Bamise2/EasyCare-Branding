import React from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export const CanvasIntro: React.FC = () => {
  const year = new Date().getFullYear();

  const handleScrollTo = (targetId: string) => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: `#${targetId}`, autoKill: false },
      ease: "power4.inOut"
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between"
      style={{ background: 'linear-gradient(160deg, #002040 0%, #001020 60%, #001830 100%)' }}>
      {/* Radial light burst */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.04) 0%, transparent 55%), radial-gradient(ellipse at 50% 40%, rgba(255,140,0,0.07) 0%, transparent 65%)' }} />
      {/* Top-left white accent stripe */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="relative">
          <h1 className="text-[50px] pt-20 md:text-[110px] font-black leading-[0.9] tracking-tight uppercase">
            <span className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] ">Design is not</span><br/>
            <span className="text-gradient">Decoration.</span>
          </h1>
          <p className="mt-8 text-xs md:text-sm tracking-[0.6em] uppercase text-white/55 font-bold">
            It is identity. <span className="text-brand-orange mx-6">/</span> EasyCare Portfolio {year }
          </p>
        </div>
      </div>

  

      {/* Bottom Hub / Navigation Cards */}
      <div className="w-full p-8 z-40"
        style={{ background: 'linear-gradient(0deg, rgba(0,16,32,0.98) 0%, rgba(0,16,32,0.55) 70%, transparent 100%)' }}>
        {/* Top white divider line */}
        <div className="w-full h-px mb-6 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="flex justify-between items-end mb-6">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-[2px] bg-brand-orange shadow-[0_0_10px_rgba(255,140,0,0.6)]"></div>
            <span className="text-[10px] uppercase tracking-widest text-white/65 font-black italic">Scroll to Explore Sections</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: '01', target: 'logos',  title: 'Brand Identity', img: 'https://res.cloudinary.com/dxzw0j1tf/image/upload/v1776853395/logo-5_zg7mah.jpg' },
            { id: '02', target: 'social', title: 'Social Media',   img: 'https://res.cloudinary.com/dxzw0j1tf/image/upload/v1776853187/social-6_d1zbii.jpg' },
            { id: '03', target: 'books',  title: 'Book Covers',    img: 'https://res.cloudinary.com/dxzw0j1tf/image/upload/v1776855050/book-19_mbiwdj.jpg' },
            { id: '04', target: 'flyers', title: 'Flyers',         img: 'https://res.cloudinary.com/dxzw0j1tf/image/upload/v1776854906/flyer-14_hioh3h.jpg' },
          ].map((hub) => (
            <button
              key={hub.id} 
              onClick={() => handleScrollTo(hub.target)}
              className="group relative h-24 md:h-44 overflow-hidden border border-white/15 hover:border-white/40 transition-all duration-500 text-left outline-none cursor-none rounded-sm"
              style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(0,24,48,0.8) 100%)' }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                style={{ backgroundImage: `url(${hub.img})` }}
              />
              {/* White gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              {/* White top-line accent */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 flex flex-col gap-0.5">
                <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em]">{hub.id}</span>
                <h3 className="text-[11px] md:text-sm font-black uppercase tracking-widest text-white leading-none whitespace-nowrap drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">{hub.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

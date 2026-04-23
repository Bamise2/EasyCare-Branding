# EasyCare Branding

The official website for **EasyCare Branding** — a creative branding agency specializing in graphic design, brand identity, and web development.

## 🌐 Live Site

> **[easycarebranding.com](#)** *(update with your live URL)*

## ✨ Features

- **Landing Page** — Animated hero with typewriter effect, services showcase, client testimonials, interactive process timeline, and contact form
- **Design Portfolio** — Full-screen gallery with 80+ works across logos, social media campaigns, book covers, and event flyers. Includes a custom lightbox viewer, GSAP scroll-triggered animations, and parallax columns
- **Website Portfolio** — Showcase of web development projects with browser-frame mockups, alternating layouts, and animated stats counter
- **Performance** — All images optimised via Cloudinary CDN with automatic WebP/AVIF format conversion and responsive sizing
- **Custom Cursor** — Dual-layer animated cursor with hover scaling on interactive elements
- **Fully Responsive** — Mobile-first design across all pages

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | GSAP (ScrollTrigger, ScrollToPlugin) |
| Routing | React Router v7 |
| Icons | Lucide React |
| Build | Vite 5 |
| Image CDN | Cloudinary (auto-format, auto-quality, responsive widths) |

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Global navigation with cross-route scrolling
│   ├── Hero.tsx            # Typewriter hero with floating polaroid images
│   ├── About.tsx           # Agency story section
│   ├── Services.tsx        # Services grid
│   ├── Portfolio.tsx        # Design + Web portfolio cards
│   ├── Process.tsx         # Creative process timeline
│   ├── Testimonials.tsx    # Client testimonials carousel
│   ├── WhyUs.tsx           # Key differentiators
│   ├── Contact.tsx         # Contact form
│   ├── Footer.tsx          # Site footer
│   ├── CanvasIntro.tsx     # Design portfolio hero intro
│   ├── GallerySection.tsx  # Animated gallery grid (logos/social/books/flyers)
│   ├── ImageCard.tsx       # Interactive image card with 3D tilt effects
│   ├── Lightbox.tsx        # Full-screen image viewer with navigation
│   └── Outro.tsx           # Portfolio closing CTA
├── pages/
│   ├── Home.tsx            # Main landing page
│   ├── DesignPortfolio.tsx # Design works showcase
│   └── WebsitePortfolio.tsx# Web development showcase
├── utils/
│   └── cloudinary.ts       # Cloudinary image optimisation utility
├── constants.ts            # Portfolio data (titles, Cloudinary URLs)
├── types.ts                # TypeScript interfaces
├── index.css               # Global styles + Tailwind theme
├── App.tsx                 # Route definitions
└── main.tsx                # Entry point
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 📸 Image Optimisation

All portfolio images are hosted on [Cloudinary](https://cloudinary.com) and optimised at runtime using `src/utils/cloudinary.ts`:

- **Gallery thumbnails** → `f_auto,q_auto,w_600` (~90% size reduction)
- **Lightbox view** → `f_auto,q_auto,w_1400`
- **Hero images** → `f_auto,q_auto,w_1200`

This converts images to WebP/AVIF automatically based on browser support.

---

**© 2026 EasyCare Branding** — All Rights Reserved

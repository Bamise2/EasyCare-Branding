import { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom"

const Home = lazy(() => import("./pages/Home"));
const DesignPortfolio = lazy(() => import("./pages/DesignPortfolio"));
const WebsitePortfolio = lazy(() => import("./pages/WebsitePortfolio"));

import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen bg-[#001529] flex items-center justify-center text-white font-semibold">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design-portfolio" element={<DesignPortfolio />} />
          <Route path="/website-portfolio" element={<WebsitePortfolio />} />
        </Routes>
      </Suspense>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

import Home from "./pages/Home"
import DesignPortfolio from "./pages/DesignPortfolio"
import WebsitePortfolio from "./pages/WebsitePortfolio"
import { Routes, Route } from "react-router-dom"

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/design-portfolio" element={<DesignPortfolio />} />
      <Route path="/website-portfolio" element={<WebsitePortfolio />} />
    </Routes>
  )
}

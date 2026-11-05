import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import CommandPalette from "./components/CommandPalette";
import ScrollIndicators from "./components/ScrollIndicators";
import ScrollToTop from "./components/ScrollToTop";
import "./styles/design.css";
import "./styles/pages.css";

// Each page is its own chunk, downloaded only when first visited.
const Home = lazy(() => import("./components/Home/Home"));
const About = lazy(() => import("./components/About/About"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Myresume = lazy(() => import("./components/Resume/resume"));
const Contact = lazy(() => import("./components/Contact"));
const Activity = lazy(() => import("./components/Activity/Activity"));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Myresume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <Router>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollIndicators />
      <Navbar />
      <ScrollToTop />
      <CommandPalette />
      <main id="main">
        <AnimatedRoutes />
      </main>
      <Footer />
    </Router>
  );
}

export default App;

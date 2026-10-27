import React, { useState, useEffect, lazy, Suspense } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import CursorGlow from "./components/CursorGlow";
import Particle from "./components/Particle";
import CommandPalette from "./components/CommandPalette";
import useInteractions from "./components/useInteractions";
import ScrollIndicators from "./components/ScrollIndicators";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "./animations.css";
import "./responsive.css";
import "./polish.css";
import "./theme.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
          <Route path="/about" element={<About/>} />
          <Route path="/resume" element={<Myresume/>}/>
          <Route path="/contact" element={<Contact/>} />
          <Route path="/activity" element={<Activity />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </Suspense>
    </div>
  );
}

function App() {
  const [load, upadateLoad] = useState(true);
  useInteractions();

  useEffect(() => {
    // Hide the splash right after the app mounts instead of waiting for every
    // image and font (window "load"), which kept slow connections on a blank screen.
    // A timer, not requestAnimationFrame: rAF never fires in background tabs.
    const timer = setTimeout(() => upadateLoad(false), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <Particle />
      <CursorGlow />
      <ScrollIndicators />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <CommandPalette />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

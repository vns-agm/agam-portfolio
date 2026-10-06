import React, { useState, useEffect, lazy, Suspense } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import CursorGlow from "./components/CursorGlow";
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
import "bootstrap/dist/css/bootstrap.min.css";

// Each page is its own chunk, downloaded only when first visited.
const Home = lazy(() => import("./components/Home/Home"));
const About = lazy(() => import("./components/About/About"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Myresume = lazy(() => import("./components/Resume/resume"));
const Contact = lazy(() => import("./components/Contact"));

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
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </Suspense>
    </div>
  );
}

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    // Hide the splash once the page has actually loaded (with a short minimum so it doesn't flash).
    let timer;
    const done = () => {
      timer = setTimeout(() => upadateLoad(false), 400);
    };

    if (document.readyState === "complete") {
      done();
    } else {
      window.addEventListener("load", done);
    }

    return () => {
      window.removeEventListener("load", done);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <CursorGlow />
      <ScrollIndicators />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

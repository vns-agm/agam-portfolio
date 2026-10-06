import React, { lazy, Suspense } from "react";

// The particle engine is heavy, so it loads in its own chunk after the page renders.
const Particles = lazy(() => import("react-tsparticles"));

function Particle() {
  return (
    <Suspense fallback={null}>
      <Particles
        id="tsparticles"
        params={{
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 500,
              },
            },
            line_linked: {
              enable: false,
              opacity: 0.03,
            },
            move: {
              direction: "right",
              speed: 0.05,
            },
            size: {
              value: 1,
            },
            opacity: {
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.05,
              },
            },
          },
          interactivity: {
            detect_on: "window",
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
              onclick: {
                enable: true,
                mode: "push",
              },
            },
            modes: {
              repulse: {
                distance: 90,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
            },
          },
          retina_detect: true,
        }}
      />
    </Suspense>
  );
}

export default Particle;

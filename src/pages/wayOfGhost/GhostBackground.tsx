import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./GhostBackground.module.scss";

gsap.registerPlugin(ScrollTrigger);

const GhostBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const spiritRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!bgRef.current || !spiritRef.current) return;

    // Fixed math for cinematic scroll:
    // Background is 300% height (3 viewports).
    // To go from top (0%) to bottom (100%) we need to move it up by 2 viewports.
    // Since width/height of bgRef is 300% of container, 
    // moving it by -66.6% of ITS OWN height will cover exactly 2 viewports.
    gsap.to(bgRef.current, {
      y: "-66.6%", 
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    const createCinematicParticles = (className: string, count: number, direction: 'up' | 'lateral' | 'float') => {
      for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        particle.className = className;
        spiritRef.current?.appendChild(particle);

        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;

        gsap.set(particle, {
          scale: 0.3 + Math.random() * 1.5,
          rotation: Math.random() * 360,
          opacity: 0,
        });

        const yMove = direction === 'up' ? -(80 + Math.random() * 120) : (Math.random() - 0.5) * 60;
        const xMoveBase = direction === 'lateral' ? (Math.random() > 0.5 ? 60 : -60) : (Math.random() - 0.5) * 40;
        
        // Complex wavy motion
        const amp = 40 + Math.random() * 60;
        const freq = 0.4 + Math.random() * 1;

        gsap.to(particle, {
          y: `${yMove}vh`,
          x: (idx) => Math.sin((idx + i) * freq) * amp + xMoveBase,
          rotation: "+=360",
          opacity: className === styles.shadowyTrail ? 0.3 : 0.8,
          autoAlpha: 1,
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        // Ambient shimmer
        gsap.to(particle, {
          opacity: 0.2,
          duration: 1.5 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    };

    createCinematicParticles(styles.spirit, 25, 'up');
    createCinematicParticles(styles.wisp, 15, 'lateral');
    createCinematicParticles(styles.shadowyTrail, 10, 'float');
    createCinematicParticles(styles.lanternGlow, 8, 'float');
    createCinematicParticles(styles.ghostlyPetal, 15, 'up');

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={styles.ghostBgContainer}>
      <div ref={bgRef} className={styles.mainBackground} />
      <div className={styles.overlay} />
      <div className={styles.mistOverlay} />
      <div ref={spiritRef} className={styles.spiritContainer} />
    </div>
  );
};

export default GhostBackground;

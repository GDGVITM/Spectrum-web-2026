import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./AgentBackground.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AgentBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!bgRef.current || !particleRef.current) return;

    // 3-stage cinematic scroll: AI Core -> Neural Lattice -> Sacred Network
    // Increasing scrub to 1.5 for smoother cinematic inertia
    gsap.to(bgRef.current, {
      y: "-66.6%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    const createDigitalParticles = () => {
      const codeStrings = ["01", "AI", "NODE", "{ }", ">>", "INTEL"];
      
      // 1. Code Fragments
      for (let i = 0; i < 20; i++) {
        const frag = document.createElement("div");
        frag.className = styles.codeFragment;
        frag.innerText = codeStrings[Math.floor(Math.random() * codeStrings.length)];
        particleRef.current?.appendChild(frag);

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        frag.style.left = `${x}%`;
        frag.style.top = `${y}%`;

        gsap.set(frag, { opacity: 0 });

        gsap.to(frag, {
          y: `${-(80 + Math.random() * 100)}vh`,
          x: (idx) => Math.sin((idx + i) * 0.5) * 40,
          opacity: 0.8,
          autoAlpha: 1,
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5 + Math.random() * 2,
          },
        });
      }

      // 2. Neural Nodes
      for (let i = 0; i < 15; i++) {
        const node = document.createElement("div");
        node.className = styles.neuralNode;
        particleRef.current?.appendChild(node);

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;

        gsap.set(node, { opacity: 0 });

        gsap.to(node, {
          y: `${-(60 + Math.random() * 80)}vh`,
          opacity: 1,
          scale: 1.5,
          autoAlpha: 1,
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 2 + Math.random(),
          },
        });
      }

      // 3. Energy Pulses
      for (let i = 0; i < 10; i++) {
        const pulse = document.createElement("div");
        pulse.className = styles.energyPulse;
        particleRef.current?.appendChild(pulse);

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        pulse.style.left = `${x}%`;
        pulse.style.top = `${y}%`;

        gsap.set(pulse, { opacity: 0 });

        gsap.to(pulse, {
          y: `${-(100 + Math.random() * 150)}vh`,
          opacity: 0.6,
          autoAlpha: 1,
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }
    };

    createDigitalParticles();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={styles.agentBgContainer}>
      <div ref={bgRef} className={styles.mainBackground} />
      <div className={styles.overlay} />
      <div className={styles.digitalMist} />
      <div ref={particleRef} className={styles.particleContainer} />
    </div>
  );
};

export default AgentBackground;

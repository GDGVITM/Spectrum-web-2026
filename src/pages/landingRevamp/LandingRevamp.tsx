import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./LandingRevamp.module.scss";

import Navbar from "../components/navbar/Navbar";
import MainHam from "../components/mainHam/mainHam";
import AboutUs from "../aboutus/AboutUs";
import { useMainHamStore } from "../../utils/store";
import useOverlayStore from "../../utils/store";

const FRAME_COUNT = 239; // Adjusted for 0-indexed padding or 1-240
const FRAME_START = 1;

// Path to images in public directory
const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/images/New_images_gdg/Landing_page/ezgif-frame-${paddedIndex}.jpg`;
};

export default function LandingRevamp({
  goToPage,
  onToggle,
  audioRef,
}: {
  goToPage: (path: string) => void;
  onToggle: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef<number>(FRAME_START);
  const requestRef = useRef<number | null>(null);
  
  const isMainHamOpen = useMainHamStore((state) => state.isMainHamOpen);
  const setIsMainHamOpen = useMainHamStore((state) => state.setMainHamOpen);
  
  const overlayIsActive = useOverlayStore((state) => state.isActive);
  const removeGif = useOverlayStore((state) => state.removeGif);
  const setRemoveGif = useOverlayStore((state) => state.setRemoveGif);
  
  const [styleTag, setstyleTag] = useState([
    audioRef.current?.paused ? styles.soundLine2 : styles.soundLine,
    styles.soundCross2,
  ]);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = imagesRef.current[index];

    if (ctx && img && img.complete) {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
      const x = (canvasWidth - img.width * scale) / 2;
      const y = (canvasHeight - img.height * scale) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  }, []);

  // Preload frames with concurrency control
  useEffect(() => {
    let isCancelled = false;

    const preloadFrames = async () => {
      // Load first frame immediately
      const firstImg = new Image();
      firstImg.src = getFramePath(FRAME_START);
      firstImg.onload = () => {
        if (!isCancelled) {
          imagesRef.current[FRAME_START] = firstImg;
          renderFrame(FRAME_START);
        }
      };

      // Gradually load the rest
      for (let i = FRAME_START; i <= FRAME_COUNT; i++) {
        if (isCancelled) break;
        if (i === FRAME_START) continue;
        
        const img = new Image();
        img.src = getFramePath(i);
        imagesRef.current[i] = img;
      }
    };
    
    preloadFrames();
    return () => { isCancelled = true; };
  }, [renderFrame]);

  const updateFrame = useCallback(() => {
    if (!scrollSectionRef.current) return;
    
    const scrollTop = window.scrollY;
    const sectionHeight = scrollSectionRef.current.offsetHeight;
    const maxScroll = sectionHeight - window.innerHeight;
    
    const scrollFraction = Math.min(1, Math.max(0, scrollTop / maxScroll));
    
    // Map scroll fraction to frames but cap it
    const frameIndex = Math.min(
      FRAME_COUNT,
      Math.max(FRAME_START, Math.round(scrollFraction * (FRAME_COUNT - FRAME_START)) + FRAME_START)
    );

    if (frameRef.current !== frameIndex) {
      frameRef.current = frameIndex;
      renderFrame(frameIndex);
    }
  }, [renderFrame]);

  useEffect(() => {
    const onScroll = () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(updateFrame);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [updateFrame]);

  // Handle Resize for Canvas Dimensions
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Set display size CSS values
        canvasRef.current.style.width = '100vw';
        canvasRef.current.style.height = '100vh';
        
        // Set actual resolution
        canvasRef.current.width = window.innerWidth * (window.devicePixelRatio || 1);
        canvasRef.current.height = window.innerHeight * (window.devicePixelRatio || 1);
        
        renderFrame(frameRef.current);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  useEffect(() => {
    setstyleTag([
      audioRef.current?.paused ? styles.soundLine2 : styles.soundLine,
      styles.soundCross2,
    ]);
  }, [audioRef.current?.paused]);

  useEffect(() => {
    if (overlayIsActive) {
      setTimeout(() => {
        setRemoveGif();
      }, 3000);
    }
  }, [overlayIsActive, setRemoveGif]);

  useEffect(() => {
    if (removeGif) {
      // Unlock native scroll allowing the canvas to be scrolled
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
    if (!removeGif) {
      // Force native scroll lock and reset scroll to top so the user starts exactly at frame 1
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      document.body.style.height = "100svh";
    }

    // Cleanup exactly when component unmounts for safety
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [removeGif]);

  return (
    <div 
      className={`${styles.wrapper} ${!removeGif ? styles.pointerNoneEvent : ""} ${overlayIsActive ? styles.mask : ""}`}
      style={{
        maskImage: removeGif ? "none" : undefined,
        WebkitMaskImage: removeGif ? "none" : undefined
      }}
    >
      <Navbar />
      
      {/* Scrollable container for pinning canvas */}
      <div className={styles.scrollSection} ref={scrollSectionRef}>
        <div className={styles.canvasContainer}>
          <canvas ref={canvasRef} className={styles.mainCanvas} />
        </div>
      </div>

      {/* Social and Menu Overlays */}
      <div className={styles.contentOverlay}>
        <div
          className={
            isMainHamOpen
              ? `${styles.mainHamContainer} ${styles.mainHamOpen}`
              : styles.mainHamContainer
          }
        >
          <div onClick={() => setIsMainHamOpen(false)}></div>
          <div className={styles.showMainHam}>
            <MainHam goToPage={goToPage} />
          </div>
        </div>

        <div
          className={styles.sounds}
          onClick={() => {
            onToggle();
          }}
        >
          <span className={styleTag[0]}></span>
          <span className={styleTag[0]}></span>
          <span className={styleTag[0]}></span>
          <span className={styleTag[0]}></span>
          <span className={styleTag[0]}></span>
        </div>
      </div>

      {/* Footer / About Us Section */}
      <div className={styles.bottomContainer}>
        <div className={styles.aboutUsContainer}>
          <AboutUs isBackBtn={false} />
        </div>
      </div>
    </div>
  );
}

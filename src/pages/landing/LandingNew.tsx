import { useRef, useEffect } from "react";
import DrawingPreloader from "../../pages/components/drawingPreloader/DrawingPreloader";
import FrameSplide from "./FrameSplide";
import styles from "./LandingNew.module.scss";
import useOverlayStore from "../../utils/store";

export default function LandingNew() {
    const overlayIsActive = useOverlayStore((state: any) => state.isActive);
    const audioRef = useRef<HTMLAudioElement>(null);

    const playMusic = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(error => {
                console.log("Audio play failed:", error);
            });
        }
    };

    // Initialize audio with proper volume control
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.2; // Set volume to 20%
            audioRef.current.loop = true;
        }
    }, []);

    return (
        <div className={styles.wrapperSquared}>
            <div
                className={`${styles.wrapper} ${overlayIsActive ? styles.mask : ""}`}
            >
                {/* Auto-scrolling Splide Gallery of Frames */}
                <div className={styles.canvasWrapper}>
                    <FrameSplide />
                </div>

                {/* Drawing Preloader with music playback onEnter */}
                <DrawingPreloader onEnter={playMusic} className={styles.drawingPreloader} />

                {/* Background Music Audio Element */}
                <audio
                    ref={audioRef}
                    src="/sounds/bg-music.mp3"
                    loop
                    preload="auto"
                />
            </div>
        </div>
    );
}
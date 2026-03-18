// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/dist/css/splide.min.css';
import styles from './FrameSplide.module.scss';

const FRAME_COUNT = 240;

const framePaths = Array.from({ length: FRAME_COUNT }, (_, i) => {
    const index = i + 1;
    return `/images/New_images_gdg/Landing_page/ezgif-frame-${index.toString().padStart(3, "0")}.jpg`;
});

export default function FrameSplide() {
    return (
        <div className={styles.splideContainer}>
            <Splide
                options={{
                    type: 'fade',
                    rewind: true,
                    autoplay: true,
                    interval: 1, // Speed of movie sequence in milliseconds
                    speed: 800,    // Duration of the fade transition
                    arrows: false,
                    pagination: false,
                    height: '100vh',
                    width: '100vw',
                    pauseOnHover: false,
                    pauseOnFocus: false,
                }}
                className={styles.splide}
            >
                {framePaths.map((path, idx) => (
                    <SplideSlide key={idx} className={styles.slide}>
                        <img
                            src={path}
                            alt={`Frame ${idx + 1}`}
                            className={styles.image}
                            loading="lazy"
                            onError={(e) => {
                                console.error(`Failed to load frame ${idx + 1}: ${path}`);
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
}

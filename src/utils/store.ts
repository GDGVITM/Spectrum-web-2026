import { create } from "zustand";

type overlayActive = {
  isActive: boolean;
  removeGif: boolean;
  isLandingReady: boolean;
  preloaderProgress: number;
  bitMapCache: ImageBitmap[][] | null;
  isPlaying: boolean;
  setActive: () => void;
  setRemoveGif: () => void;
  setLandingReady: (ready: boolean) => void;
  setPreloaderProgress: (progress: number) => void;
  setBitMapCache: (cache: ImageBitmap[][]) => void;
  setIsPlaying: (playing: boolean) => void;
  togglePlaying: () => void;
  resetActive: () => void;
  resetRemoveGif: () => void;
};

const isIntroPlayed = typeof window !== "undefined" ? sessionStorage.getItem("introPlayed") === "true" : false;

const useOverlayStore = create<overlayActive>((set) => ({
  isActive: isIntroPlayed,
  removeGif: isIntroPlayed,
  isLandingReady: false,
  preloaderProgress: 0,
  bitMapCache: null,
  isPlaying: false,
  setActive: () => set({ isActive: true }),
  setRemoveGif: () => set({ removeGif: true }),
  setLandingReady: (ready) => set({ isLandingReady: ready }),
  setPreloaderProgress: (progress) => set({ preloaderProgress: progress }),
  setBitMapCache: (cache) => set({ bitMapCache: cache }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  resetActive: () => set({ isActive: false }),
  resetRemoveGif: () => set({ removeGif: false }),
}));

export default useOverlayStore;

type ham = {
    isHamOpen: boolean;
    setHamOpen: (isOpen: boolean) => void;
}
export const useHamStore = create<ham>((set) => ({
    isHamOpen: false,
    setHamOpen: (isOpen) => set({ isHamOpen: isOpen })
}));

type mainHam = {
    isMainHamOpen: boolean;
    setMainHamOpen: (isOpen: boolean) => void;
}
export const useMainHamStore = create<mainHam>((set) => ({
    isMainHamOpen: false,
    setMainHamOpen: (isOpen) => set({ isMainHamOpen: isOpen })
}));

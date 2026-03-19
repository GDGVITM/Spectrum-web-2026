import { create } from "zustand";

type overlayActive = {
  isActive: boolean;
  removeGif: boolean;
  isLandingReady: boolean;
  preloaderProgress: number;
  bitMapCache: ImageBitmap[][] | null;
  setActive: () => void;
  setRemoveGif: () => void;
  setLandingReady: (ready: boolean) => void;
  setPreloaderProgress: (progress: number) => void;
  setBitMapCache: (cache: ImageBitmap[][]) => void;
  resetActive: () => void;
  resetRemoveGif: () => void;
};

const useOverlayStore = create<overlayActive>((set) => ({
  isActive: false,
  removeGif: false,
  isLandingReady: false,
  preloaderProgress: 0,
  bitMapCache: null,
  setActive: () => set({ isActive: true }),
  setRemoveGif: () => set({ removeGif: true }),
  setLandingReady: (ready) => set({ isLandingReady: ready }),
  setPreloaderProgress: (progress) => set({ preloaderProgress: progress }),
  setBitMapCache: (cache) => set({ bitMapCache: cache }),
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

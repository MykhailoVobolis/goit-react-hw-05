import Lenis from "@studio-freight/lenis";

let lenis = null;

export function initLenis() {
  if (typeof window === "undefined") return null;

  if (!lenis) {
    lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    const raf = (time) => {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }

  return lenis;
}

export function getLenis() {
  if (typeof window === "undefined") return null;
  return initLenis();
}

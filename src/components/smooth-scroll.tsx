import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      lerp: 0.1,
      // Let nested scroll areas (QAI chat, command palette, etc.) scroll natively.
      prevent: (node: HTMLElement) => {
        if (node.hasAttribute?.("data-lenis-prevent")) return true;
        const oy = getComputedStyle(node).overflowY;
        return (oy === "auto" || oy === "scroll") && node.scrollHeight > node.clientHeight;
      },
    });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
  return null;
}
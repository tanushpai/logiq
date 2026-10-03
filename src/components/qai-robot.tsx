import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import robotImg from "@/assets/qai-robot.png";
import { cn } from "@/lib/utils";

export function QaiRobot({ className, size = 520 }: { className?: string; size?: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const rx = useTransform(sy, [-1, 1], [6, -6]);
  const ry = useTransform(sx, [-1, 1], [-8, 8]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ perspective: 1000 }}>
      {/* Aura rings */}
      <div
        className="animate-pulse-ring absolute aura-glow rounded-full"
        style={{ width: size * 1.1, height: size * 1.1 }}
      />
      <div
        className="absolute rounded-full border border-bronze/30"
        style={{ width: size * 0.95, height: size * 0.95 }}
      />
      <motion.div
        style={{ rotateX: rx, rotateY: ry, width: size, height: size }}
        className="animate-float relative"
      >
        <img
          src={robotImg}
          alt="QAI — your intelligent companion"
          className="h-full w-full object-contain drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 30px 60px oklch(0.78 0.13 70 / 0.35))" }}
        />
      </motion.div>
    </div>
  );
}
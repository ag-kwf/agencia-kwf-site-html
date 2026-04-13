'use client';

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedGridBgProps {
  children: React.ReactNode;
  className?: string;
  fadeTop?: boolean;
  fadeBottom?: boolean;
}

export function AnimatedGridBg({ children, className, fadeTop = false, fadeBottom = true }: AnimatedGridBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const patternId = React.useId();
  const baseId = `grid-base-${patternId.replace(/:/g, "")}`;
  const revealId = `grid-reveal-${patternId.replace(/:/g, "")}`;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.3) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.3) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("relative w-full overflow-hidden", className)}
    >
      {/* Base grid — always visible, very subtle */}
      <div className="absolute inset-0 z-0 opacity-[0.04]">
        <GridPattern id={baseId} offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>

      {/* Mouse-reveal grid — brighter, follows cursor (desktop only) */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 z-0 opacity-25"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          <GridPattern
            id={revealId}
            offsetX={gridOffsetX}
            offsetY={gridOffsetY}
          />
        </motion.div>
      )}

      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute right-[-15%] top-[-15%] w-[35%] h-[35%] rounded-full blur-[120px]"
          style={{ background: "hsl(37 38% 45% / 0.15)" }}
        />
        <div
          className="absolute left-[-10%] bottom-[-15%] w-[35%] h-[35%] rounded-full blur-[120px]"
          style={{ background: "hsl(152 77% 33% / 0.10)" }}
        />
      </div>

      {/* Fade-in no topo */}
      {fadeTop && (
        <div
          className="absolute top-0 left-0 right-0 z-[1] h-[120px] pointer-events-none"
          style={{
            background: "linear-gradient(to top, transparent, hsl(var(--background)))",
          }}
        />
      )}

      {/* Fade-out na parte inferior */}
      {fadeBottom && (
        <div
          className="absolute bottom-0 left-0 right-0 z-[1] h-[120px] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, hsl(var(--background)))",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function GridPattern({
  id,
  offsetX,
  offsetY,
}: {
  id: string;
  offsetX: import("framer-motion").MotionValue<number>;
  offsetY: import("framer-motion").MotionValue<number>;
}) {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id={id}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gold"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

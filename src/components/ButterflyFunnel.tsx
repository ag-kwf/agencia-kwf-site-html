import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Flame, Zap, Rocket, Megaphone } from "lucide-react";

const phases = [
  { label: "Aquisição", icon: Target, color: "#CDA066" },
  { label: "Aquecimento", icon: Flame, color: "#CDA066" },
  { label: "Ação", icon: Zap, color: "#139657" },
  { label: "Ativação", icon: Rocket, color: "#CDA066" },
  { label: "Ampliação", icon: Megaphone, color: "#CDA066" },
];

const shapePaths = [
  // Aquisição - large chevron left (wide)
  "M 10,10 L 210,10 L 240,130 L 210,250 L 10,250 Z",
  // Aquecimento - trapezoid converging
  "M 250,45 L 400,45 L 430,130 L 400,215 L 250,215 L 280,130 Z",
  // Ação - compact center diamond
  "M 440,75 L 560,75 L 590,130 L 560,185 L 440,185 L 470,130 Z",
  // Ativação - trapezoid diverging (mirror)
  "M 600,45 L 750,45 L 720,130 L 750,215 L 600,215 L 630,130 Z",
  // Ampliação - large chevron right (wide)
  "M 790,10 L 990,10 L 990,250 L 790,250 L 760,130 Z",
];

const iconPositions = [
  { x: 120, y: 130 },
  { x: 335, y: 130 },
  { x: 515, y: 130 },
  { x: 685, y: 130 },
  { x: 890, y: 130 },
];

export function ButterflyFunnel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.4 });

  return (
    <div ref={containerRef} className="w-full max-w-[960px] mx-auto px-4">
      <svg
        viewBox="0 0 1000 310"
        className="w-full h-auto"
        style={{ maxHeight: "320px" }}
      >
        <defs>
          {phases.map((phase, i) => (
            <linearGradient key={`fill-${i}`} id={`fill-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={phase.color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={phase.color} stopOpacity="0.08" />
            </linearGradient>
          ))}
          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {phases.map((phase, i) => {
          const Icon = phase.icon;
          const delay = i * 0.3;
          const pos = iconPositions[i];

          return (
            <g key={phase.label}>
              <motion.path
                d={shapePaths[i]}
                fill={`url(#fill-${i})`}
                stroke={phase.color}
                strokeWidth="1.5"
                initial={{ opacity: 0.15, strokeOpacity: 0.2, fillOpacity: 0 }}
                animate={
                  isInView
                    ? { opacity: 1, strokeOpacity: 1, fillOpacity: 1 }
                    : { opacity: 0.15, strokeOpacity: 0.2, fillOpacity: 0 }
                }
                transition={{ delay, duration: 0.6, ease: "easeOut" }}
                filter={isInView ? "url(#glow)" : undefined}
              />

              <motion.foreignObject
                x={pos.x - 14}
                y={pos.y - 30}
                width="28"
                height="28"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: delay + 0.15, duration: 0.4 }}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    style={{ color: isInView ? phase.color : "hsl(0,0%,40%)" }}
                  />
                </div>
              </motion.foreignObject>

              <motion.text
                x={pos.x}
                y={pos.y + 16}
                textAnchor="middle"
                className="text-[11px] font-semibold uppercase"
                style={{ letterSpacing: "0.08em" }}
                fill={isInView ? phase.color : "hsl(0,0%,40%)"}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0.3 }}
                transition={{ delay: delay + 0.1, duration: 0.4 }}
              >
                {phase.label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

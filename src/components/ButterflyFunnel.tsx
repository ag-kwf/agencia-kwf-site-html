import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Flame, Zap, Rocket, Megaphone } from "lucide-react";

const phases = [
  { label: "Aquisição", icon: Target, color: "#139657" },
  { label: "Aquecimento", icon: Flame, color: "#3aaa6a" },
  { label: "Ação", icon: Zap, color: "#CDA066" },
  { label: "Ativação", icon: Rocket, color: "#3aaa6a" },
  { label: "Ampliação", icon: Megaphone, color: "#139657" },
];

// Bowtie SVG paths: wide → narrow → center → narrow → wide
// viewBox 0 0 1000 260
const shapePaths = [
  // Aquisição - large chevron left
  "M 10,20 L 170,20 L 200,130 L 170,240 L 10,240 Z",
  // Aquecimento - medium trapezoid
  "M 210,50 L 370,50 L 400,130 L 370,210 L 210,210 L 240,130 Z",
  // Ação - narrow diamond center
  "M 410,80 L 530,80 L 590,130 L 530,180 L 410,180 L 470,130 Z",
  // Ativação - medium trapezoid (mirror)
  "M 600,50 L 760,50 L 790,130 L 760,210 L 600,210 L 630,130 Z",
  // Ampliação - large chevron right
  "M 800,20 L 990,20 L 990,240 L 800,240 L 830,130 Z",
];

// Icon positions (cx, cy) for each phase
const iconPositions = [
  { x: 100, y: 130 },
  { x: 300, y: 130 },
  { x: 500, y: 130 },
  { x: 700, y: 130 },
  { x: 900, y: 130 },
];

// Label positions
const labelPositions = [
  { x: 100, y: 130 },
  { x: 300, y: 130 },
  { x: 500, y: 130 },
  { x: 700, y: 130 },
  { x: 900, y: 130 },
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
          <linearGradient id="grad-green-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#139657" />
            <stop offset="50%" stopColor="#CDA066" />
            <stop offset="100%" stopColor="#139657" />
          </linearGradient>
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
              {/* Shape */}
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

              {/* Icon as foreignObject */}
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

              {/* Label */}
              <motion.text
                x={labelPositions[i].x}
                y={labelPositions[i].y + 16}
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

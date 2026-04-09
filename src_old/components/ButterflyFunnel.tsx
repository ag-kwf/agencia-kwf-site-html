import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Flame, Zap, Rocket, Megaphone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const phases = [
  { label: "Aquisição", icon: Target, color: "#CDA066" },
  { label: "Aquecimento", icon: Flame, color: "#CDA066" },
  { label: "Ação", icon: Zap, color: "#139657" },
  { label: "Ativação", icon: Rocket, color: "#CDA066" },
  { label: "Ampliação", icon: Megaphone, color: "#CDA066" },
];

// Horizontal layout (desktop/tablet)
const hPaths = [
  "M 20,10 L 200,10 L 200,250 L 20,250 Z",
  "M 215,40 L 390,40 L 390,220 L 215,220 Z",
  "M 405,70 L 595,70 L 595,190 L 405,190 Z",
  "M 610,40 L 785,40 L 785,220 L 610,220 Z",
  "M 800,10 L 980,10 L 980,250 L 800,250 Z",
];
const hIcons = [
  { x: 110, y: 115 },
  { x: 302, y: 115 },
  { x: 500, y: 115 },
  { x: 698, y: 115 },
  { x: 890, y: 115 },
];
const hLines = [
  { x1: 200, x2: 215, y: 130 },
  { x1: 390, x2: 405, y: 130 },
  { x1: 595, x2: 610, y: 130 },
  { x1: 785, x2: 800, y: 130 },
];

// Vertical layout (mobile)
const vPaths = [
  "M 10,20 L 250,20 L 250,100 L 10,100 Z",
  "M 30,115 L 230,115 L 230,195 L 30,195 Z",
  "M 55,210 L 205,210 L 205,290 L 55,290 Z",
  "M 30,305 L 230,305 L 230,385 L 30,385 Z",
  "M 10,400 L 250,400 L 250,480 L 10,480 Z",
];
const vIcons = [
  { x: 130, y: 48 },
  { x: 130, y: 143 },
  { x: 130, y: 238 },
  { x: 130, y: 333 },
  { x: 130, y: 428 },
];
const vLines = [
  { y1: 100, y2: 115, x: 130 },
  { y1: 195, y2: 210, x: 130 },
  { y1: 290, y2: 305, x: 130 },
  { y1: 385, y2: 400, x: 130 },
];

export function ButterflyFunnel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.4 });
  const isMobile = useIsMobile();

  const shapePaths = isMobile ? vPaths : hPaths;
  const iconPositions = isMobile ? vIcons : hIcons;
  const viewBox = isMobile ? "0 0 260 500" : "0 0 1000 300";

  return (
    <div ref={containerRef} className="w-full max-w-[960px] mx-auto px-4">
      <svg
        viewBox={viewBox}
        className="w-full h-auto"
        style={{ maxHeight: isMobile ? "520px" : "320px" }}
      >
        <defs>
          {phases.map((phase, i) => (
            <linearGradient key={`fill-${i}`} id={`fill-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={phase.color} stopOpacity="0.20" />
              <stop offset="100%" stopColor={phase.color} stopOpacity="0.05" />
            </linearGradient>
          ))}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
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
                strokeWidth="2"
                initial={{ opacity: 0.15, strokeOpacity: 0.2, fillOpacity: 0 }}
                animate={
                  isInView
                    ? { opacity: 1, strokeOpacity: 1, fillOpacity: 1 }
                    : { opacity: 0.15, strokeOpacity: 0.2, fillOpacity: 0 }
                }
                transition={{ delay, duration: 0.6, ease: "easeOut" }}
                filter={isInView ? "url(#glow)" : undefined}
              />

              {i < 4 && (
                isMobile ? (
                  <motion.line
                    x1={vLines[i].x}
                    y1={vLines[i].y1}
                    x2={vLines[i].x}
                    y2={vLines[i].y2}
                    stroke={phase.color}
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
                    transition={{ delay: delay + 0.3, duration: 0.4 }}
                  />
                ) : (
                  <motion.line
                    x1={hLines[i].x1}
                    y1={hLines[i].y}
                    x2={hLines[i].x2}
                    y2={hLines[i].y}
                    stroke={phase.color}
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
                    transition={{ delay: delay + 0.3, duration: 0.4 }}
                  />
                )
              )}

              <motion.foreignObject
                x={pos.x - 12}
                y={pos.y - 12}
                width="24"
                height="24"
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
                y={pos.y + 24}
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

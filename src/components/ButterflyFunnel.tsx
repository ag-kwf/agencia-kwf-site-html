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

// Bowtie shape: large rectangles on edges, smaller toward center — NO arrow tips
const shapePaths = [
  // Aquisição - large rectangle (rounded via rx on rect won't work with path, so straight edges)
  "M 20,10 L 200,10 L 200,250 L 20,250 Z",
  // Aquecimento - medium rectangle, narrower height
  "M 215,40 L 390,40 L 390,220 L 215,220 Z",
  // Ação - compact center rectangle
  "M 405,70 L 595,70 L 595,190 L 405,190 Z",
  // Ativação - medium rectangle (mirror)
  "M 610,40 L 785,40 L 785,220 L 610,220 Z",
  // Ampliação - large rectangle
  "M 800,10 L 980,10 L 980,250 L 800,250 Z",
];

const iconPositions = [
  { x: 110, y: 115 },
  { x: 302, y: 115 },
  { x: 500, y: 115 },
  { x: 698, y: 115 },
  { x: 890, y: 115 },
];

export function ButterflyFunnel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.4 });

  return (
    <div ref={containerRef} className="w-full max-w-[960px] mx-auto px-4">
      <svg
        viewBox="0 0 1000 300"
        className="w-full h-auto"
        style={{ maxHeight: "320px" }}
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
                rx="8"
                initial={{ opacity: 0.15, strokeOpacity: 0.2, fillOpacity: 0 }}
                animate={
                  isInView
                    ? { opacity: 1, strokeOpacity: 1, fillOpacity: 1 }
                    : { opacity: 0.15, strokeOpacity: 0.2, fillOpacity: 0 }
                }
                transition={{ delay, duration: 0.6, ease: "easeOut" }}
                filter={isInView ? "url(#glow)" : undefined}
              />

              {/* Connecting lines between shapes */}
              {i < 4 && (
                <motion.line
                  x1={[200, 390, 595, 785][i]}
                  y1={130}
                  x2={[215, 405, 610, 800][i]}
                  y2={130}
                  stroke={phase.color}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
                  transition={{ delay: delay + 0.3, duration: 0.4 }}
                />
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

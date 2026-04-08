import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Flame, Zap, Rocket, Megaphone } from "lucide-react";

const phases = [
  { label: "Aquisição", icon: Target, height: "100%" },
  { label: "Aquecimento", icon: Flame, height: "70%" },
  { label: "Ação", icon: Zap, height: "45%" },
  { label: "Ativação", icon: Rocket, height: "70%" },
  { label: "Ampliação", icon: Megaphone, height: "100%" },
];

export function ButterflyFunnel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.4 });

  return (
    <div ref={containerRef} className="w-full max-w-[900px] mx-auto px-4">
      {/* Desktop/Tablet */}
      <div className="hidden md:flex items-center justify-center gap-1 h-[220px]">
        {phases.map((phase, i) => (
          <FunnelSegment
            key={phase.label}
            phase={phase}
            index={i}
            isInView={isInView}
          />
        ))}
      </div>

      {/* Mobile - horizontal scroll */}
      <div className="flex md:hidden items-center justify-start gap-1 h-[180px] overflow-x-auto pb-4 scrollbar-hide">
        {phases.map((phase, i) => (
          <FunnelSegment
            key={phase.label}
            phase={phase}
            index={i}
            isInView={isInView}
            mobile
          />
        ))}
      </div>
    </div>
  );
}

function FunnelSegment({
  phase,
  index,
  isInView,
  mobile = false,
}: {
  phase: (typeof phases)[number];
  index: number;
  isInView: boolean;
  mobile?: boolean;
}) {
  const Icon = phase.icon;
  const isActive = isInView;
  const delay = index * 0.3;

  // Clip paths for butterfly shape (wide → narrow → wide)
  const clipPaths = [
    "polygon(0% 0%, 85% 15%, 85% 85%, 0% 100%)",        // wide left
    "polygon(0% 15%, 85% 25%, 85% 75%, 0% 85%)",         // medium
    "polygon(0% 25%, 85% 35%, 85% 65%, 0% 75%)",         // narrow center
    "polygon(0% 25%, 85% 15%, 85% 85%, 0% 75%)",         // medium expanding
    "polygon(0% 15%, 100% 0%, 100% 100%, 0% 85%)",       // wide right
  ];

  return (
    <div className="flex flex-col items-center gap-3" style={{ minWidth: mobile ? "100px" : undefined, flex: mobile ? "0 0 100px" : "1" }}>
      <motion.div
        className="relative w-full flex items-center justify-center"
        style={{
          height: mobile ? "120px" : "160px",
          clipPath: clipPaths[index],
        }}
        initial={{ opacity: 0.15, scale: 0.95 }}
        animate={
          isActive
            ? { opacity: 1, scale: 1 }
            : { opacity: 0.15, scale: 0.95 }
        }
        transition={{ delay, duration: 0.5, ease: "easeOut" }}
      >
        {/* Background */}
        <motion.div
          className="absolute inset-0"
          initial={{ background: "rgba(255,255,255,0.06)" }}
          animate={
            isActive
              ? {
                  background:
                    "linear-gradient(135deg, hsl(43, 55%, 45%), hsl(43, 55%, 55%))",
                  boxShadow: "0 0 30px rgba(198,165,78,0.3)",
                }
              : {
                  background: "rgba(255,255,255,0.06)",
                  boxShadow: "none",
                }
          }
          transition={{ delay, duration: 0.5 }}
        />

        {/* Border overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            clipPath: clipPaths[index],
          }}
        />

        {/* Icon */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            isActive
              ? { opacity: 1, scale: 1 }
              : { opacity: 0.3, scale: 0.7 }
          }
          transition={{ delay: delay + 0.15, duration: 0.4 }}
        >
          <Icon
            className="w-6 h-6 md:w-7 md:h-7"
            strokeWidth={1.5}
            style={{ color: isActive ? "hsl(0, 0%, 8%)" : "hsl(0, 0%, 60%)" }}
          />
        </motion.div>
      </motion.div>

      {/* Label */}
      <motion.span
        className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.1em] whitespace-nowrap"
        initial={{ opacity: 0, y: 8 }}
        animate={
          isActive
            ? { opacity: 1, y: 0, color: "hsl(43, 55%, 54%)" }
            : { opacity: 0.4, y: 4, color: "hsl(0, 0%, 60%)" }
        }
        transition={{ delay: delay + 0.1, duration: 0.4 }}
      >
        {phase.label}
      </motion.span>
    </div>
  );
}

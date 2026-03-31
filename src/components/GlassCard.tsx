import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  hoverGold?: boolean;
  hoverGlow?: boolean;
}

export function GlassCard({ children, className = "", hoverGold = false, hoverGlow = false }: Props) {
  return (
    <motion.div
      className={`rounded-xl p-5 md:p-6 transition-all duration-300 ${className}`}
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      whileHover={{
        scale: 1.01,
        boxShadow: hoverGlow
          ? "0 0 40px rgba(205,160,102,0.12), 0 0 80px rgba(205,160,102,0.05)"
          : hoverGold
          ? "0 0 30px rgba(205,160,102,0.1)"
          : "0 8px 30px rgba(0,0,0,0.15)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.10)";
        e.currentTarget.style.borderColor =
          hoverGold || hoverGlow ? "rgba(205,160,102,0.30)" : "rgba(255,255,255,0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      }}
    >
      {children}
    </motion.div>
  );
}

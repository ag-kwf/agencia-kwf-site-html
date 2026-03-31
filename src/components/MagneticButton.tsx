import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export function MagneticButton({ children, href, className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 300 });
  const springY = useSpring(y, { damping: 20, stiffness: 300 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

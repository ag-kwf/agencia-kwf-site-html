import { useState, useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface Props {
  target: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({ target, prefix = "", suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 30, stiffness: 80 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setDisplay(Math.round(v).toLocaleString("pt-BR"));
    });
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} className="text-gold text-[24px] md:text-[28px] font-bold leading-none">
      {prefix}{display}{suffix}
    </span>
  );
}

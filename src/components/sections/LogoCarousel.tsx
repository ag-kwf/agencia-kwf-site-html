import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { clientLogos } from "@/lib/clientLogos";

function CarouselRow({
  logos,
  speed,
}: {
  logos: typeof clientLogos;
  speed: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let pos = 0;
    let rafId: number;

    const tick = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [speed]);

  return (
    <div
      ref={ref}
      className="flex overflow-hidden gap-[8px] px-[28px] mx-0"
      style={{ scrollbarWidth: "none" }}
    >
      {[...logos, ...logos].map((logo, idx) => (
        <motion.div
          key={idx}
          className="shrink-0 w-[calc((100%_-_32px)/5)] aspect-square rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          whileHover={{
            scale: 1.1,
            borderColor: "rgba(205,160,102,0.4)",
            boxShadow: "0 0 20px rgba(205,160,102,0.15)",
          }}
        >
          <img src={logo.src} alt={logo.alt} className="w-full h-full object-cover rounded-full" loading="lazy" />
        </motion.div>
      ))}
    </div>
  );
}

export function LogoCarousel() {
  const mid = Math.ceil(clientLogos.length / 2);
  const row1 = clientLogos.slice(0, mid);
  const row2 = clientLogos.slice(mid);

  return (
    <div className="space-y-3">
      <CarouselRow logos={row1} speed={0.5} />
      <CarouselRow logos={row2} speed={0.4} />
    </div>
  );
}

'use client';

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { clientLogos } from "@/lib/clientLogos";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Sparkles } from "@/components/ui/sparkles";
import Image from "next/image";

const mid = Math.ceil(clientLogos.length / 2);
const row1 = clientLogos.slice(0, mid);
const row2 = clientLogos.slice(mid);

export function SocialProof() {
  return (
    <section
      id="resultados"
      aria-label="Resultados e clientes"
      className="relative overflow-hidden pt-6 md:pt-10 pb-12 md:pb-20 px-5 md:px-10"
    >
      <motion.div
        className="relative z-10 mx-auto max-w-[1100px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-2 text-center"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          Quem já confiou na <span className="text-gold">Agência KWF</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] text-center mb-10"
        >
          Atendemos grandes Empresas Tradicionais e do Digital
        </motion.p>

        {/* Row 1 */}
        <motion.div variants={fadeUp} className="relative h-[80px] w-full mb-4">
          <InfiniteSlider
            className="flex h-full w-full items-center"
            duration={35}
            gap={32}
          >
            {row1.map((logo) => (
              <div
                key={logo.alt}
                className="shrink-0 w-[72px] h-[72px] rounded-full overflow-hidden relative flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-cover rounded-full"
                  loading="lazy"
                  sizes="72px"
                />
              </div>
            ))}
          </InfiniteSlider>
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-[120px]"
            direction="left"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-[120px]"
            direction="right"
            blurIntensity={1}
          />
        </motion.div>

        {/* Row 2 — reverse direction */}
        <motion.div variants={fadeUp} className="relative h-[80px] w-full">
          <InfiniteSlider
            className="flex h-full w-full items-center"
            duration={30}
            gap={32}
            reverse
          >
            {row2.map((logo) => (
              <div
                key={logo.alt}
                className="shrink-0 w-[72px] h-[72px] rounded-full overflow-hidden relative flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-cover rounded-full"
                  loading="lazy"
                  sizes="72px"
                />
              </div>
            ))}
          </InfiniteSlider>
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-[120px]"
            direction="left"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-[120px]"
            direction="right"
            blurIntensity={1}
          />
        </motion.div>
      </motion.div>

      {/* Sparkles + curved divider */}
      <div className="relative -mt-16 h-72 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,hsl(37_38%_45%),transparent_70%)] before:opacity-20" />
        <div
          className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%]"
          style={{
            borderTop: "1px solid rgba(205,160,102,0.15)",
            background: "hsl(var(--background))",
          }}
        />
        <Sparkles
          density={1200}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          color="#CDA066"
        />
      </div>
    </section>
  );
}

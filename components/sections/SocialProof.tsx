'use client';

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { LogoCarousel } from "@/components/sections/LogoCarousel";
import { fadeUp, scaleUp, stagger } from "@/lib/animations";
import { trackCTAClick } from "@/lib/tracking";

export function SocialProof() {
  return (
    <section id="resultados" aria-label="Resultados e clientes" className="py-8 md:py-12 px-5 md:px-10">
      <motion.div
        className="max-w-[1100px] mx-auto"
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
        <motion.p variants={fadeUp} className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] text-center mb-8">
          Atendemos grandes Empresas Tradicionais e do Digital
        </motion.p>

        <motion.div variants={scaleUp} className="mb-8">
          <LogoCarousel />
        </motion.div>

        <motion.div variants={fadeUp} className="text-center">
          <MagneticButton
            href="#diagnostico"
            onClick={() => trackCTAClick('social_proof', 'QUERO MEU PRÉ-DIAGNÓSTICO')}
            className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-8 py-3.5 hover:bg-green-hover transition-all shadow-[0_0_20px_rgba(19,150,87,0.15)] hover:shadow-[0_0_40px_rgba(19,150,87,0.3)]"
          >
            Quero meu pré-diagnóstico
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

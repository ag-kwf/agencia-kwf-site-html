'use client';

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import Image from "next/image";
import { trackCTAClick } from "@/lib/tracking";
import { fadeUp, stagger } from "@/lib/animations";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Apresentação principal"
      className="relative pt-[90px] md:pt-[120px] pb-12 md:pb-24 px-5 md:px-10 flex items-center justify-center"
    >
      <motion.div
        className="relative z-10 max-w-[700px] mx-auto flex flex-col items-center text-center w-full"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Logo */}
        <motion.div variants={fadeUp} className="mb-6">
          <Image
            src="/images/logo-kwf.webp"
            alt="Agência KWF"
            className="h-14 md:h-16 w-auto"
            width={64}
            height={64}
            priority
          />
        </motion.div>

        {/* Tag */}
        <motion.span
          variants={fadeUp}
          className="inline-block text-gold font-semibold uppercase tracking-[0.15em] text-[11px] md:text-xs mb-4 border border-gold/30 rounded-full px-4 py-1.5 bg-gold/5"
        >
          Empresas que Faturam +R$150mil/Mês
        </motion.span>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-bold leading-[1.1] tracking-[-0.03em] text-foreground mb-4"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          Transforme seu Marketing em um Sistema de Aquisição{" "}
          <span className="text-gold">Previsível</span> com Método e{" "}
          <span className="text-gold">Inteligência Artificial</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="text-muted-foreground leading-[1.7] mb-8 text-sm md:text-base max-w-[540px]"
          style={{ textWrap: "balance" as React.CSSProperties["textWrap"] }}
        >
          Escale com sistema, clareza e mapeando todos os gargalos operacionais que podem estar travando os seus resultados.
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp}>
          <MagneticButton
            href="#diagnostico"
            onClick={() => trackCTAClick('hero', 'QUERO UM PRÉ-DIAGNÓSTICO')}
            className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-8 py-3.5 hover:bg-green-hover transition-all shadow-[0_0_30px_rgba(19,150,87,0.2)] hover:shadow-[0_0_50px_rgba(19,150,87,0.35)]"
          >
            Quero um Pré-diagnóstico
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

'use client';

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { ButterflyFunnel } from "@/components/ButterflyFunnel";

export function Results() {
  return (
    <section id="como-funciona" aria-label="Como funciona o Sistema KWF" className="py-12 md:py-20 px-5 md:px-10">
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3 text-center">
          Clareza no processo
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-2 text-center"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          O funil que transforma investimento em <span className="text-gold">receita previsível</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-10 text-center" style={{ textWrap: "balance" }}>
          5 fases integradas que cobrem toda a jornada da aquisição à ampliação.
        </motion.p>

        <motion.div variants={fadeUp}>
          <ButterflyFunnel />
        </motion.div>
      </motion.div>
    </section>
  );
}

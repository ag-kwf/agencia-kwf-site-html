'use client';

import { motion } from "framer-motion";
import { fadeUp, fadeLeft, fadeRight, stagger, staggerFast } from "@/lib/animations";

const before = [
  "Lead entra. Ninguém responde. Vai embora.",
  "Relatório chega. Você não consegue ligar a nenhum cliente.",
  "Mês bom, mês seco. Sem explicação pra nenhum dos dois.",
  'Sócio pergunta como está o marketing. Você responde "tá rodando."',
];

const after = [
  "Contato entra, é qualificado e respondido em minutos — sem você tocar.",
  "Dashboard mostra de onde veio cada cliente e quanto custou.",
  "Fluxo previsível de novos clientes todo mês, rastreado do primeiro clique.",
  "Quando perguntarem, você abre o dashboard e mostra o número.",
];

export function BeforeAfter() {
  return (
    <section aria-label="Antes e depois do Sistema KWF" className="py-8 md:py-12 px-5 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
      <motion.div
        className="max-w-[1000px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground text-center mb-2"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          Você sabe o que acontece na sua empresa <span className="text-gold">enquanto você não está olhando?</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <motion.div
            variants={fadeLeft}
            className="rounded-xl p-5 md:p-6"
            style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }}
            whileHover={{ borderColor: "rgba(239,68,68,0.35)", boxShadow: "0 0 30px rgba(239,68,68,0.08)" }}
          >
            <span
              className="inline-block text-[11px] font-semibold uppercase tracking-[0.08em] px-3 py-1 rounded-md mb-4"
              style={{ background: "rgba(239,68,68,0.12)", color: "#EF4444" }}
            >
              Sem sistema
            </span>
            <motion.ul className="space-y-2.5" variants={staggerFast} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {before.map((t) => (
                <motion.li key={t} variants={fadeUp} className="flex items-start gap-2.5 text-muted-foreground text-[13px] md:text-[14px] leading-[1.6]">
                  <span className="text-destructive mt-0.5 shrink-0">✕</span>
                  {t}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            variants={fadeRight}
            className="rounded-xl p-5 md:p-6"
            style={{ background: "rgba(19,150,87,0.06)", border: "1px solid rgba(19,150,87,0.22)" }}
            whileHover={{ borderColor: "rgba(19,150,87,0.45)", boxShadow: "0 0 30px rgba(19,150,87,0.08)" }}
          >
            <span
              className="inline-block text-[11px] font-semibold uppercase tracking-[0.08em] px-3 py-1 rounded-md mb-4"
              style={{ background: "rgba(19,150,87,0.14)", color: "#139657" }}
            >
              Com o sistema de aquisição da KWF
            </span>
            <motion.ul className="space-y-2.5" variants={staggerFast} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {after.map((t) => (
                <motion.li key={t} variants={fadeUp} className="flex items-start gap-2.5 text-foreground text-[13px] md:text-[14px] leading-[1.6]">
                  <span className="text-accent mt-0.5 shrink-0">✓</span>
                  {t}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

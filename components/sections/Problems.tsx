'use client';

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { fadeUp, fadeLeft, fadeRight, stagger } from "@/lib/animations";
import Image from "next/image";

const cards = [
  {
    title: "O balde furado",
    body: "Você atrai lead, mas perde no caminho. Atendimento demorado, follow-up esquecido, proposta que some. O funil vaza antes de chegar no fechamento.",
    result: "→ Resultado: esforço alto, fechamento baixo.",
    image: "/images/problems/o_balde_furado.webp",
  },
  {
    title: "O carro sem painel",
    body: "Sem metas claras, sem KPIs, sem dashboard. Você dirige no escuro. Não sabe se está acelerando, freando ou parado.",
    result: "→ Resultado: decisões no achismo, mês a mês.",
    image: "/images/problems/o_carro_sem_painel.webp",
  },
  {
    title: "O trabalho manual",
    body: "Follow-up na mão, CRM preenchido com atraso, lead esperando resposta. Tudo depende de gente, e gente falha.",
    result: "→ Resultado: lead esfria, venda perde, concorrente ganha.",
    image: "/images/problems/o_trabalho_manual.webp",
  },
];

export function Problems() {
  return (
    <section id="problemas" aria-label="Problemas que resolvemos" className="py-8 md:py-12 px-5 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3 text-center">
          Caso se identifique, você está no lugar certo
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.15] tracking-[-0.02em] text-foreground mb-8 md:mb-10 text-center max-w-[700px] mx-auto"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          Três problemas que <span className="text-gold">travam o crescimento</span> de 7 em cada 10 empresas.
        </motion.h2>

        <div className="space-y-4">
          {cards.map((c, i) => {
            const isReversed = i % 2 === 1;
            const variant = i % 2 === 0 ? fadeLeft : fadeRight;
            return (
              <motion.article key={c.title} variants={variant}>
                <GlassCard hoverGold>
                  <div className={`flex flex-col md:flex-row gap-5 items-center ${isReversed ? "md:flex-row-reverse" : ""}`}>
                    <div className="w-full md:w-1/2">
                      <motion.div
                        className="w-7 h-0.5 bg-gold rounded mb-3"
                        initial={{ width: 0 }}
                        whileInView={{ width: 28 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                      <h3 className="text-foreground text-base md:text-lg font-bold tracking-[-0.01em] mb-2">{c.title}</h3>
                      <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-2">{c.body}</p>
                      <p className="text-gold text-xs">{c.result}</p>
                    </div>
                    <div className="w-full md:w-1/2">
                      <div className="rounded-lg h-[140px] md:h-[180px] overflow-hidden relative">
                        <Image src={c.image} alt={c.title} fill className="object-cover rounded-lg" loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

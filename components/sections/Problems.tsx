'use client';

import { motion } from "framer-motion";
import { EliteCard } from "@/components/ui/elite-card";
import { fadeUp, stagger } from "@/lib/animations";

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
    <section id="problemas" aria-label="Problemas que resolvemos" className="py-12 md:py-20 px-5 md:px-10">
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
          className="font-bold leading-[1.15] tracking-[-0.02em] text-foreground mb-10 md:mb-14 text-center max-w-[700px] mx-auto"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          Três problemas que <span className="text-gold">travam o crescimento</span> de 7 em cada 10 empresas.
        </motion.h2>

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {cards.map((c) => (
            <EliteCard
              key={c.title}
              imageUrl={c.image}
              title={c.title}
              body={c.body}
              result={c.result}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

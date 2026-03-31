import { motion } from "framer-motion";
import { fadeUp, fadeLeft, fadeRight, stagger, staggerFast } from "@/lib/animations";

const before = [
  "Investe em ads sem saber o retorno",
  "Relatórios soltos que não trazem inteligência ou identificam gargalos",
  "Lead chegam perdidos e ficam parados",
  "Operação Manual com nenhum controle",
  "Resultado depende de sorte e indicação",
  "Paga R$25–35k em equipe pra fazer o básico",
];

const after = [
  "Dashboard com dados reais de retorno",
  "Mapeamento do fluxo de aquisição, sem perda de lead",
  "IA responde lead em segundos e qualifica o lead",
  "Implantação de IA e Automação nos processos",
  "Funil com previsibilidade de retorno",
  "Operação de aquisição completa por uma fração do custo",
];

export function BeforeAfter() {
  return (
    <section className="py-8 md:py-12 px-5 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
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
          Enquanto você ainda sofre para <span className="text-gold">adivinhar</span>...
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] text-center mb-8"
          style={{ textWrap: "balance" }}
        >
          o faturamento que poderia estar no seu bolso está escorrendo.
        </motion.p>

        <div className="grid md:grid-cols-[4fr_5fr] gap-4">
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
              Como é hoje
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

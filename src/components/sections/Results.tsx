import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { fadeUp, scaleUp, stagger } from "@/lib/animations";

export function Results() {
  return (
    <section id="resultados" className="py-8 md:py-12 px-5 md:px-10">
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3 text-center">
          Resultados reais
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-2 text-center"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          Pare de ficar se perguntando <span className="text-gold">"isso tá funcionando?"</span>
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-8 text-center" style={{ textWrap: "balance" }}>
          Abre o dashboard. Veja todo o fluxo. Tome decisões acertadas.
        </motion.p>

        <motion.div variants={scaleUp}>
          <GlassCard className="max-w-[900px] mx-auto md:max-w-[630px]" hoverGlow>
            <div className="rounded-lg overflow-hidden">
              <video
                src="/videos/site_agencia_kwf.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-lg"
              />
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
}

'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { fadeUp, scaleUp, stagger } from "@/lib/animations";
import { trackCTAClick } from "@/lib/tracking";

export function DiagnosticForm() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <>
      <section
        id="diagnostico"
        aria-label="Pré-diagnóstico estratégico"
        className="py-12 md:py-20 px-5 md:px-10 relative overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(205,160,102,0.06) 0%, transparent 70%), hsl(var(--background))",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => {
            const size = 2 + (i % 4) * 1.2;
            const left = (i * 37 + 13) % 100;
            const top = (i * 53 + 7) % 100;
            const duration = 6 + (i % 5) * 2;
            const delay = (i % 7) * 1.1;
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  left: `${left}%`,
                  top: `${top}%`,
                  background: "hsl(var(--gold))",
                  animation: `float-particle ${duration}s ${delay}s ease-in-out infinite`,
                  opacity: 0.2,
                }}
              />
            );
          })}
        </div>

        <motion.div
          className="max-w-[1100px] mx-auto relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          <div
            className="rounded-2xl px-6 py-10 md:px-12 md:py-14"
            style={{
              background: "rgba(205,160,102,0.04)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(205,160,102,0.18)",
              boxShadow: "0 0 50px rgba(205,160,102,0.07), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <motion.div variants={fadeUp} className="text-center mb-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3">Próximo passo</p>
              <h2
                className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-2 max-w-[700px] mx-auto"
                style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
              >
                Descubra em 10 minutos onde pode estar <span className="text-gold">vazando dinheiro</span> da sua operação de aquisição e Marketing.
              </h2>
              <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] max-w-[540px] mx-auto">
                Toque no Botão abaixo e Realize seu Pré-Diagnóstico agora mesmo.
              </p>
            </motion.div>

            <motion.div variants={scaleUp} className="text-center">
              <motion.button
                onClick={() => {
                  setShowQuiz(true);
                  trackCTAClick('mid_page', 'QUERO FAZER O DIAGNÓSTICO');
                }}
                className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[14px] font-semibold uppercase tracking-[0.05em] px-10 py-4 hover:bg-green-hover transition-all shadow-[0_0_30px_rgba(19,150,87,0.2)] hover:shadow-[0_0_50px_rgba(19,150,87,0.35)]"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Quero fazer o diagnóstico
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {showQuiz && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80" onClick={() => setShowQuiz(false)} />
            <motion.div
              className="relative w-full max-w-[620px] rounded-2xl overflow-hidden"
              style={{ background: "hsl(var(--card))", border: "1px solid rgba(255,255,255,0.08)" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button
                onClick={() => setShowQuiz(false)}
                className="absolute top-3 right-3 z-10 rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                style={{ background: "rgba(255,255,255,0.1)" }}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
              <iframe
                src="https://new-leadscan.lovable.app/quiz/site-raio-x"
                width="100%"
                height="700"
                style={{
                  border: "none",
                  borderRadius: "12px",
                  maxWidth: "600px",
                  margin: "0 auto",
                  display: "block",
                }}
                title="Diagnóstico de Marketing"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

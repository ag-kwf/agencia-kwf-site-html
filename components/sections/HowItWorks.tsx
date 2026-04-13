'use client';

import { motion } from "framer-motion";
import { Search, Zap, Settings, Rocket } from "lucide-react";
import { fadeUp, fadeLeft, stagger } from "@/lib/animations";

const steps = [
  {
    num: "01",
    title: "Pré-Diagnóstico",
    subtitle: "Análise do funil de aquisição atual",
    body: "Entenda como está sua aquisição atualmente e como ter clareza do sistema te ajuda a escalar seus resultados.",
    icon: Search,
  },
  {
    num: "02",
    title: "Diagnóstico Raio-X",
    subtitle: "Você descobre onde o dinheiro vaza",
    body: "Mapeamos seu marketing e mostramos exatamente o que funciona e o que não funciona. Você recebe um relatório visual com o caminho claro.",
    icon: Zap,
  },
  {
    num: "03",
    title: "Instalação do Sistema",
    subtitle: "Montamos tudo no seu negócio em 30 dias",
    body: "Funil automatizado, IA no WhatsApp, dashboard de resultado. Tudo rodando sem você precisar virar especialista em nada.",
    icon: Settings,
  },
  {
    num: "04",
    title: "Aceleração Contínua",
    subtitle: "Seu marketing melhora todo mês",
    body: "Otimização diária. Testes semanais. O sistema fica mais inteligente e mais rentável a cada ciclo — sem você fazer mais nada.",
    icon: Rocket,
  },
];

export function HowItWorks() {
  return (
    <section id="processo" aria-label="Processo do Sistema KWF" className="py-8 md:py-12 px-5 md:px-10">
      <motion.div
        className="max-w-[900px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.p variants={fadeUp} className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold mb-3">
          Como funciona
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-2"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          Do Pré-Diagnóstico ao <span className="text-gold">Sistema de Aquisição KWF</span> implementado
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-8">
          Você não precisa entender de marketing, só precisa ter clareza e ver resultado.
        </motion.p>

        <div className="space-y-0">
          {steps.map((s, i) => (
            <motion.div key={s.num} variants={fadeLeft} className="flex gap-4 md:gap-7">
              <div className="hidden md:block w-[100px] shrink-0">
                <motion.div
                  className="rounded-lg h-[100px] w-[100px] flex items-center justify-center"
                  style={{ background: "rgba(205,160,102,0.08)", border: "1px solid rgba(205,160,102,0.20)" }}
                  whileHover={{ scale: 1.08, borderColor: "rgba(205,160,102,0.4)", boxShadow: "0 0 25px rgba(205,160,102,0.15)" }}
                >
                  <s.icon size={36} className="text-gold" strokeWidth={1.5} />
                </motion.div>
              </div>

              <div className="flex flex-col items-center">
                <motion.div
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-gold text-[13px] font-bold shrink-0"
                  style={{ background: "rgba(205,160,102,0.12)", border: "1px solid rgba(205,160,102,0.30)" }}
                  whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(205,160,102,0.3)" }}
                  whileInView={{ rotate: [0, 5, -5, 0] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                >
                  {s.num}
                </motion.div>
                {i < steps.length - 1 && (
                  <motion.div
                    className="w-px flex-1 my-2"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                )}
              </div>

              <div className={i < steps.length - 1 ? "pb-8 flex-1" : "pb-0 flex-1"}>
                <h3 className="text-foreground text-base md:text-lg font-bold tracking-[-0.01em] mb-1">{s.title}</h3>
                <p className="text-gold text-[13px] mb-1.5">{s.subtitle}</p>
                <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7]">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

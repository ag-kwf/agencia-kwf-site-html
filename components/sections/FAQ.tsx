'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeUp, stagger } from "@/lib/animations";
import { trackFAQOpen } from "@/lib/tracking";

const items = [
  {
    q: "Já tive agência e não funcionou. Por que seria diferente?",
    a: "Porque o problema não era a agência — era a falta de sistema. A KWF conecta cada real ao resultado num dashboard que você abre quando quiser. Não gerenciamos peças. Instalamos a operação inteira.",
  },
  {
    q: "Preciso entender de marketing?",
    a: "Não. O sistema roda sozinho. Você acompanha o dashboard e foca no seu negócio.",
  },
  {
    q: "Quanto tempo pra ver resultado?",
    a: "Sistema instalado em 30 dias. Leads entre 30–60 dias. Resultado previsível a partir de 60–90 dias.",
  },
  {
    q: "O diagnóstico tem algum custo?",
    a: "Não. 30 minutos de conversa. Você sai sabendo onde seu marketing vaza dinheiro — independente de qualquer decisão de contratação.",
  },
  {
    q: "Funciona pra qualquer empresa?",
    a: "O sistema KWF é pra empresas de serviço premium com faturamento entre R$100k e R$500k/mês que já investem em marketing mas não conseguem medir o retorno.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" aria-label="Dúvidas frequentes" className="py-8 md:py-12 px-5 md:px-10" style={{ background: "rgba(255,255,255,0.02)" }}>
      <motion.div
        className="max-w-[720px] mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          className="font-bold leading-[1.2] tracking-[-0.02em] text-foreground mb-8 text-center"
          style={{ fontSize: "clamp(20px, 3vw, 34px)", textWrap: "balance" }}
        >
          <span className="text-gold">Dúvidas</span> Frequentes
        </motion.h2>

        <div className="space-y-2">
          {items.map((item, i) => (
            <motion.div key={item.q} variants={fadeUp}>
              <motion.div
                className="rounded-xl overflow-hidden cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid rgba(255,255,255,${openIndex === i ? 0.14 : 0.08})`,
                }}
                onClick={() => {
                  const newIndex = openIndex === i ? null : i;
                  setOpenIndex(newIndex);
                  if (newIndex !== null) trackFAQOpen(item.q);
                }}
                whileHover={{ borderColor: "rgba(205,160,102,0.25)", boxShadow: "0 0 20px rgba(205,160,102,0.05)" }}
                layout
              >
                <div className="flex items-center justify-between p-4 md:p-5 gap-3">
                  <h3 className="text-foreground text-[14px] md:text-[15px] font-semibold">{item.q}</h3>
                  <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={18} className="text-muted-foreground shrink-0" />
                  </motion.div>
                </div>
                {/* Answers always in DOM for SEO. CSS hides when closed (crawlers read display:none content). */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openIndex === i ? "500px" : "0",
                    opacity: openIndex === i ? 1 : 0,
                  }}
                >
                  <p className="text-muted-foreground text-[13px] md:text-sm leading-[1.7] px-4 md:px-5 pb-4 md:pb-5">{item.a}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

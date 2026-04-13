'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AnimatedDock } from "@/components/ui/animated-dock";
import { fadeUp, fadeLeft, fadeRight, stagger, staggerFast } from "@/lib/animations";
import Image from "next/image";

const photos = [
  { src: "/images/photos/agencia_kwf_1.webp", alt: "Equipe Agência KWF" },
  { src: "/images/photos/agencia_kwf_2.webp", alt: "Agência KWF Eventos" },
];

const metrics = [
  { target: 20, prefix: "+R$", suffix: "M", label: "investidos em campanhas" },
  { target: 60, prefix: "+", suffix: "mil", label: "vendas realizadas" },
  { target: 80, prefix: "+R$", suffix: "M", label: "de faturamento no digital" },
];

export function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % photos.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <section id="sobre" aria-label="Sobre a Agência KWF" className="py-8 md:py-12 px-5 md:px-10">
      <motion.div
        className="max-w-[1100px] mx-auto"
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
          Conheça a <span className="text-gold">Agência KWF</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <motion.div variants={fadeLeft} className="relative">
            <div className="overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full aspect-square rounded-xl overflow-hidden relative"
                >
                  <Image
                    src={photos[currentSlide].src}
                    alt={photos[currentSlide].alt}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-foreground transition-colors"
              style={{ background: "rgba(15,15,15,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}
              whileHover={{ scale: 1.15, borderColor: "rgba(205,160,102,0.5)" }}
              whileTap={{ scale: 0.9 }}
              aria-label="Foto anterior"
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-foreground transition-colors"
              style={{ background: "rgba(15,15,15,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}
              whileHover={{ scale: 1.15, borderColor: "rgba(205,160,102,0.5)" }}
              whileTap={{ scale: 0.9 }}
              aria-label="Próxima foto"
            >
              <ChevronRight size={16} />
            </motion.button>

            <div className="flex justify-center gap-1.5 mt-3">
              {photos.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="w-2 h-2 rounded-full"
                  animate={{
                    background: i === currentSlide ? "#CDA066" : "rgba(255,255,255,0.15)",
                    scale: i === currentSlide ? 1.3 : 1,
                  }}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.2 }}
                  aria-label={`Ir para foto ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeRight}>
            <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-4">
              A Agência KWF trabalha com empresas tradicionais e digitais, onde percebemos um padrão: negócios sólidos, com produto bom estão perdendo receita e oportunidade por falta de sistema de aquisição.
            </p>
            <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-4">
              Por isso, pegamos as estratégias de aquisição mais validadas do mercado digital e as instalamos dentro de negócios tradicionais com um método claro.
            </p>
            <p className="text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] mb-8">
              O Sistema KWF combina estratégia, funil de aquisição, automações, IA e gestão de dados desenhada para gerar o máximo de previsibilidade de resultados.
            </p>

            <motion.div
              className="grid grid-cols-3 gap-3"
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {metrics.map((m) => (
                <motion.div key={m.label} variants={fadeUp} className="group">
                  <AnimatedCounter target={m.target} prefix={m.prefix} suffix={m.suffix} />
                  <p className="text-muted-foreground text-[11px] md:text-[12px] mt-1 group-hover:text-foreground transition-colors">
                    {m.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <AnimatedDock
                items={[
                  {
                    link: "https://www.instagram.com/agenciakwf/",
                    target: "_blank",
                    Icon: <Instagram size={22} />,
                  },
                  {
                    link: "https://www.linkedin.com/company/agenciakwf/",
                    target: "_blank",
                    Icon: <Linkedin size={22} />,
                  },
                  {
                    link: "https://www.youtube.com/@agenciakwf/",
                    target: "_blank",
                    Icon: <Youtube size={22} />,
                  },
                ]}
                className="w-fit"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

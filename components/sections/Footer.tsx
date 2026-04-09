'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { trackCTAClick } from "@/lib/tracking";

export function Footer() {
  return (
    <motion.footer
      role="contentinfo"
      className="px-5 md:px-10 pt-8 pb-6"
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
          <div>
            <Image src="/images/logo-kwf.webp" alt="Agência KWF" className="h-14 w-auto mb-1.5" width={56} height={56} loading="lazy" />
            <p className="text-muted-foreground text-[13px] leading-[1.7] max-w-[360px]">
              Sistemas de aquisição e receita previsível para empresas de serviço.
            </p>
            <p className="text-muted-foreground text-xs italic opacity-50 mt-1">Know What to Focus.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            <div>
              <p className="text-foreground text-sm font-semibold mb-2">Navegação</p>
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "Como funciona", href: "/#como-funciona" },
                  { label: "Resultados", href: "/#resultados" },
                  { label: "Blog", href: "/blog" },
                  { label: "Sobre", href: "/#sobre" },
                  { label: "Dúvidas", href: "/#faq" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors relative group"
                  >
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold mb-2">Ação</p>
              <a
                href="#diagnostico"
                onClick={() => trackCTAClick('footer', 'Pré-Diagnóstico Estratégico')}
                className="text-accent text-sm font-semibold hover:underline"
              >
                Pré-Diagnóstico Estratégico →
              </a>
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold mb-2">Legal</p>
              <div className="flex flex-col gap-1.5">
                <Link href="/politica-de-privacidade" className="text-muted-foreground text-sm hover:text-foreground transition-colors relative group">
                  Política de Privacidade
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link href="/termos-de-uso" className="text-muted-foreground text-sm hover:text-foreground transition-colors relative group">
                  Termos de Uso
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-muted-foreground text-xs opacity-50">
            © 2026 Agência KWF. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

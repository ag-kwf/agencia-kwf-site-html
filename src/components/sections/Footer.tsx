import { motion } from "framer-motion";
import logoKwf from "@/assets/logo-kwf.webp";

export function Footer() {
  return (
    <motion.footer
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
            <img src={logoKwf} alt="Agência KWF" className="h-14 w-auto mb-1.5" />
            <p className="text-muted-foreground text-[13px] leading-[1.7] max-w-[360px]">
              Sistemas de aquisição e receita previsível para empresas de serviço.
            </p>
            <p className="text-muted-foreground text-xs italic opacity-50 mt-1">Know What to Focus.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            <div>
              <p className="text-foreground text-sm font-semibold mb-2">Navegação</p>
              <div className="flex flex-col gap-1.5">
                {["Como funciona", "Resultados", "Sobre", "Dúvidas"].map((l) => (
                  <a
                    key={l}
                    href={`#${l === "Como funciona" ? "como-funciona" : l === "Dúvidas" ? "faq" : l.toLowerCase()}`}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors relative group"
                  >
                    {l}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold mb-2">Ação</p>
              <a href="#diagnostico" className="text-accent text-sm font-semibold hover:underline">
                Pré-Diagnóstico Estratégico →
              </a>
            </div>
            <div>
              <p className="text-foreground text-sm font-semibold mb-2">Legal</p>
              <div className="flex flex-col gap-1.5">
                <a href="/politica-privacidade" className="text-muted-foreground text-sm hover:text-foreground transition-colors relative group">
                  Política de Privacidade
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
                <a href="/termo-de-uso" className="text-muted-foreground text-sm hover:text-foreground transition-colors relative group">
                  Termo de Uso
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
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

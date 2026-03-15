import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
};

function Article({ number, title, subtitle, children }: { number: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <motion.section variants={fadeUp} className="mb-12">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-gold font-bold text-sm tracking-wider uppercase">{number}</span>
        <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
      </div>
      {subtitle && <p className="text-gold/80 text-sm font-medium mb-4 italic">{subtitle}</p>}
      <div className="text-muted-foreground text-sm leading-relaxed space-y-3 pl-0 md:pl-8">
        {children}
      </div>
    </motion.section>
  );
}

export default function TermoDeUso() {
  return (
    <div className="min-h-screen bg-background">
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-[60px] md:h-[68px] flex items-center"
        style={{
          background: "rgba(15,15,15,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)"
        }}
      >
        <div className="w-full max-w-[900px] mx-auto px-5 md:px-10 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-gold font-bold text-lg tracking-tight">KWF</span>
            <span className="text-muted-foreground text-[11px] font-medium uppercase tracking-[0.14em] hidden sm:inline">
              | Sistemas de Receita
            </span>
          </a>
          <a href="/" className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-1.5">
            <ArrowLeft size={14} />
            Voltar
          </a>
        </div>
      </nav>

      {/* Hero */}
      <motion.header
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="pt-[120px] pb-12 md:pt-[140px] md:pb-16 px-5"
      >
        <div className="max-w-[900px] mx-auto">
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
            <FileText size={14} className="text-gold" />
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.16em]">Legal & Transparência</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Termos de Uso
          </motion.h1>

          <motion.p variants={fadeUp} className="text-muted-foreground text-base md:text-lg mb-5" style={{ textWrap: "balance" }}>
            Regras claras desde o início. É assim que a <span className="text-gold font-medium">KWF</span> opera.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Badge variant="outline" className="text-xs border-gold/30 text-gold/90">
              Última atualização: 01 de março de 2026
            </Badge>
          </motion.div>
        </div>
      </motion.header>

      {/* Opening note */}
      <div className="px-5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-[900px] mx-auto rounded-lg p-6 mb-14"
          style={{
            background: "hsl(var(--glass-bg))",
            border: "1px solid hsl(var(--gold-border))"
          }}
        >
          <p className="text-foreground text-sm leading-relaxed">
            Este documento rege o uso do site www.agenciakwf.com.br e dos serviços da <span className="text-gold font-semibold">Agência KWF</span>. Ao navegar aqui, você concorda com o que está escrito abaixo. Se discordar de qualquer ponto, recomendamos não utilizar o site.
          </p>
        </motion.div>
      </div>

      {/* Articles */}
      <motion.main
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="max-w-[900px] mx-auto px-5 pb-20"
      >
        <Article number="ART. 1" title="Aceitação dos Termos" subtitle="Clareza não é só um pilar da metodologia. É como conduzimos cada relação.">
          <p>O acesso e uso deste site implicam a aceitação plena e irrestrita de todos os termos aqui estabelecidos. A <span className="text-gold font-medium">Agência KWF</span> pode atualizar este documento a qualquer momento. Quando isso acontecer, a data no topo desta página muda. Continuar usando o site após qualquer atualização equivale a aceitar as novas condições.</p>
        </Article>

        <Article number="ART. 2" title="Definições" subtitle="Para este documento, ficam estabelecidos os seguintes conceitos:">
          <ul className="list-disc list-inside space-y-1">
            <li><span className="text-foreground font-medium">Site:</span> o conjunto de páginas e funcionalidades disponíveis em www.agenciakwf.com.br e subdomínios associados.</li>
            <li><span className="text-foreground font-medium">KWF / Agência KWF:</span> prestadora de serviços de marketing digital e sistemas de receita, operada pelo seu fundador com sede em Angra dos Reis, RJ.</li>
            <li><span className="text-foreground font-medium">Usuário:</span> toda pessoa física ou jurídica que acessa qualquer funcionalidade deste site.</li>
            <li><span className="text-foreground font-medium">Serviços:</span> diagnósticos, consultorias e sistemas de marketing ofertados pela Agência KWF.</li>
            <li><span className="text-foreground font-medium">Conteúdo:</span> textos, imagens, vídeos, metodologias, frameworks e materiais disponibilizados no site.</li>
          </ul>
        </Article>

        <Article number="ART. 3" title="O que você pode fazer aqui" subtitle="Este site existe para uma coisa: conectar empresários de serviço premium com um sistema de marketing que gera resultado mensurável.">
          <p>Ao utilizá-lo, você está autorizado a:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Navegar e visualizar o conteúdo disponível;</li>
            <li>Entrar em contato via canais disponibilizados;</li>
            <li>Solicitar informações sobre os serviços oferecidos;</li>
            <li>Compartilhar links do site, mantendo a integridade do conteúdo.</li>
          </ul>
        </Article>

        <Article number="ART. 4" title="O que não é permitido" subtitle="Transparência funciona nos dois sentidos.">
          <p>É expressamente proibido:</p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>Reproduzir, copiar ou comercializar qualquer conteúdo sem autorização prévia da Agência KWF;</li>
            <li>Usar bots, scrapers ou qualquer meio automatizado para extração de conteúdo;</li>
            <li>Praticar atos que comprometam a segurança ou disponibilidade do site;</li>
            <li>Usar o site para fins ilícitos, difamatórios ou que violem direitos de terceiros;</li>
            <li>Reproduzir ou adaptar a metodologia, frameworks ou nomenclaturas da KWF sem autorização formal;</li>
            <li>Submeter informações falsas em formulários de contato ou qualificação.</li>
          </ul>
          <p>O descumprimento pode ensejar responsabilização civil e criminal.</p>
        </Article>

        <Article number="ART. 5" title="Propriedade Intelectual" subtitle="O Sistema KWF levou anos para ser construído. Não é open source.">
          <p>Todo o conteúdo deste site — textos, marca, metodologias, frameworks, layouts e material audiovisual — é propriedade da <span className="text-gold font-medium">Agência KWF</span> ou utilizado sob licença, protegido pela Lei nº 9.279/1996 e pela Lei nº 9.610/1998.</p>
          <p>A marca KWF, o Sistema KWF, a metodologia <span className="text-foreground font-medium">Clareza → Sistema → Aceleração</span> e o <span className="text-foreground font-medium">Funil Previsível de Aquisição</span> são ativos intelectuais protegidos. Qualquer uso não autorizado é passível de medidas legais. O acesso ao site não confere ao Usuário qualquer direito de propriedade sobre o que está aqui.</p>
        </Article>

        <Article number="ART. 6" title="Isenção de Responsabilidade" subtitle="Resultado vem de sistema implementado, não de leitura de site.">
          <p>A <span className="text-gold font-medium">Agência KWF</span> não se responsabiliza por:</p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>Resultados decorrentes da aplicação de informações do site sem contratação formal de serviços;</li>
            <li>Falhas técnicas ou indisponibilidade temporária por causas alheias ao seu controle;</li>
            <li>Decisões tomadas pelo Usuário com base no conteúdo informativo publicado;</li>
            <li>Danos resultantes de acesso indevido de terceiros a informações transmitidas por meios não seguros.</li>
          </ul>
          <p>O conteúdo aqui publicado tem caráter informativo e educacional. Resultados dependem de implementação, contexto do negócio e condições de mercado.</p>
        </Article>

        <Article number="ART. 7" title="Links Externos">
          <p>Este site pode conter links para páginas de terceiros. Esses links existem por conveniência. A <span className="text-gold font-medium">Agência KWF</span> não controla o conteúdo ou as práticas desses sites e não se responsabiliza por qualquer dano relacionado ao seu uso. Incluir um link não significa endosso ou recomendação.</p>
        </Article>

        <Article number="ART. 8" title="Limitação de Responsabilidade">
          <p>Na máxima extensão permitida pela lei, a <span className="text-gold font-medium">Agência KWF</span> não será responsável por danos indiretos, incidentais ou consequentes decorrentes do uso deste site. Qualquer responsabilidade reconhecida judicialmente estará limitada ao valor equivalente a um salário mínimo nacional na data do evento.</p>
        </Article>

        <Article number="ART. 9" title="Modificações">
          <p>Este documento pode ser revisado a qualquer momento. A data no topo indica a versão vigente. Recomendamos consulta periódica. O uso continuado do site após atualizações implica aceite das novas condições.</p>
        </Article>

        <Article number="ART. 10" title="Foro e Disposições Gerais">
          <p>Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de Angra dos Reis, Estado do Rio de Janeiro, para dirimir quaisquer controvérsias, com renúncia a qualquer outro, por mais privilegiado que seja.</p>
          <p>Caso qualquer disposição seja considerada inválida, as demais permanecem em plena vigência.</p>
          <p>Dúvidas? <a href="mailto:contato@agenciakwf.com.br" className="text-gold underline underline-offset-2">contato@agenciakwf.com.br</a></p>
        </Article>
      </motion.main>

      <footer className="border-t border-border py-10 px-5">
        <div className="max-w-[900px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} <span className="text-gold font-semibold">Agência KWF</span>. Todos os direitos reservados.</span>
          <a href="/" className="hover:text-foreground transition-colors">Voltar ao site</a>
        </div>
      </footer>
    </div>
  );
}

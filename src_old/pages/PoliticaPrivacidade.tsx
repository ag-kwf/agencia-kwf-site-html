import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
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

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
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
          <a
            href="/"
            className="text-muted-foreground text-sm hover:text-foreground transition-colors flex items-center gap-1.5"
          >
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
            <Shield size={14} className="text-gold" />
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.16em]">Legal & Privacidade</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Política de Privacidade
          </motion.h1>

          <motion.p variants={fadeUp} className="text-muted-foreground text-base md:text-lg mb-5" style={{ textWrap: "balance" }}>
            Seus dados têm dono. Esse dono é <span className="text-foreground font-medium">você</span>.
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
            A <span className="text-gold font-semibold">Agência KWF</span> está comprometida com a proteção dos seus dados pessoais, em conformidade com a Lei nº 13.709/2018 (LGPD). Este documento descreve exatamente o que coletamos, para que usamos e como protegemos suas informações.
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
        <Article number="ART. 1" title="Quem é responsável pelos seus dados" subtitle="Você sabe com quem está falando. Aqui também.">
          <p>O controlador dos dados coletados por este site é a <span className="text-gold font-medium">Agência KWF</span>, com sede em Angra dos Reis, Rio de Janeiro, operada pelo seu fundador e responsável técnico.</p>
          <p>Para exercer qualquer direito relacionado aos seus dados: <a href="mailto:privacidade@agenciakwf.com.br" className="text-gold underline underline-offset-2">privacidade@agenciakwf.com.br</a></p>
        </Article>

        <Article number="ART. 2" title="O que coletamos" subtitle="Só coletamos o que é necessário para operar com qualidade.">
          <p className="text-foreground font-medium text-xs uppercase tracking-wider mb-1">Dados que você fornece diretamente:</p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Nome completo;</li>
            <li>E-mail;</li>
            <li>Telefone ou WhatsApp;</li>
            <li>Nome e segmento da empresa;</li>
            <li>Faturamento estimado (quando informado voluntariamente);</li>
            <li>Mensagens enviadas via formulários de contato ou qualificação.</li>
          </ul>
          <p className="text-foreground font-medium text-xs uppercase tracking-wider mb-1">Dados coletados automaticamente:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Endereço IP e geolocalização aproximada;</li>
            <li>Dispositivo, sistema operacional e navegador;</li>
            <li>Páginas visitadas, tempo de navegação e cliques;</li>
            <li>Parâmetros de origem de acesso (UTMs);</li>
            <li>Cookies e tecnologias similares.</li>
          </ul>
        </Article>

        <Article number="ART. 3" title="Para que usamos seus dados" subtitle="Dado sem finalidade é ruído. Cada informação aqui tem uma razão.">
          <p>Seus dados são utilizados para:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Responder contatos e pedidos de diagnóstico ou proposta;</li>
            <li>Qualificar o interesse nos serviços da Agência KWF;</li>
            <li>Enviar comunicações sobre os serviços contratados;</li>
            <li>Enviar conteúdo educativo e novidades sobre a metodologia KWF (mediante consentimento);</li>
            <li>Analisar o comportamento de navegação para melhoria do site;</li>
            <li>Mensurar efetividade de campanhas de marketing;</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
          </ul>
        </Article>

        <Article number="ART. 4" title="Base legal (LGPD)" subtitle="Nada aqui acontece sem fundamento legal. Esse é o padrão mínimo que respeitamos.">
          <p>O tratamento dos dados está fundamentado nas seguintes bases do art. 7º da LGPD:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><span className="text-foreground font-medium">Consentimento (I):</span> envio de marketing, newsletters e conteúdo educativo;</li>
            <li><span className="text-foreground font-medium">Execução de contrato (V):</span> gestão da relação comercial com clientes e parceiros;</li>
            <li><span className="text-foreground font-medium">Legítimo interesse (IX):</span> análise de navegação, melhoria do site e prospecção qualificada;</li>
            <li><span className="text-foreground font-medium">Obrigação legal (II):</span> atendimento de requisitos fiscais e regulatórios.</li>
          </ul>
        </Article>

        <Article number="ART. 5" title="Compartilhamento de dados" subtitle="Seus dados não estão à venda. Nunca estiveram.">
          <p>A <span className="text-gold font-medium">Agência KWF</span> não vende, aluga ou cede dados pessoais a terceiros para fins comerciais. O compartilhamento ocorre apenas em três situações:</p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li><span className="text-foreground font-medium">Parceiros operacionais:</span> plataformas de CRM, automação, analytics e campanhas (Meta Ads, Google Ads e similares), mediante contratos que garantam a proteção dos dados;</li>
            <li><span className="text-foreground font-medium">Exigência legal ou judicial:</span> quando determinado por autoridade competente;</li>
            <li><span className="text-foreground font-medium">Proteção de direitos:</span> para exercício regular de direitos da KWF em processos judiciais ou administrativos.</li>
          </ul>
          <p>Todos os parceiros seguem o mesmo nível de proteção exigido por esta Política e pela LGPD.</p>
        </Article>

        <Article number="ART. 6" title="Cookies" subtitle="Cookies existem para o site funcionar melhor. Não para te vigiar.">
          <p>Utilizamos quatro tipos:</p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li><span className="text-foreground font-medium">Essenciais:</span> necessários para o funcionamento básico. Não podem ser desativados.</li>
            <li><span className="text-foreground font-medium">Analíticos:</span> medem desempenho e comportamento de navegação (ex.: Google Analytics).</li>
            <li><span className="text-foreground font-medium">Marketing:</span> rastreiam visitas para exibição de anúncios relevantes (ex.: Meta Pixel, Google Ads).</li>
            <li><span className="text-foreground font-medium">Preferências:</span> lembram configurações escolhidas pelo Usuário.</li>
          </ul>
          <p>Você pode gerenciar ou desativar cookies pelas configurações do seu navegador. Desativar cookies essenciais pode comprometer o funcionamento do site.</p>
        </Article>

        <Article number="ART. 7" title="Por quanto tempo guardamos seus dados" subtitle="Dado sem prazo é dado que virou problema. Temos prazos definidos.">
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li><span className="text-foreground font-medium">Leads e prospects:</span> até 24 meses após o último contato;</li>
            <li><span className="text-foreground font-medium">Clientes ativos:</span> durante o contrato e por até 5 anos após encerramento;</li>
            <li><span className="text-foreground font-medium">Dados de navegação e cookies analíticos:</span> até 26 meses;</li>
            <li><span className="text-foreground font-medium">Dados com obrigação legal (fiscal, contábil):</span> conforme legislação aplicável.</li>
          </ul>
          <p>Após o vencimento dos prazos, os dados são eliminados ou anonimizados.</p>
        </Article>

        <Article number="ART. 8" title="Como protegemos seus dados" subtitle="Segurança não é diferencial. É obrigação.">
          <p>A <span className="text-gold font-medium">Agência KWF</span> adota as seguintes medidas:</p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li>Transmissão via HTTPS (criptografia SSL/TLS);</li>
            <li>Acesso restrito a colaboradores e parceiros autorizados;</li>
            <li>Uso de plataformas com políticas de segurança reconhecidas;</li>
            <li>Revisão periódica das práticas de segurança.</li>
          </ul>
          <p>Em caso de incidente que possa causar risco relevante ao titular, comunicaremos a ocorrência à ANPD e aos titulares afetados, conforme exigido pela LGPD.</p>
        </Article>

        <Article number="ART. 9" title="Seus direitos" subtitle="A lei garante. A KWF respeita.">
          <p>Nos termos do art. 18 da LGPD, você tem direito a:</p>
          <ul className="list-disc list-inside space-y-1 mb-3">
            <li><span className="text-foreground font-medium">Confirmação e acesso:</span> saber se seus dados são tratados e solicitar cópia;</li>
            <li><span className="text-foreground font-medium">Correção:</span> atualizar dados incompletos, inexatos ou desatualizados;</li>
            <li><span className="text-foreground font-medium">Eliminação:</span> excluir dados desnecessários ou tratados em desconformidade;</li>
            <li><span className="text-foreground font-medium">Portabilidade:</span> receber seus dados em formato estruturado;</li>
            <li><span className="text-foreground font-medium">Revogação do consentimento:</span> retirar o consentimento a qualquer momento;</li>
            <li><span className="text-foreground font-medium">Oposição:</span> opor-se ao tratamento baseado em legítimo interesse;</li>
            <li><span className="text-foreground font-medium">Informação:</span> saber com quais parceiros seus dados foram compartilhados;</li>
            <li><span className="text-foreground font-medium">Revisão de decisão automatizada:</span> solicitar revisão de decisões baseadas em tratamento automático.</li>
          </ul>
          <p>Para exercer qualquer direito: <a href="mailto:privacidade@agenciakwf.com.br" className="text-gold underline underline-offset-2">privacidade@agenciakwf.com.br</a> — resposta em até 15 dias úteis.</p>
        </Article>

        <Article number="ART. 10" title="Transferência internacional">
          <p>Algumas ferramentas que utilizamos operam em servidores fora do Brasil (EUA, Europa), especialmente para analytics, automação e gestão de campanhas. Nesses casos, a transferência ocorre apenas para países ou organizações com grau de proteção equivalente ao da LGPD, ou mediante cláusulas contratuais específicas.</p>
        </Article>

        <Article number="ART. 11" title="Encarregado de Dados (DPO)">
          <p>O responsável pelo tratamento e ponto de contato para assuntos de privacidade é o fundador da <span className="text-gold font-medium">Agência KWF</span>.</p>
          <p>Contato: <a href="mailto:privacidade@agenciakwf.com.br" className="text-gold underline underline-offset-2">privacidade@agenciakwf.com.br</a></p>
          <p>Prazo de resposta: até 15 dias úteis.</p>
        </Article>

        <Article number="ART. 12" title="Atualizações">
          <p>Esta Política pode mudar. Quando mudar, a data no topo desta página reflete a versão atual. Em alterações substanciais, comunicaremos por e-mail ou aviso em destaque no site. O uso continuado implica aceite da versão vigente.</p>
          <p className="mt-4 text-xs text-muted-foreground/60">Esta Política foi elaborada em conformidade com a Lei nº 13.709/2018 (LGPD) e normas da Autoridade Nacional de Proteção de Dados (ANPD).</p>
        </Article>
      </motion.main>

      {/* Footer */}
      <footer className="border-t border-border py-10 px-5">
        <div className="max-w-[900px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} <span className="text-gold font-semibold">Agência KWF</span>. Todos os direitos reservados.</span>
          <a href="/" className="hover:text-foreground transition-colors">Voltar ao site</a>
        </div>
      </footer>
    </div>
  );
}

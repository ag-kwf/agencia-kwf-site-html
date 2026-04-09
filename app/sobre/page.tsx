import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre a Agência KWF — Quem Somos e Como Trabalhamos',
  description: 'Conheça a Agência KWF: +6 anos de experiência, +R$19M investidos em campanhas, metodologia Sistema KWF (Clareza → Sistema → Aceleração). Angra dos Reis/RJ, atendimento nacional.',
  alternates: { canonical: 'https://agenciakwf.com.br/sobre' },
  openGraph: {
    title: 'Sobre a Agência KWF',
    description: 'Instalamos sistemas de aquisição de clientes em empresas de serviço premium. Conheça nossa metodologia e resultados.',
    url: 'https://agenciakwf.com.br/sobre',
    siteName: 'Agência KWF',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://agenciakwf.com.br/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function SobrePage() {
  return (
    <main className="pt-[100px] md:pt-[130px] pb-20 px-5 md:px-10">
      <article className="max-w-[800px] mx-auto">
        <h1
          className="font-bold leading-[1.1] tracking-[-0.03em] text-foreground mb-8"
          style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}
        >
          Sobre a <span className="text-gold">Agência KWF</span>
        </h1>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">O que é a Agência KWF</h2>
          <p className="text-muted-foreground text-[15px] leading-[1.8] mb-4">
            A Agência KWF é uma integradora de sistemas de receita fundada em 2020, com mais de 6 anos de experiência no mercado de marketing digital para empresas de serviço premium. Diferente de uma agência tradicional que entrega posts e anúncios isolados, a KWF instala operações completas de aquisição de clientes — da captação ao fechamento — com metodologia própria, processo integrado e inteligência artificial aplicada em cada etapa.
          </p>
          <p className="text-muted-foreground text-[15px] leading-[1.8]">
            Com sede em Angra dos Reis, no Rio de Janeiro, a agência atende empresas de todo o Brasil de forma 100% remota. O atendimento é nacional, com processos desenhados para funcionar independente de localização geográfica.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">O problema que resolvemos</h2>
          <p className="text-muted-foreground text-[15px] leading-[1.8]">
            Empresas de serviço premium investem em marketing sem saber se funciona. O marketing é fragmentado — um fornecedor cuida dos anúncios, outro do site, outro das redes sociais — e nenhum deles se responsabiliza pelo resultado final. Não existe conexão entre investimento e receita, não existe previsibilidade. O empresário dirige no escuro, sem dashboard, sem KPIs claros, sem saber se está crescendo ou estagnando. A KWF resolve isso instalando um sistema integrado onde cada real investido é rastreável até o cliente gerado.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Metodologia — Sistema KWF</h2>
          <p className="text-muted-foreground text-[15px] leading-[1.8] mb-4">
            O Sistema KWF é uma metodologia cíclica composta por três pilares que se retroalimentam continuamente: Clareza, Sistema e Aceleração.
          </p>
          <p className="text-muted-foreground text-[15px] leading-[1.8] mb-4">
            O primeiro pilar, <strong className="text-foreground">Clareza</strong>, começa com o Diagnóstico Raio-X — uma análise profunda de 8 elementos estratégicos do negócio que responde três perguntas essenciais: onde o dinheiro está vazando, para quem a empresa deve vender e o que precisa mudar imediatamente.
          </p>
          <p className="text-muted-foreground text-[15px] leading-[1.8] mb-4">
            O segundo pilar, <strong className="text-foreground">Sistema</strong>, é a construção do Funil Previsível de Aquisição em 5 etapas — Aquisição, Aquecimento, Ação, Ativação e Ampliação — acompanhado de um Centro Operacional com IA integrada que automatiza processos e qualifica leads em tempo real.
          </p>
          <p className="text-muted-foreground text-[15px] leading-[1.8]">
            O terceiro pilar, <strong className="text-foreground">Aceleração</strong>, é a otimização contínua do sistema com dados reais: testes A/B semanais, strategy calls mensais e dashboard em tempo real. A cada ciclo, o sistema fica mais inteligente e mais rentável.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Para quem trabalhamos</h2>
          <p className="text-muted-foreground text-[15px] leading-[1.8]">
            O público-alvo da Agência KWF são empresas de serviço premium que faturam entre R$150 mil e R$500 mil por mês e que já investem em marketing mas não conseguem conectar esse investimento à geração de clientes de forma previsível. Isso inclui clínicas médicas, escritórios de advocacia, contabilidade e arquitetura, escolas de ensino premium e indústrias. São negócios sólidos, com produto comprovado, que precisam de um sistema para escalar a aquisição de clientes com clareza e dados.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Diferenciais</h2>
          <p className="text-muted-foreground text-[15px] leading-[1.8]">
            A KWF se diferencia por quatro aspectos fundamentais: uma metodologia própria validada em dezenas de operações, a aplicação de inteligência artificial não como feature de marketing mas como infraestrutura operacional integrada ao processo, um processo que conecta todas as etapas da captação ao fechamento sem lacunas, e um dashboard que rastreia cada real investido do primeiro clique até o cliente gerado — eliminando o achismo e substituindo por dados.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Resultados</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-gold text-[28px] md:text-[32px] font-bold">+R$20M</p>
              <p className="text-muted-foreground text-[13px]">investidos em campanhas</p>
            </div>
            <div className="text-center">
              <p className="text-gold text-[28px] md:text-[32px] font-bold">+60mil</p>
              <p className="text-muted-foreground text-[13px]">vendas realizadas</p>
            </div>
            <div className="text-center">
              <p className="text-gold text-[28px] md:text-[32px] font-bold">+R$80M</p>
              <p className="text-muted-foreground text-[13px]">faturamento no digital</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Produtos e serviços</h2>
          <p className="text-muted-foreground text-[15px] leading-[1.8] mb-4">
            A KWF oferece quatro modalidades de serviço. O <strong className="text-foreground">Starter System</strong> é um diagnóstico completo com blueprint estratégico, ideal para empresas que querem clareza antes de qualquer investimento. O <strong className="text-foreground">Growth Lite</strong> é a fundação do sistema de aquisição com operação parcial em formato de retainer mensal.
          </p>
          <p className="text-muted-foreground text-[15px] leading-[1.8]">
            A oferta principal é o <strong className="text-foreground">Growth System</strong>: instalação e operação completa do sistema de aquisição, com setup inicial mais retainer mensal. Para empresas que desejam delegar 100% da operação, existe o <strong className="text-foreground">Scale System</strong>, que inclui operação done-for-you, ferramentas inclusas e consultoria 1-on-1.
          </p>
        </section>
      </article>
    </main>
  );
}

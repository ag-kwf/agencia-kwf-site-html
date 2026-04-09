export function SchemaMarkup() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://agenciakwf.com.br/#organization',
    name: 'Agência KWF',
    url: 'https://agenciakwf.com.br',
    logo: {
      '@type': 'ImageObject',
      url: 'https://agenciakwf.com.br/images/logo-kwf.webp',
    },
    description: 'Instalamos sistemas de aquisição de clientes em empresas de serviço premium. Metodologia, processo e inteligência artificial da captação ao fechamento.',
    foundingDate: '2020',
    areaServed: { '@type': 'Country', name: 'Brasil' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Angra dos Reis',
      addressRegion: 'RJ',
      addressCountry: 'BR',
    },
    sameAs: [],
    knowsAbout: [
      'Marketing Digital',
      'Sistema de Aquisição de Clientes',
      'Inteligência Artificial aplicada a Marketing',
      'Funil de Vendas',
      'Automação de Marketing',
    ],
  };

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://agenciakwf.com.br/#business',
    name: 'Agência KWF',
    url: 'https://agenciakwf.com.br',
    description: 'Agência especializada em sistemas de aquisição de clientes e receita previsível para empresas de serviço premium.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Angra dos Reis',
      addressRegion: 'RJ',
      addressCountry: 'BR',
    },
    priceRange: '$$$',
    areaServed: { '@type': 'Country', name: 'Brasil' },
    parentOrganization: { '@id': 'https://agenciakwf.com.br/#organization' },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://agenciakwf.com.br/#website',
    name: 'Agência KWF',
    url: 'https://agenciakwf.com.br',
    description: 'Sistemas de aquisição e receita previsível para empresas de serviço premium.',
    inLanguage: 'pt-BR',
    publisher: { '@id': 'https://agenciakwf.com.br/#organization' },
  };

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Sistema de Aquisição de Clientes KWF',
    provider: { '@id': 'https://agenciakwf.com.br/#organization' },
    description: 'Sistema completo de aquisição de clientes para empresas de serviço premium — diagnóstico, instalação e operação com metodologia, processo e IA da captação ao fechamento.',
    areaServed: { '@type': 'Country', name: 'Brasil' },
    serviceType: 'Marketing Digital Integrado',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sistemas KWF',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Growth System',
            description: 'Instalação e operação do sistema de aquisição de clientes com metodologia, processo e inteligência em cada etapa.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Starter System',
            description: 'Diagnóstico completo e blueprint estratégico para instalação do sistema de aquisição.',
          },
        },
      ],
    },
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Já tive agência e não funcionou. Por que seria diferente?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Porque o problema não era a agência — era a falta de sistema. A KWF conecta cada real ao resultado num dashboard que você abre quando quiser. Não gerenciamos peças. Instalamos a operação inteira.',
        },
      },
      {
        '@type': 'Question',
        name: 'Preciso entender de marketing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Não. O sistema roda sozinho. Você acompanha o dashboard e foca no seu negócio.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quanto tempo pra ver resultado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sistema instalado em 30 dias. Leads entre 30–60 dias. Resultado previsível a partir de 60–90 dias.',
        },
      },
      {
        '@type': 'Question',
        name: 'O diagnóstico tem algum custo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Não. 30 minutos de conversa. Você sai sabendo onde seu marketing vaza dinheiro — independente de qualquer decisão de contratação.',
        },
      },
      {
        '@type': 'Question',
        name: 'Funciona pra qualquer empresa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'O sistema KWF é pra empresas de serviço premium com faturamento entre R$100k e R$500k/mês que já investem em marketing mas não conseguem medir o retorno.',
        },
      },
    ],
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://agenciakwf.com.br' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}

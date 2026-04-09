import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SchemaMarkup } from '@/components/schema-markup';
import { GTMHead, GTMBody } from '@/components/gtm';
import { UTMCapture } from '@/components/utm-capture';
import { ScrollTracker } from '@/components/scroll-tracker';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Agência KWF — Sistemas de Aquisição e Receita Previsível para Empresas de Serviço',
    template: '%s — Agência KWF',
  },
  description: 'Transforme seu marketing em um sistema de aquisição de clientes previsível. Metodologia, processo e inteligência artificial da captação ao fechamento. Diagnóstico em 10 minutos.',
  keywords: [
    'sistema de aquisição de clientes',
    'receita previsível',
    'marketing para empresas de serviço',
    'agência de marketing digital',
    'sistema de receita',
    'funil de vendas previsível',
    'marketing com IA',
    'diagnóstico de marketing',
    'ROI de marketing',
    'marketing para clínicas',
    'marketing para escritórios',
  ],
  authors: [{ name: 'Agência KWF' }],
  creator: 'Agência KWF',
  publisher: 'Agência KWF',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://agenciakwf.com.br',
  },
  openGraph: {
    title: 'Agência KWF — Sistemas de Aquisição e Receita Previsível',
    description: 'Seu marketing gera relatório de likes ou gera clientes? Instalamos sistemas de aquisição com metodologia, processo e IA. Diagnóstico em 10 minutos.',
    url: 'https://agenciakwf.com.br',
    siteName: 'Agência KWF',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://agenciakwf.com.br/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Agência KWF — Sistemas de Aquisição e Receita Previsível',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agência KWF — Sistemas de Aquisição e Receita Previsível',
    description: 'Instalamos sistemas de aquisição de clientes em empresas de serviço premium. Diagnóstico em 10 minutos.',
    images: ['https://agenciakwf.com.br/og-image.jpg'],
  },
  other: {
    'geo.region': 'BR-RJ',
    'geo.placename': 'Angra dos Reis',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        {/* deploy-test-v1 */}
        <GTMHead />
        <SchemaMarkup />
      </head>
      <body className="font-sans">
        <GTMBody />
        <UTMCapture />
        <ScrollTracker />
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

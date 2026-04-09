import type { Metadata } from 'next';
import { PoliticaPrivacidadeContent } from './content';

export const metadata: Metadata = {
  title: 'Política de Privacidade — Agência KWF',
  description: 'Política de privacidade e proteção de dados da Agência KWF conforme LGPD.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://agenciakwf.com.br/politica-de-privacidade' },
};

export default function PoliticaPrivacidadePage() {
  return <PoliticaPrivacidadeContent />;
}

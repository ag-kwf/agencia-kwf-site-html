import type { Metadata } from 'next';
import { TermosDeUsoContent } from './content';

export const metadata: Metadata = {
  title: 'Termos de Uso — Agência KWF',
  description: 'Termos e condições de uso do site da Agência KWF.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://agenciakwf.com.br/termos-de-uso' },
};

export default function TermosDeUsoPage() {
  return <TermosDeUsoContent />;
}

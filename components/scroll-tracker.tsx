'use client';

import { useEffect, useRef } from 'react';
import { trackSectionView } from '@/lib/tracking';

const TRACKED_SECTIONS = [
  'hero',
  'problemas',
  'resultados',
  'como-funciona',
  'processo',
  'diagnostico',
  'faq',
  'sobre',
];

export function ScrollTracker() {
  const trackedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !trackedRef.current.has(entry.target.id)) {
            trackedRef.current.add(entry.target.id);
            trackSectionView(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    TRACKED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

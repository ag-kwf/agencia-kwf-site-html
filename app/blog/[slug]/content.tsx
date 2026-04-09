'use client';

import { useEffect } from 'react';
import { trackPostView } from '@/lib/tracking';

interface Props {
  content: string;
  slug: string;
}

export function BlogPostContent({ content, slug }: Props) {
  useEffect(() => {
    trackPostView(slug, document.title, '');
  }, [slug]);

  return (
    <div
      className="prose prose-invert max-w-none
        prose-headings:text-foreground prose-headings:font-bold
        prose-h2:text-[28px] prose-h2:mt-12 prose-h2:mb-4
        prose-h3:text-[22px] prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-muted-foreground prose-p:text-[17px] prose-p:leading-[1.8]
        prose-a:text-gold prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground
        prose-blockquote:border-l-[3px] prose-blockquote:border-gold prose-blockquote:pl-5 prose-blockquote:italic prose-blockquote:text-muted-foreground
        prose-li:text-muted-foreground
        prose-code:bg-[rgba(255,255,255,0.06)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-hr:border-[rgba(255,255,255,0.08)]
        prose-img:rounded-lg
      "
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

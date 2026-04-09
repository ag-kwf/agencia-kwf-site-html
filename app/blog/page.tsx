import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Blog — Agência KWF | Marketing, Sistemas de Receita e IA',
  description: 'Artigos sobre sistema de aquisição de clientes, receita previsível, marketing para empresas de serviço e inteligência artificial aplicada a negócios.',
  alternates: { canonical: 'https://agenciakwf.com.br/blog' },
  openGraph: {
    title: 'Blog — Agência KWF',
    description: 'Artigos sobre sistema de aquisição de clientes, receita previsível e IA aplicada.',
    url: 'https://agenciakwf.com.br/blog',
    siteName: 'Agência KWF',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://agenciakwf.com.br/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="pt-[100px] md:pt-[130px] pb-20 px-5 md:px-10">
      <div className="max-w-[1100px] mx-auto">
        <h1
          className="font-bold leading-[1.1] tracking-[-0.03em] text-foreground mb-4"
          style={{ fontSize: "clamp(24px, 3.5vw, 40px)" }}
        >
          Blog
        </h1>
        <p className="text-muted-foreground text-[15px] leading-[1.7] mb-10 max-w-[600px]">
          Artigos sobre sistema de aquisição de clientes, receita previsível e inteligência artificial aplicada a negócios.
        </p>

        {posts.length === 0 ? (
          <div
            className="rounded-xl p-10 text-center"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p className="text-muted-foreground text-[15px] leading-[1.7]">
              Em breve: artigos sobre sistema de receita, marketing e IA.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {post.image && (
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  {post.category && (
                    <span className="inline-block text-gold text-[11px] font-semibold uppercase tracking-[0.1em] mb-2">
                      {post.category}
                    </span>
                  )}
                  <h2 className="text-foreground text-lg font-bold mb-2 group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-[14px] leading-[1.6] mb-3 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3 text-muted-foreground text-xs">
                    <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('pt-BR')}</time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

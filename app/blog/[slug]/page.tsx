import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPostContent } from './content';

export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Blog Agência KWF`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: { canonical: `https://agenciakwf.com.br/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://agenciakwf.com.br/blog/${post.slug}`,
      siteName: 'Agência KWF',
      locale: 'pt_BR',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: [post.author],
      images: post.image ? [{ url: `https://agenciakwf.com.br${post.image}`, width: 1200, height: 630, alt: post.imageAlt }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [`https://agenciakwf.com.br${post.image}`] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image ? `https://agenciakwf.com.br${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      '@type': 'Organization',
      name: 'Agência KWF',
      url: 'https://agenciakwf.com.br',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Agência KWF',
      logo: {
        '@type': 'ImageObject',
        url: 'https://agenciakwf.com.br/images/logo-kwf.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://agenciakwf.com.br/blog/${post.slug}`,
    },
    inLanguage: 'pt-BR',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://agenciakwf.com.br' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenciakwf.com.br/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://agenciakwf.com.br/blog/${post.slug}` },
    ],
  };

  return (
    <main className="pt-[100px] md:pt-[130px] pb-20 px-5 md:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="max-w-[720px] mx-auto">
        <nav className="flex items-center gap-2 text-muted-foreground text-xs mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Início</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground">{post.title}</span>
        </nav>

        {post.category && (
          <span className="inline-block text-gold text-[11px] font-semibold uppercase tracking-[0.1em] mb-3">
            {post.category}
          </span>
        )}

        <h1
          className="font-bold leading-[1.15] tracking-[-0.02em] text-foreground mb-4"
          style={{ fontSize: "clamp(24px, 3.5vw, 36px)" }}
        >
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-muted-foreground text-sm mb-8">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('pt-BR')}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        {post.image && (
          <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-10">
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
        )}

        <BlogPostContent content={post.content} slug={post.slug} />

        <div
          className="rounded-xl p-8 text-center mt-16"
          style={{
            background: "rgba(205,160,102,0.04)",
            border: "1px solid rgba(205,160,102,0.18)",
          }}
        >
          <p className="text-foreground text-lg font-bold mb-2">Quer saber onde seu marketing está vazando?</p>
          <p className="text-muted-foreground text-sm mb-4">Faça o pré-diagnóstico gratuito em 10 minutos.</p>
          <a
            href="/#diagnostico"
            className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground text-[13px] font-semibold uppercase tracking-[0.05em] px-8 py-3.5 hover:bg-green-hover transition-all"
          >
            Quero fazer o diagnóstico
          </a>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="max-w-[1100px] mx-auto mt-20">
          <h2 className="text-xl font-bold text-foreground mb-6">Outros artigos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="group rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="p-5">
                  <h3 className="text-foreground font-bold mb-2 group-hover:text-gold transition-colors">{rp.title}</h3>
                  <p className="text-muted-foreground text-[13px] line-clamp-2">{rp.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

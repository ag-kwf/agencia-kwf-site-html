import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `https://agenciakwf.com.br/blog/${slug}`;
  const imageUrl = post.image
    ? `https://agenciakwf.com.br${post.image}`
    : 'https://agenciakwf.com.br/og-image.jpg';

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: 'Agência KWF',
      locale: 'pt_BR',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: imageUrl, alt: post.imageAlt || post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const postUrl = `https://agenciakwf.com.br/blog/${slug}`;

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://agenciakwf.com.br',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Agência KWF',
      url: 'https://agenciakwf.com.br',
      logo: { '@type': 'ImageObject', url: 'https://agenciakwf.com.br/favicon.ico' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    keywords: post.tags.join(', '),
    ...(post.image && { image: `https://agenciakwf.com.br${post.image}` }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://agenciakwf.com.br' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://agenciakwf.com.br/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="pt-[100px] md:pt-[130px] pb-20 px-5 md:px-10">
        <div className="max-w-[780px] mx-auto">
          <nav
            className="flex items-center gap-2 text-xs text-muted-foreground mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1">{post.title}</span>
          </nav>

          <header className="mb-10">
            {post.category && (
              <span className="inline-block text-gold text-[11px] font-semibold uppercase tracking-[0.1em] mb-3">
                {post.category}
              </span>
            )}
            <h1
              className="font-bold leading-[1.15] tracking-[-0.03em] text-foreground mb-4"
              style={{ fontSize: 'clamp(24px, 3.5vw, 42px)' }}
            >
              {post.title}
            </h1>
            <p className="text-muted-foreground text-[16px] leading-[1.7] mb-5">
              {post.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-[13px]">
              <span>{post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
          </header>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-1 rounded-full text-muted-foreground"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <article
            className="
              prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:text-[1.45rem] prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-[1.15rem] prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-[1.85]
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-gold prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-gold prose-blockquote:text-muted-foreground prose-blockquote:not-italic
              prose-li:text-muted-foreground prose-li:leading-[1.7]
              prose-hr:border-white/10
              prose-code:text-gold prose-code:bg-white/5 prose-code:rounded prose-code:px-1
            "
          >
            <MDXRemote source={post.content} />
          </article>

          <div className="mt-14 pt-8 border-t border-white/10">
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Voltar para o Blog
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

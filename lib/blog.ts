import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  published: boolean;
  content: string;
  readingTime: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min de leitura`;
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx') && !f.startsWith('_'));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      updatedAt: data.updatedAt,
      author: data.author || 'Agência KWF',
      category: data.category || '',
      tags: data.tags || [],
      image: data.image || '',
      imageAlt: data.imageAlt || '',
      published: data.published !== false,
      content,
      readingTime: getReadingTime(content),
    } satisfies Post;
  });

  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  if (data.published === false) return null;

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    updatedAt: data.updatedAt,
    author: data.author || 'Agência KWF',
    category: data.category || '',
    tags: data.tags || [],
    image: data.image || '',
    imageAlt: data.imageAlt || '',
    published: true,
    content,
    readingTime: getReadingTime(content),
  };
}

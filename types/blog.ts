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

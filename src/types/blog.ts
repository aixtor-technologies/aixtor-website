export type BlogAuthor = {
  name: string;
  role?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTimeMinutes: number;
  author: BlogAuthor;
  contentHtml: string;
};

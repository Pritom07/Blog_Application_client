export type Post = {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  isFeatured?: boolean;
  tags: string[];
  views?: number;
  _count: { comments: number };
};

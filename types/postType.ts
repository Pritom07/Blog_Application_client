export type Post = {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  isFeatured?: boolean;
  status: string;
  tags: string[];
  views?: number;
  created_At: string;
  updated_At: string;
  _count: { comments: number };
};

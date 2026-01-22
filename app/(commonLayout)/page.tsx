import BlogCard from "@/components/modules/blogs/blogCard";
import { blogPost } from "@/services/blogPost.service";
import { Post } from "@/types/postType";

export default async function Home() {
  const { data } = await blogPost.getAllPosts(
    {
      // tags: "Next,Level,web",
      // isFeatured: true,
    },
    {
      // cache:"no-store",
      revalidate: 10,
    },
  );
  const posts = data.data;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 max-w-7xl mx-auto">
      {posts.map((post: Post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}

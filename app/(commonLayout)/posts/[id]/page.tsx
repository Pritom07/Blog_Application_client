import { PostDetailsCard } from "@/components/modules/blogs/postDetailsCard";
import { blogPost } from "@/services/blogPost.service";
import { Post } from "@/types/postType";

//// pre-render as static only 3 (SSG) and remaining all others are SSR
export async function generateStaticParams() {
  const { data } = await blogPost.getAllPosts({}, {});
  const posts = data.data;

  if (posts === null) return [];

  return posts
    .map((post: Post) => ({
      id: post.id,
    }))
    .slice(0, 3);
}

const Detail_Post_Page = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await blogPost.getPostById(id);
  const postData = data.data;

  if (postData === null) return {};

  return (
    <div>
      <PostDetailsCard postData={postData} />
    </div>
  );
};

export default Detail_Post_Page;

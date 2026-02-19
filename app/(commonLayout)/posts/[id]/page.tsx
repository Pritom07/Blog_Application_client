import { PostDetailsCard } from "@/components/modules/blogs/postDetailsCard";
import { blogPost } from "@/services/blogPost.service";
import { userServices } from "@/services/user.service";
import { Post } from "@/types/postType";
import { redirect } from "next/navigation";

// Pre-render only first 3 posts (SSG), others SSR
export async function generateStaticParams() {
  const { data } = await blogPost.getAllPosts({}, {});
  const posts = data.data;

  if (!posts) return [];

  return posts.map((post: Post) => ({ id: post.id })).slice(0, 3);
}

const Detail_Post_Page = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const { data: session } = await userServices.getSession();
  if (!session) {
    redirect("/login");
  }

  const { data } = await blogPost.getPostById(id);
  const postData = data.data;

  if (!postData) return null;

  return (
    <div>
      <PostDetailsCard postData={postData} />
    </div>
  );
};

export default Detail_Post_Page;

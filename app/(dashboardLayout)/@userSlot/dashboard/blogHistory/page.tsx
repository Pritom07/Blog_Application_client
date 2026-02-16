import BlogHistoryTable from "@/components/modules/user/BlogHistoryTable/BlogHistoryTable";
import { blogPost } from "@/services/blogPost.service";

const BlogHistory = async () => {
  const { data } = await blogPost.getAllPosts({}, {});
  const posts = data.data;
  return (
    <div>
      <BlogHistoryTable posts={posts} />
    </div>
  );
};

export default BlogHistory;

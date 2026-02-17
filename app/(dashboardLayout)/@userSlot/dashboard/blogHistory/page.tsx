import BlogHistoryTable from "@/components/modules/user/BlogHistoryTable/BlogHistoryTable";
import Pagination_control from "@/components/ui/pagination_control";
import { blogPost } from "@/services/blogPost.service";
import { T_metaData } from "@/types/metaData.types";

const BlogHistory = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data } = await blogPost.getAllPosts({ page }, { cache: "no-cache" });
  const posts = data.data;
  const metaData: T_metaData = data.metaData || {
    resultCount: 0,
    page: 1,
    limit: 5,
    totalPages: 1,
  };

  return (
    <div>
      <BlogHistoryTable posts={posts} />
      <Pagination_control metaData={metaData} />
    </div>
  );
};

export default BlogHistory;

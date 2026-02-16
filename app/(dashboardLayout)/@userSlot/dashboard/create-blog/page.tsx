import CreateBlogFormServer from "@/components/modules/user/createBlog/CreateBlogFormServer";
import CreateblogFromClient from "@/components/modules/user/createBlog/CreateblogFromClient";
import { blogPost } from "@/services/blogPost.service";
import { Post } from "@/types/postType";

const CreateBlog = async () => {
  const { data } = await blogPost.getAllPosts({}, {});
  const posts = data.data;
  return (
    <div>
      {/* <CreateBlogFormServer /> is a server form component that's why user experience is not good.We can't use here any toast or dropdown etc. So we use  */}
      {/* <CreateBlogFormServer /> */}
      <CreateblogFromClient />
    </div>
  );
};

export default CreateBlog;

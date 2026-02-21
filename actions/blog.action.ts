"use server";

import { blogPost } from "@/services/blogPost.service";
import { userServices } from "@/services/user.service";
import { Post } from "@/types/postType";
import { revalidateTag } from "next/cache";

export const getBlogs = async () => {
  return await blogPost.getAllPosts({}, {});
};

export const createPost = async (blogPostdata: Post) => {
  const res = await blogPost.createPost(blogPostdata);
  revalidateTag("BlogPost", "max");
  return res;
};

export const getSessionForUser = async () => {
  return await userServices.getSession();
};

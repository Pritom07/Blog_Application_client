"use server";
import { blogPost } from "@/services/blogPost.service";

export const getBlogs = async () => {
  return await blogPost.getAllPosts({}, {});
};

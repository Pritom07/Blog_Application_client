import { env } from "@/env";
import { T_blogPostParams } from "@/types/blogPostParamsType";
import { serviceOption } from "@/types/serviceOptionType";

export const blogPost = {
  getAllPosts: async function (
    blogPostParams: T_blogPostParams,
    option: serviceOption,
  ) {
    try {
      const BACKEND_URL = env.BACKEND_URL;
      const url = new URL(`${BACKEND_URL}/posts`);

      if (blogPostParams) {
        Object.entries(blogPostParams).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const config: RequestInit = {};
      if (option.cache) {
        config.cache = option.cache;
      }

      if (option.revalidate) {
        config.next = { revalidate: option.revalidate };
      }

      config.next = { ...config.next, tags: ["BlogPost"] };

      const res = await fetch(url.toString(), config);
      const posts = await res.json();

      if (posts.success === true) {
        return { data: posts, error: { message: null } };
      }

      return { data: null, error: { message: "SOMETHING_WENT_WRONG" } };
    } catch (err) {
      return { data: null, error: { message: err } };
    }
  },

  getPostById: async function (id: string) {
    try {
      const BACKEND_URL = env.BACKEND_URL;
      const res = await fetch(`${BACKEND_URL}/posts/${id}`);
      const data = await res.json();
      if (data.success === true) {
        return { data: data, error: { message: null } };
      }
      return { data: null, error: { message: "SOMETHING_WENT_WRONG" } };
    } catch (err) {
      return { data: null, error: { message: err } };
    }
  },
};

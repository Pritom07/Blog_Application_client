"use client";
import { getBlogs } from "@/actions/blog.action";
import { Post } from "@/types/postType";
import Link from "next/link";
import { useEffect, useState } from "react";

const BlogPages = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState<{ message: string | null } | null>();
  useEffect(() => {
    (async () => {
      const { data, error } = await getBlogs();
      setPosts(data.data);
      setError(error ? { message: error.message as string | null } : null);
    })();
  }, []);
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="overflow-x-auto rounded-xl border border-border shadow-md">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 font-semibold">ID</th>
              <th className="px-6 py-3 font-semibold">Title</th>
              <th className="px-6 py-3 font-semibold">Tags</th>
              <th className="px-6 py-3 font-semibold">Views</th>
              <th className="px-6 py-3 font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: Post) => {
              return (
                <tr
                  key={post.id}
                  className="border-t hover:bg-muted/50 transition"
                >
                  <td className="px-6 py-4">{post.id}</td>
                  <td className="px-6 py-4">{post.title}</td>
                  <td className="px-6 py-4">{post.tags.join(",")}</td>
                  <td className="px-6 py-4">{post.views}</td>
                  <td>
                    <button className="bg-gray-300 p-2 rounded-xl text-green-600 font-medium">
                      <Link href={`/posts/${post.id}`}>View Details</Link>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogPages;

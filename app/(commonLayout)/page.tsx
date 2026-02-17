import BlogCard from "@/components/modules/blogs/blogCard";
import { blogPost } from "@/services/blogPost.service";
import { Post } from "@/types/postType";
import Image from "next/image";
import blogBanner from "../../public/blogBanner.jpg";
import default_thumbnail from "../../public/default_thumbnail.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const allPostsQuery = await blogPost.getAllPosts(
    {
      // tags: "Next,Level,web",
      // isFeatured: true,
      limit: "3",
    },
    {
      // cache:"no-store",
      revalidate: 10,
    },
  );

  const isFeaturedPostsQuery = await blogPost.getAllPosts(
    { isFeatured: true },
    {},
  );

  // parallel data fetching requires less time
  const [allPosts, isFeaturedPosts] = await Promise.all([
    allPostsQuery,
    isFeaturedPostsQuery,
  ]);

  const posts1 = allPosts.data.data;
  const posts2 = isFeaturedPosts.data.data;

  return (
    <div>
      {/* If image in your project's public folder then optimize image in these approach */}
      {/* After Optimizing image in next.js must install `npm install sharp` */}

      <div className="relative h-96 w-full max-w-7xl mx-auto">
        <Image
          src={blogBanner}
          fill
          priority
          alt="blogBanner"
          className="rounded-xl object-cover"
        />
      </div>

      {/* If you want to use image with imgbb direct link then optimize image in these approach and also configure next.config.ts */}
      {/* After Optimizing image in next.js must install `npm install sharp` */}

      {/* <div className="relative h-96 w-full max-w-7xl mx-auto">
        <Image
          src="https://i.ibb.co.com/d4xbcwXr/blog-Banner.jpg"
          fill
          priority
          alt="blogBanner"
          className="rounded-xl object-cover"
        />
      </div> */}

      <h1 className="text-center mt-4 text-4xl font-bold">
        Write your blog here !
      </h1>

      <div className="max-w-7xl mx-auto px-2 mt-3">
        <h1 className="text-3xl font-semibold">isFeatured :</h1>
        <section className="grid grid-cols-2 gap-5 mt-3">
          {posts2.map((post: Post) => (
            <Card key={post.id} className="shadow-xl shadow-slate-300">
              <CardHeader>
                <Image
                  src={post.thumbnail ? post.thumbnail : default_thumbnail}
                  alt={post.title}
                />
              </CardHeader>
              <CardContent>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.content}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>

      <div className="max-w-7xl mx-auto mt-10">
        <h1 className="text-3xl font-semibold">Top Recent Posts :</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
          {posts1.map((post: Post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

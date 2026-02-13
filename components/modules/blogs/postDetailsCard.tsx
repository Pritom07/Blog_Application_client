import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post } from "@/types/postType";
import { Eye } from "lucide-react";

export const PostDetailsCard = ({ postData }: { postData: Post }) => {
  const {
    title,
    content,
    thumbnail,
    isFeatured,
    status,
    tags,
    views,
    created_At,
  } = postData;

  return (
    <div className="relative max-w-5xl mx-auto mt-12 px-4">
      <div
        className="absolute inset-0 -rotate-2 scale-[0.99] rounded-2xl 
bg-white dark:bg-slate-900
border border-border/50
shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]
before:absolute before:inset-0 before:rounded-2xl 
before:bg-linear-to-br before:from-indigo-500/10 before:to-purple-500/10
before:blur-2xl before:-z-10
z-0"
      />

      <Card className="relative z-10 rounded-2xl shadow-xl overflow-hidden">
        {thumbnail && (
          <div className="relative w-full h-75">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {isFeatured && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">
                ⭐ Featured
              </span>
            )}

            {status && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border border-gray-300">
                {status}
              </span>
            )}

            {tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-800"
              >
                #{tag}
              </span>
            ))}
          </div>

          <CardTitle className="text-3xl font-bold leading-snug">
            {title}
          </CardTitle>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>{new Date(created_At).toLocaleDateString()}</p>

            {views !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{views} views</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose max-w-none text-muted-foreground leading-relaxed">
            {content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

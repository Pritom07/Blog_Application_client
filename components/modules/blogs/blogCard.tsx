import Image from "next/image";
import { Post } from "@/types/postType";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, MessageCircle } from "lucide-react";

const BlogCard = ({ post }: { post: Post }) => {
  const { id, title, content, thumbnail, tags, views, _count } = post;
  return (
    <div className="mb-1 px-1.5 py-1">
      <Card className="flex h-full flex-col overflow-hidden p-0 border-2 border-slate-200">
        <CardHeader className="relative p-0">
          <AspectRatio ratio={1.27} className="overflow-hidden">
            <Image
              src={thumbnail ?? "/default_thumbnail.png"}
              alt={title}
              fill
              className="object-cover rounded-xl p-2"
            />
          </AspectRatio>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-4 pb-4">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>

          <CardDescription className="text-sm text-muted-foreground">
            {content.slice(0, 120)} ...
          </CardDescription>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string, index: number) => (
              <button
                key={index}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                #{tag}
              </button>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye size={16} />
              {views}
            </span>

            <span className="flex items-center gap-1">
              <MessageCircle size={16} />
              {_count?.comments ?? 0}
            </span>
          </div>

          <Button asChild size="sm" className="mb-2">
            <Link href={`/posts/${id}`}>Read More</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlogCard;

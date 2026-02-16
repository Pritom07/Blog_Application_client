import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Post } from "@/types/postType";

const BlogHistoryTable = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      <Table className="max-w-4xl mx-auto mt-3 border border-slate-200 rounded-[15px]">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>total Comments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post: Post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>
                {post.tags.map((tag, idx) => (
                  <Button
                    key={idx}
                    className="mr-1 bg-slate-100 rounded-full text-black hover:bg-black hover:text-white"
                  >
                    {tag}
                  </Button>
                ))}
              </TableCell>
              <TableCell>{post.views}</TableCell>
              <TableCell>{post._count.comments}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BlogHistoryTable;

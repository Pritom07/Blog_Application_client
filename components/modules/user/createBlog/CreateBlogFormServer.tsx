import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const CreateBlogFormServer = () => {
  const createBlogForm = async (formData: FormData) => {
    "use server";

    const BACKEND_URL = env.BACKEND_URL;
    const cookieStore = await cookies();
    const blogPostData = {
      title: formData.get("title"),
      thumbnail: formData.get("thumbnail"),
      content: formData.get("content"),
      tags: (formData.get("tags") as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    const response = await fetch(`${BACKEND_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(blogPostData),
    });

    if (response.ok) {
      revalidateTag("BlogPost", "max");
      redirect("/");
    }
  };

  return (
    <div>
      <Card className="max-w-4xl mx-auto mt-3">
        <CardHeader>
          <CardTitle>Blog Post</CardTitle>
          <CardDescription>You can write your blog here !</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="CreateBlogFormServer" action={createBlogForm}>
            <FieldGroup>
              <div className="flex justify-center items-center gap-4">
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter Blog Title"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Thumbnail</FieldLabel>
                  <Input
                    type="url"
                    id="thumbnail"
                    name="thumbnail"
                    placeholder="Enter Thumbnail URL"
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel>Content</FieldLabel>
                <textarea
                  name="content"
                  id="content"
                  className="border border-gray-300 rounded-[13px] p-1 px-2"
                  placeholder="Enter Blog Content"
                  required
                ></textarea>
              </Field>

              <Field>
                <FieldLabel>Tags (Comma separated)</FieldLabel>
                <Input
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="Enter Related Tags e.g: next,level"
                  required
                />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button form="CreateBlogFormServer" className="w-full cursor-pointer">
            Create Blog Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateBlogFormServer;

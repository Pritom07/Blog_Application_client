"use client";

import { createPost } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Post } from "@/types/postType";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title cannot exceed 120 characters"),
  thumbnail: z.url("Invalid URL").or(z.literal("")),
  content: z
    .string()
    .min(10, "Content must be at least 20 characters")
    .max(5000, "Content cannot exceed 5000 characters"),
  tags: z.string().min(2, "Tags are required").max(100, "Tags too long"),
});

const CreateblogFromClient = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: "",
      thumbnail: "",
      content: "",
      tags: "",
    },

    validators: {
      onSubmit: formSchema,
    },

    onSubmit: async ({ value }) => {
      const blogPostdata = {
        title: value.title,
        thumbnail: value?.thumbnail,
        content: value.content,
        tags: value.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      };

      const toastId = toast.loading("Creating Post", {
        position: "top-center",
      });

      try {
        const { data } = await createPost(blogPostdata as Post);
        if (data.success) {
          toast.success("Post Created", {
            id: toastId,
            position: "top-center",
          });
          router.push("/");
        }
      } catch (err) {
        toast.error("Internal_Server_Error", {
          id: toastId,
          position: "top-center",
        });
      }

      form.reset();
    },
  });

  return (
    <div>
      <Card className="max-w-4xl mx-auto mt-3">
        <CardHeader>
          <CardTitle>Blog Post</CardTitle>
          <CardDescription>You can write your blog here !</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="CreateBlogFormClient"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="flex justify-center items-center gap-4">
                <form.Field
                  name="title"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter Blog Title"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="thumbnail"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Thumbnail</FieldLabel>
                        <Input
                          type="url"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter Thumbnail URL"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              <form.Field
                name="content"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                      <textarea
                        id={field.name}
                        name={field.name}
                        className="border border-gray-300 p-1 px-2 rounded-[13px]"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter Blog Content"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="tags"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Tags (Comma separated)
                      </FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter Related Tags e.g: next,level"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            form="CreateBlogFormClient"
            type="submit"
            className="w-full cursor-pointer"
          >
            Create Blog Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateblogFromClient;

"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IoMdStar } from "react-icons/io";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Login User", { position: "top-center" });
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          return toast.error(error.message, {
            id: toastId,
            position: "top-center",
          });
        }
        router.push("/");
        return toast.success("Login successfull", {
          id: toastId,
          position: "top-center",
        });
      } catch (err) {
        return toast.error("Internal_Server_Error", {
          id: toastId,
          position: "top-center",
        });
      }
    },
  });

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
      // callbackURL: window.location.origin,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="signinForm"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="email"
                children={(field: any) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Email
                        <IoMdStar className="text-red-500" />
                      </FieldLabel>
                      <Input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="password"
                children={(field: any) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Password
                        <IoMdStar className="text-red-500" />
                      </FieldLabel>
                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
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
        <CardFooter className="flex flex-col gap-1">
          <Button
            form="signinForm"
            type="submit"
            className="w-full cursor-pointer"
          >
            Log In
          </Button>
          <Button
            onClick={signIn}
            className="w-full text-white bg-red-500 font-semibold cursor-pointer hover:bg-red-500"
          >
            Continue with Google
          </Button>
          <FieldDescription className="text-center">
            Don't have an account? <a href="/signup">Sign Up</a>
          </FieldDescription>
        </CardFooter>
      </Card>
    </div>
  );
}

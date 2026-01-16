import { admin_user_RoutesType } from "@/types/admin_user_RoutesType";

export const userRoutes: Array<admin_user_RoutesType> = [
  {
    title: "Blog_Application",
    items: [
      {
        title: "Blog Management",
        url: "/blogmanagement",
      },
      {
        title: "Write Blog",
        url: "/write-blog",
      },
    ],
  },
];

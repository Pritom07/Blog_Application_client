import { admin_user_RoutesType } from "@/types/admin_user_RoutesType";

export const adminRoutes: Array<admin_user_RoutesType> = [
  {
    title: "Blog_Application",
    items: [
      {
        title: "User Management",
        url: "/usermanagement",
      },
      {
        title: "Analytics",
        url: "/analytics",
      },
    ],
  },
];

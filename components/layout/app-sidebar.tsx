import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "../ui/button";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import { admin_user_RoutesType } from "@/types/admin_user_RoutesType";

export function AppSidebar({
  userRole,
  ...props
}: {
  userRole: string & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Array<admin_user_RoutesType> = [];

  switch (userRole) {
    case "ADMIN":
      routes = adminRoutes;
      break;
    case "USER":
      routes = userRoutes;
      break;
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <Button className="mx-2.5 mt-2.5 -mb-1.5 cursor-pointer">
          <Link href="/">Home</Link>
        </Button>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="bg-blue-400 text-white">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

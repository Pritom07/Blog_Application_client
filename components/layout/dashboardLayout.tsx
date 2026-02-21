"use client";

import { useRouter } from "next/navigation";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useEffect, useState } from "react";
import { Role } from "@/constants/roles";
import { getSessionForUser } from "@/actions/blog.action";

const DashboardLayout = ({
  adminSlot,
  userSlot,
}: {
  adminSlot: React.ReactNode;
  userSlot: React.ReactNode;
}) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSessionForUser();

        if (!session.data) {
          router.push("/login");
          return;
        }

        setUserInfo(session.data.user);
      } catch (error) {
        console.error("Failed to fetch session:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }
  return (
    <SidebarProvider>
      <AppSidebar userRole={userInfo.role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === Role.ADMIN ? adminSlot : userSlot}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;

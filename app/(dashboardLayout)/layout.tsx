export const dynamic = "force-dynamic";
import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Role } from "@/constants/roles";
import { userServices } from "@/services/user.service";

const dashboardLayout = async ({
  adminSlot,
  userSlot,
}: {
  adminSlot: React.ReactNode;
  userSlot: React.ReactNode;
}) => {
  const { data } = await userServices.getSession();
  const userRole = data.user.role;

  return (
    <div>
      <SidebarProvider>
        <AppSidebar userRole={userRole} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </header>

          <div className="mx-3 my-2">
            {userRole === Role.ADMIN ? adminSlot : userSlot}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default dashboardLayout;

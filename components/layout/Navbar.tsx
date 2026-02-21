"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./modeToggler";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Role } from "@/constants/roles";

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    title: string;
  };
  menu?: MenuItem[];
}

const Navbar = ({
  logo = {
    url: "/",
    title: "BlogWeb",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Blog_Post", url: "/posts" },
    { title: "About", url: "/about" },
  ],
  className,
}: NavbarProps) => {
  const router = useRouter();
  const [session, setSession] = useState<typeof data | null>(null);
  const { data } = authClient.useSession();

  const ROLE = (data?.user as any)?.role as string | undefined;

  useEffect(() => {
    setSession(data);
  }, [data]);

  const signOut = async () => {
    await authClient.signOut();
    toast.success("SignOut successful!", { position: "top-center" });
    return router.push("/");
  };

  return (
    <section className={cn("py-4", className)}>
      <div className="container mx-auto">
        {/* Desktop */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="text-lg font-semibold">
              {logo.title}
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.url}
                        className="font-semibold text-[15px]"
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                {ROLE === Role.ADMIN ? (
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/admin-dashboard"
                        className="font-semibold text-[15px]"
                      >
                        Dashboard
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard"
                        className="font-semibold text-[15px]"
                      >
                        Dashboard
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex gap-2 items-center">
            <ModeToggle />

            {session ? (
              <Button
                onClick={signOut}
                variant="outline"
                size="sm"
                className="bg-black text-white cursor-pointer hover:bg-black hover:text-white"
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                >
                  <Link href="/login">Login</Link>
                </Button>

                <Button asChild size="sm" className="cursor-pointer">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url}>{logo.title}</Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{logo.title}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 p-4">
                  <Accordion type="single" collapsible>
                    {menu.map((item) => (
                      <Link key={item.title} href={item.url}>
                        {item.title}
                      </Link>
                    ))}
                  </Accordion>

                  <ModeToggle />

                  {session ? (
                    <Button
                      onClick={signOut}
                      variant="outline"
                      className="bg-black text-white cursor-pointer"
                    >
                      Sign Out
                    </Button>
                  ) : (
                    <>
                      <Button asChild variant="outline">
                        <Link href="/login">Login</Link>
                      </Button>

                      <Button asChild>
                        <Link href="/signup">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };

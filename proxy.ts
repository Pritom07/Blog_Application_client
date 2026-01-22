import { NextRequest, NextResponse } from "next/server";
import { userServices } from "./services/user.service";
import { Role } from "./constants/roles";

export const proxy = async (request: NextRequest) => {
  let isAuthenticated = false;
  let userRole = Role.USER;
  const pathName = request.nextUrl.pathname;

  const { data } = await userServices.getSession();

  if (data) {
    isAuthenticated = true;
    userRole = data.user.role;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (userRole === Role.ADMIN && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if (userRole === Role.USER && pathName.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};

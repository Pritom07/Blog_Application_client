// ? It gets user session through userServices and using cookieStore.

// import { NextRequest, NextResponse } from "next/server";
// import { userServices } from "./services/user.service";
// import { Role } from "./constants/roles";

// export const proxy = async (request: NextRequest) => {
//   let isAuthenticated = false;
//   let userRole = Role.USER;
//   const pathName = request.nextUrl.pathname;

//   const { data } = await userServices.getSession();

//   if (data) {
//     isAuthenticated = true;
//     userRole = data.user.role;
//   }

//   if (!isAuthenticated) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   if (userRole === Role.ADMIN && pathName.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/admin-dashboard", request.url));
//   }

//   if (userRole === Role.USER && pathName.startsWith("/admin-dashboard")) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// };

// export const config = {
//   matcher: [
//     "/dashboard",
//     "/dashboard/:path*",
//     "/admin-dashboard",
//     "/admin-dashboard/:path*",
//   ],
// };

//? It gets user session through request.cookies.get("better-auth.session_token")

// import { NextRequest, NextResponse } from "next/server";
// import { env } from "./env";

// export const proxy = async (request: NextRequest) => {
//   const pathname = request.nextUrl.pathname;

//   if (pathname.startsWith("/verify-email")) {
//     return NextResponse.next();
//   }

//   const sessionToken = request.cookies.get("better-auth.session_token");

//   if (!sessionToken) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   try {
//     const res = await fetch(`${env.API_URL}/get-session`, {
//       headers: {
//         Cookie: `${sessionToken.name}=${sessionToken.value}`,
//       },
//       cache: "no-store",
//     });

//     const data = await res.json();
//     const role = data?.user?.role;

//     if (role === "ADMIN" && pathname.startsWith("/dashboard")) {
//       return NextResponse.redirect(new URL("/admin-dashboard", request.url));
//     }

//     if (role === "USER" && pathname.startsWith("/admin-dashboard")) {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     }
//   } catch (error) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// };

// export const config = {
//   matcher: [
//     "/dashboard",
//     "/dashboard/:path*",
//     "/admin-dashboard",
//     "/admin-dashboard/:path*",
//   ],
// };

//?phero deployment guideline
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for verify-email route
  if (pathname.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  // Check for session token in cookies
  const sessionToken = request.cookies.get("better-auth.session_token");

  //* User is not authenticated at all
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access if session exists
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};

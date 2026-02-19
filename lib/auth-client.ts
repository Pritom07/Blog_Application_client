// import { createAuthClient } from "better-auth/react";
// export const authClient = createAuthClient({
//   baseURL: "http://localhost:5000",
// });

// import { env } from "@/env";
// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL:
//     env.NEXT_PUBLIC_BACKEND_URL ||
//     (typeof window !== "undefined" ? window.location.origin : ""),
//   fetchOptions: {
//     credentials: "include",
//   },
// });

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: {
    credentials: "include",
  },
});

// import { env } from "@/env";
// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: env.NEXT_PUBLIC_BACKEND_URL,
//   fetchOptions: {
//     credentials: "include",
//   },
// });

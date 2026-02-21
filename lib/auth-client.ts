// import { createAuthClient } from "better-auth/react";
// export const authClient = createAuthClient({
//   baseURL: "http://localhost:5000",
// });

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: {
    credentials: "include",
  },
});

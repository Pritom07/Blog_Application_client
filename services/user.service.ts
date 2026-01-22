import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;
export const userServices = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "SOMETHING_WENT_WRONG" } };
      }
      return { data: session, error: { message: null } };
    } catch (err) {
      return { data: null, error: { message: err } };
    }
  },
};

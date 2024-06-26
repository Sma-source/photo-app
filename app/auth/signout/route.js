import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
  // Retrieve user information first
  const { data: user } = await supabase.auth.getUser();

  // If user is authenticated
  if (user) {
    // Retrieve session information
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If session exists, sign out the user
    if (session) {
      await supabase.auth.signOut();
    }
  }

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (session) {
  //   await supabase.auth.signOut();
  // }

  return NextResponse.redirect(new URL("/", req.url), {
    status: 302,
  });
}

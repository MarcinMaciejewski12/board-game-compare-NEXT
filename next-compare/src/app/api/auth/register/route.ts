"use server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string,
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, user_id } = body;
    console.log(body);
  } catch (e) {
    console.error(e);
  }
}

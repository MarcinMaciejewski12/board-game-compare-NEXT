"use server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
const dynamic = 'force-dynamic'
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const urlId = searchParams.get("userId");

    if (!urlId) {
      return NextResponse.json({ error: "urlId is required" }, { status: 400 });
    }

    const getUser = await db
      .select()
      .from(users)
      .where(eq(users.user_id, urlId))
      .limit(1);

    return NextResponse.json(getUser);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false });
  }
}

import { db } from "@/db";
import { allScoreBoards } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db
      .select()
      .from(allScoreBoards)
      .where(eq(allScoreBoards.is_shared_to_community, true));
    console.log(result);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false }, { status: 403 });
  }
}

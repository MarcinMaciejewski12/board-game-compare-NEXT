import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { allScoreBoards } from "@/db/schema";
import { inArray } from "drizzle-orm/sql/expressions/conditions";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const gamesId = JSON.parse(searchParams.get("id") ?? "");

    const result = await db
      .select()
      .from(allScoreBoards)
      .where(inArray(allScoreBoards.unique_board_id, gamesId));
    return NextResponse.json({ result });
  } catch (e) {
    console.error(e);
  }
}

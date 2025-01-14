import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { allScoreBoards } from "@/db/schema";
import { inArray } from "drizzle-orm/sql/expressions/conditions";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const idParam = searchParams.get("id");
  let gamesId;

  if (!idParam) {
    return NextResponse.json({
      success: false,
      status: 400,
      message: "Missing id parameter",
    });
  }

  try {
    gamesId = JSON.parse(idParam as string);
    const result = await db
      .select()
      .from(allScoreBoards)
      .where(inArray(allScoreBoards.unique_board_id, gamesId));

    return NextResponse.json({ success: true, data: result });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, status: 403 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { allScoreBoards } from "@/db/schema";

import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") ?? "";
  try {
    const result = await db
      .select({
        max_players: allScoreBoards.max_players,
        board_id: allScoreBoards.unique_board_id,
        game_name: allScoreBoards.game_name,
        score_sheet: allScoreBoards.game_score_board,
      })
      .from(allScoreBoards)
      .where(eq(allScoreBoards.unique_board_id, id));

    return NextResponse.json({ result }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch the game data" },
      { status: 500 },
    );
  }
}

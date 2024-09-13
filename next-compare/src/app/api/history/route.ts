import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { playedGames } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const data = await db
      .select()
      .from(playedGames)
      .where(
        eq(playedGames.unique_board_id, "qP2d531fypsfwefwwq25adhthrhxcvmlpoy"),
      );

    console.log(JSON.parse(data[0].game_score_board as unknown as string));

    return NextResponse.json({ success: true, data: data });
  } catch (e) {
    console.error(e);
  }
}

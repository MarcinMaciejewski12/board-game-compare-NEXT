import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { playedGames } from "@/db/schema";

interface PlayedGameRequestData {
  user_id: string;
  unique_board_id: string;
  game_score_board: string;
}

export async function POST(req: NextRequest) {
  const body: PlayedGameRequestData = await req.json();
  try {
    const result = await db
      .insert(playedGames)
      .values({
        user_id: body.user_id,
        game_score_board: body.game_score_board,
        unique_board_id: body.unique_board_id,
        created_at: new Date(),
      })
      .returning();

    return NextResponse.json(
      { success: true, data: result[0] },
      { status: 201 },
    );
  } catch (e) {
    console.error(`Can't save your score sheet to database:`, e);
    return NextResponse.json(
      { success: false, error: String(e) },
      { status: 500 },
    );
  }
}

// export async function GET(req: NextRequest, res: NextResponse) {
//   try {
//     const data = await db.select().from(playedGames);
//
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json({ success: false, error: e });
//   }
// }

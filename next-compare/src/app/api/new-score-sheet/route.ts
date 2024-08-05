import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { allScoreBoards, users } from "@/db/schema";
import { eq } from "drizzle-orm";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const uid = () =>
      String(Date.now().toString(32) + Math.random().toString(16)).replace(
        /\./g,
        "",
      );

    const result = await db
      .insert(allScoreBoards)
      .values({
        user_id: body.body.user_id,
        created_at: new Date(),
        game_name: body.body.gameName,
        min_players: Number(body.body.details.min_player),
        max_players: Number(body.body.details.max_player),
        difficulty: Number(body.body.details.difficulty),
        playtime: body.body.details.playtime,
        photo: "",
        is_shared_to_community: body.body.details.isSharedToCommunity,
        unique_board_id: uid(),
        game_score_board: JSON.stringify(body.body.gameFields),
      })
      .returning();

    if (result) {
      const userData = await db
        .select({
          board_games: users.board_games,
        })
        .from(users)
        .where(eq(body.body.user_id, users.user_id));

      const parseUserGames = JSON.parse(userData[0].board_games as string);
      const updateGamesTable = [...parseUserGames, result[0].unique_board_id];

      await db
        .update(users)
        .set({ board_games: JSON.stringify(updateGamesTable) })
        .where(eq(users.user_id, body.body.user_id))
        .returning();
    }

    return NextResponse.json({ success: true, data: result[0], status: 200 });
  } catch (e) {
    console.error(e);
    throw new Error("Something went wrong");
  }
}

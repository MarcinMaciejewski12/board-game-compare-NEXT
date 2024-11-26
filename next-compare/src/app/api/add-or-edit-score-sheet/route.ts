import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { allScoreBoards, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get("id");
  try {
    if (gameId) return;

    const body = await request.json();

    const result = await db
      .insert(allScoreBoards)
      .values({
        user_id: body.userId,
        created_at: new Date(),
        game_name: body.gameName,
        min_players: Number(body.details.min_player),
        max_players: Number(body.details.max_player),
        difficulty: Number(body.details.difficulty),
        playtime: body.details.playtime,
        photo: "",
        description: body.details.description,
        is_shared_to_community: body.details.isSharedToCommunity,
        unique_board_id: uuidv4(),
        game_score_board: JSON.stringify(body.gameFields),
        labels: JSON.stringify(body.labels),
        horizontal: body.horizontalView,
      })
      .returning();

    if (result) {
      const userData = await db
        .select({
          board_games: users.board_games,
        })
        .from(users)
        .where(eq(body.user_id, users.user_id));

      const parseUserGames = JSON.parse(userData[0].board_games as string);
      const updateGamesTable = [...parseUserGames, result[0].unique_board_id];

      await db
        .update(users)
        .set({ board_games: JSON.stringify(updateGamesTable) })
        .where(eq(users.user_id, body.user_id))
        .returning();
    }

    return NextResponse.json({ success: true, data: result[0], status: 200 });
  } catch (e) {
    console.error(e);
    throw new Error("Something went wrong");
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get("id");

  try {
    const body = await request.json();
    if (gameId) {
      const getBoardGame = await db
        .select()
        .from(allScoreBoards)
        .where(eq(allScoreBoards.unique_board_id, gameId));

      if (getBoardGame) {
        await db
          .update(allScoreBoards)
          .set({ game_score_board: JSON.stringify(body.gameFields) })
          .where(eq(allScoreBoards.unique_board_id, gameId));

        return NextResponse.json({
          success: true,
          message: "Game score board updated successfully",
          status: 200,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Game not found",
          status: 404,
        });
      }
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      status: 500,
    });
  }
}

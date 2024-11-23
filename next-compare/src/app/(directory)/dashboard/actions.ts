"use server";
import { db } from "@/db";
import { allScoreBoards, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { inArray } from "drizzle-orm/sql/expressions/conditions";
import {
  Games,
  ScoreboardFields,
} from "@/app/(directory)/dashboard/lib/dashboard-types";
import { revalidatePath } from "next/cache";

export async function getUserGames(id: string) {
  try {
    const getUserBoardGames = await db
      .select({ games: users.board_games })
      .from(users)
      .where(eq(users.user_id, id));

    const userGames: string[] = Array.isArray(getUserBoardGames[0].games)
      ? getUserBoardGames[0].games
      : [];

    const games = await db
      .select()
      .from(allScoreBoards)
      .where(inArray(allScoreBoards.unique_board_id, userGames));

    const mappedData: Games[] = games.map((game) => ({
      difficulty: game.difficulty ?? 0,
      createdAt: game.created_at ? game.created_at.toISOString() : "",
      gameName: game.game_name ?? "",
      id: game.id,
      isSharedToCommunity: game.is_shared_to_community ?? false,
      labels: Array.isArray(game.labels) ? game.labels : [],
      maxPlayers: game.max_players ?? 0,
      minPlayers: game.min_players ?? 0,
      photo: game.photo ?? "",
      playtime: game.playtime ?? "",
      uniqueBoardId: game.unique_board_id ?? "",
      userId: game.user_id ?? "",
      description: game.description ?? "",
      horizontalView: game.horizontal ?? false,
      gameScoreBoard: String(game.game_score_board),
    }));

    return {
      status: true,
      data: mappedData,
      message: "User games fetched successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      status: false,
      data: undefined,
      message: "Error fetching user games",
    };
  }
}

export async function getScoreBoardSheet(gameId: string): Promise<{
  status: boolean;
  data: ScoreboardFields | undefined;
  message: string;
}> {
  try {
    const result = await db
      .select({
        max_players: allScoreBoards.max_players,
        board_id: allScoreBoards.unique_board_id,
        game_name: allScoreBoards.game_name,
        score_sheet: allScoreBoards.game_score_board,
        horizontal: allScoreBoards.horizontal,
      })
      .from(allScoreBoards)
      .where(eq(allScoreBoards.unique_board_id, gameId));

    const mappedData = {
      maxPlayers: result[0].max_players ?? 1,
      boardId: result[0].board_id,
      gameName: result[0].game_name ?? "",
      scoreSheet: result[0].score_sheet as unknown as string,
      horizontal: result[0].horizontal ?? false,
    };

    return {
      status: true,
      data: mappedData,
      message: "Game score board fetched successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      status: false,
      data: undefined,
      message: "Error fetching game score board",
    };
  }
}

export async function deleteGameFromUserAccount(
  gameId: string,
  userId: string,
) {
  try {
    if (!gameId || !userId) {
      throw new Error("Game id or user id is missing");
    }

    const data = await db
      .select({ games: users.board_games })
      .from(users)
      .where(eq(users.user_id, userId));

    const gamesArray = data.map((record) => record.games).flat();
    const filteredGames = gamesArray.filter((id) => id !== gameId);

    await db
      .update(users)
      .set({ board_games: filteredGames })
      .where(eq(users.user_id, userId))
      .returning();

    revalidatePath("/dashboard");
    return {
      status: true,
      data: undefined,
      message: "Game deleted successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      status: false,
      data: undefined,
      message: "Something went wrong with deleting the game",
    };
  }
}

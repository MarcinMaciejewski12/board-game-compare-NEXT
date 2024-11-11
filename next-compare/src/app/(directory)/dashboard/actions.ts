import { db } from "@/db";
import { allScoreBoards, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { inArray } from "drizzle-orm/sql/expressions/conditions";
import { Games } from "@/app/(directory)/dashboard/lib/dashboard-types";

export async function getUserGames(id: string) {
  try {
    const getUserBoardGames = await db
      .select({ games: users.board_games })
      .from(users)
      .where(eq(users.user_id, id));

    const userGames: string[] = Array.isArray(getUserBoardGames[0].games)
      ? getUserBoardGames[0].games
      : [];

    if (!userGames) {
      throw new Error("User games not found");
    }

    const games = await db
      .select()
      .from(allScoreBoards)
      .where(inArray(allScoreBoards.unique_board_id, userGames));

    const processedGames: Games[] = games.map((game: any) => ({
      ...game,
      difficulty: game.difficulty ?? 0, // Default to 0 if difficulty is null
      created_at: game.created_at ? game.created_at.toISOString() : "",
      game_score_board: game.game_score_board ?? "",
      game_name: game.game_name ?? "",
      min_players: game.min_players ?? 0,
      max_players: game.max_players ?? 0,
      photo: game.photo ?? "",
      playtime: game.playtime ?? "",
      unique_board_id: game.unique_board_id ?? "",
      user_id: game.user_id ?? "",
      description: game.description ?? "",
      labels: game.labels ?? "",
    }));

    return {
      status: true,
      data: processedGames,
      message: "User games fetched successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      status: false,
      data: [],
      message: "Error fetching user games",
    };
  }
}

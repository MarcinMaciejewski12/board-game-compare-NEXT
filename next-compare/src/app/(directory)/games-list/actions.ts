"use server";
import { db } from "@/db";
import { allScoreBoards, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Games } from "@/app/(directory)/dashboard/lib/dashboard-types";
import { revalidatePath } from "next/cache";

export async function getSharedGames() {
  try {
    const data = await db
      .select()
      .from(allScoreBoards)
      .where(eq(allScoreBoards.is_shared_to_community, true))
      .execute();

    const mappedData: Games[] = data.map((game) => ({
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
      message: "Shared games retrieved successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      status: false,
      data: null,
      message: "Failed to get shared games",
    };
  }
}

export async function addToShelf(userId: string, gameId: string) {
  try {
    const userGames = (await db
      .select({ games: users.board_games })
      .from(users)
      .where(eq(users.user_id, userId))) as { games: string[] }[];
    const games = userGames[0].games;

    if (games.includes(gameId)) {
      return {
        status: true,
        data: null,
        message: "Game already is on your shelf",
      };
    }

    const addGameToUserAccount = games ? [...games, gameId] : [gameId];

    const data = await db
      .update(users)
      .set({ board_games: addGameToUserAccount })
      .where(eq(users.user_id, userId))
      .returning();

    revalidatePath("/dashboard");
    return {
      status: true,
      data: data,
      message: "Added game to shelf successfully!",
    };
  } catch (e) {
    console.error(e);
    return {
      status: false,
      data: undefined,
      message: "Something went wrong with adding the game",
    };
  }
}

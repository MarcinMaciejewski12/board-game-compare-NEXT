"use server";
import { db } from "@/db";
import { allScoreBoards, playerScoreSheets, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { Games } from "@/app/(directory)/dashboard/lib/dashboard-types";
import { revalidatePath } from "next/cache";
import { HttpStatusCode } from "axios";

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
      HttpStatusCode: 200,
      status: false,
      data: null,
      message: "Failed to get shared games",
    };
  }
}

export async function addToShelf(userId: string, gameId: string) {
  try {
    const isGameAlreadyAdded = await db
      .select()
      .from(playerScoreSheets)
      .where(
        and(
          eq(playerScoreSheets.user_id, userId),
          eq(playerScoreSheets.game_id, gameId),
        ),
      );

    if (isGameAlreadyAdded.length > 0) {
      return {
        HttpStatusCode: 201,
        status: true,
        data: null,
        message: "Game already added to shelf",
      };
    } else {
      const data = await db
        .insert(playerScoreSheets)
        .values({
          user_id: userId,
          game_id: gameId,
          created_at: new Date(),
        })
        .execute();

      revalidatePath("/dashboard");
      return {
        HttpStatusCode: 200,
        status: true,
        data: data,
        message: "Added game to shelf successfully!",
      };
    }
  } catch (e) {
    console.error(e);
    return {
      HttpStatusCode: 404,
      status: false,
      data: undefined,
      message: "Something went wrong with adding the game",
    };
  }
}

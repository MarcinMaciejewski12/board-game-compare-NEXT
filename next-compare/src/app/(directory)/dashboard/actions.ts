"use server";
import { db } from "@/db";
import { allScoreBoards, playerScoreSheets, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { and, inArray } from "drizzle-orm/sql/expressions/conditions";
import {
  Games,
  ScoreboardFields,
  ScoreData,
} from "@/app/(directory)/dashboard/lib/dashboard-types";
import { revalidatePath } from "next/cache";
import { HttpStatusCode } from "axios";

export async function getUserGames(id: string) {
  try {
    if (!id) {
      throw new Error("Unauthorized access");
    }

    const getUserGames = await db
      .select()
      .from(allScoreBoards)
      .innerJoin(
        playerScoreSheets,
        eq(allScoreBoards.unique_board_id, playerScoreSheets.game_id),
      )
      .where(eq(playerScoreSheets.user_id, id));

    const mappedData: Games[] = getUserGames.map((game) => ({
      difficulty: game.all_score_boards.difficulty ?? 0,
      createdAt: game.all_score_boards.created_at
        ? game.all_score_boards.created_at.toISOString()
        : "",
      gameName: game.all_score_boards.game_name ?? "",
      id: game.all_score_boards.id,
      isSharedToCommunity:
        game.all_score_boards.is_shared_to_community ?? false,
      labels: Array.isArray(game.all_score_boards.labels)
        ? game.all_score_boards.labels
        : [],
      maxPlayers: game.all_score_boards.max_players ?? 0,
      minPlayers: game.all_score_boards.min_players ?? 0,
      photo: game.all_score_boards.photo ?? "",
      playtime: game.all_score_boards.playtime ?? "",
      uniqueBoardId: game.all_score_boards.unique_board_id ?? "",
      userId: game.all_score_boards.user_id ?? "",
      description: game.all_score_boards.description ?? "",
      horizontalView: game.all_score_boards.horizontal ?? false,
      gameScoreBoard: String(game.all_score_boards.game_score_board),
    }));

    return {
      HttpStatusCode: HttpStatusCode.Ok,
      status: true,
      data: mappedData,
      message: "User games fetched successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      HttpStatusCode: HttpStatusCode.NotFound,
      status: false,
      data: undefined,
      message: "Error fetching user games",
    };
  }
}

export async function getScoreBoardSheet(gameId: string): Promise<{
  HttpStatusCode: number;
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
      scoreSheet: result[0].score_sheet as unknown as ScoreData[],
      horizontal: result[0].horizontal ?? false,
    };

    return {
      HttpStatusCode: HttpStatusCode.Ok,
      status: true,
      data: mappedData,
      message: "Game score board fetched successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      HttpStatusCode: HttpStatusCode.NotFound,
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

    await db
      .delete(playerScoreSheets)
      .where(
        and(
          eq(playerScoreSheets.game_id, gameId),
          eq(playerScoreSheets.user_id, userId),
        ),
      );

    revalidatePath("/dashboard");
    return {
      HttpStatusCode: HttpStatusCode.Ok,
      status: true,
      data: undefined,
      message: "Game deleted successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      HttpStatusCode: HttpStatusCode.Ok,
      status: false,
      data: undefined,
      message: "Something went wrong with deleting the game",
    };
  }
}

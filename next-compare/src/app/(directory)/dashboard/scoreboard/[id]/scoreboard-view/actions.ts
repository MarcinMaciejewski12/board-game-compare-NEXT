"use server";

import { db } from "@/db";
import { playedGames } from "@/db/schema";
import { HttpStatusCode } from "axios";

export async function saveResults(
  userId: string,
  gameId: string,
  points: { [key: string]: string }[],
) {
  if (!userId || !gameId || !points) {
    return {
      status: false,
      data: undefined,
      message: "Invalid data",
    };
  }
  try {
    const result = await db.insert(playedGames).values({
      user_id: userId,
      game_score_board: points,
      unique_board_id: gameId,
      created_at: new Date(),
    });

    return {
      HttpStatusCode: HttpStatusCode.Ok,
      status: true,
      data: result[0],
      message: "Game results saved",
    };
  } catch (e) {
    console.error(e);
    return {
      HttpStatusCode: HttpStatusCode.NotFound,
      status: false,
      data: undefined,
      message: "Error saving game results",
    };
  }
}

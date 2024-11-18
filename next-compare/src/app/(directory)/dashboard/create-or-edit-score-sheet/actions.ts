"use server";
import { db } from "@/db";
import { allScoreBoards, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { ReorderValue } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import { revalidatePath } from "next/cache";

interface Game {
  max_player: number;
  min_player: number;
  difficulty: number;
  description: string;
  playtime: string;
  isSharedToCommunity: boolean;
  gameName: string;
  horizontalView: boolean;
  labels: number[];
  gameFields: ReorderValue[];
}

export async function AddGame(userId: string, game: Game) {
  if (!userId) return;
  try {
    const newGame = await db
      .insert(allScoreBoards)
      .values({
        user_id: userId,
        unique_board_id: uuidv4(),
        created_at: new Date(),
        game_name: game.gameName,
        min_players: Number(game.min_player),
        max_players: Number(game.max_player),
        difficulty: Number(game.difficulty),
        playtime: game.playtime,
        photo: "",
        description: game.description,
        is_shared_to_community: game.isSharedToCommunity,
        game_score_board: game.gameFields,
        labels: game.labels,
        horizontal: game.horizontalView,
      })
      .returning();

    if (!newGame[0].unique_board_id) {
      throw new Error("Failed to create game");
    }

    const userGame = (await db
      .select({ gamesIds: users.board_games })
      .from(users)
      .where(eq(users.user_id, userId))) as { gamesIds: string[] }[];

    const updateUserGames = [
      ...userGame[0].gamesIds,
      newGame[0].unique_board_id,
    ];

    const saveNewGameToUser = await db
      .update(users)
      .set({ board_games: updateUserGames })
      .where(eq(users.user_id, userId))
      .returning();

    revalidatePath("/dashboard");
    return {
      status: true,
      data: saveNewGameToUser,
      message: "Game added successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      status: false,
      message: "Failed to add game",
      data: undefined,
    };
  }
}

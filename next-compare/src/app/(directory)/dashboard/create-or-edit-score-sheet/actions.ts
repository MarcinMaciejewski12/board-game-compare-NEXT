"use server";
import { db } from "@/db";
import { allScoreBoards, playerScoreSheets } from "@/db/schema";
import { and, eq } from "drizzle-orm";
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
  photo: string;
}

export async function addGame(userId: string, game: Game) {
  if (!userId) return;

  try {
    const gameData = {
      user_id: userId,
      unique_board_id: uuidv4(),
      game_name: game.gameName,
      min_players: Number(game.min_player),
      max_players: Number(game.max_player),
      difficulty: Number(game.difficulty),
      playtime: game.playtime,
      photo: game.photo,
      description: game.description,
      is_shared_to_community: game.isSharedToCommunity,
      game_score_board: game.gameFields,
      labels: game.labels,
      horizontal: game.horizontalView,
    };

    const boardGame = await db.transaction(async (tx) => {
      await tx.insert(allScoreBoards).values({
        ...gameData,
        created_at: new Date(),
      });

      await tx.insert(playerScoreSheets).values({
        user_id: gameData.user_id,
        game_id: gameData.unique_board_id,
        created_at: new Date(),
      });
    });

    revalidatePath("/dashboard");
    return {
      status: true,
      data: boardGame,
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

export async function saveEditedGame(
  userId: string,
  game: { gameFields: ReorderValue[] },
  gameId: string,
) {
  try {
    if (!userId) throw new Error("User not found");
    const userGames = await db
      .select()
      .from(allScoreBoards)
      .where(
        and(
          eq(allScoreBoards.unique_board_id, gameId),
          eq(allScoreBoards.user_id, userId),
        ),
      );

    if (!userGames) throw new Error("Game not found");

    const newGame = await db
      .update(allScoreBoards)
      .set({ game_score_board: game.gameFields })
      .where(eq(allScoreBoards.unique_board_id, gameId))
      .returning();

    revalidatePath("/dashboard");
    return {
      status: true,
      data: newGame,
      message: "Game edited successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      status: false,
      message: "Failed to edit game",
      data: undefined,
    };
  }
}

export async function getEditingGameFields(gameId: string) {
  try {
    if (!gameId) throw new Error("Game not found");

    const data = (await db
      .select({
        fields: allScoreBoards.game_score_board,
        gameName: allScoreBoards.game_name,
      })
      .from(allScoreBoards)
      .where(eq(allScoreBoards.unique_board_id, gameId))) as {
      fields: string;
      gameName: string;
    }[];

    return {
      status: true,
      data: { result: data[0].fields, gameName: data[0].gameName },
      message: "Game fields retrieved successfully",
    };
  } catch (e) {
    console.error(e);
    return {
      status: false,
      message: "Failed to get game fields",
      data: undefined,
    };
  }
}

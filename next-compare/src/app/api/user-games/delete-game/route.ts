import { db } from "@/db";
import { allScoreBoards, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type Data = {
  userId: string;
  gameId: string;
};

export async function POST(req: NextRequest) {
  try {
    const data: Data = await req.json();

    const userGames = await db
      .select({ games: users.board_games })
      .from(users)
      .where(eq(users.user_id, data.userId));
    const parseAndFilterGames = userGames
      .map((item) => {
        const games = JSON.parse(item.games as string);

        return games.filter((id: string) => id !== data.gameId);
      })
      .flat();

    // remove game from users.boardgames array
    await db
      .update(users)
      .set({ board_games: JSON.stringify(parseAndFilterGames) })
      .where(eq(users.user_id, data.userId))
      .returning();
    // delete games from allScoreBoards
    await db
      .delete(allScoreBoards)
      .where(eq(allScoreBoards.unique_board_id, data.gameId))
      .returning();

    return NextResponse.json({ message: "Games is deleted" }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Something went wrong", status: 403 });
  }
}

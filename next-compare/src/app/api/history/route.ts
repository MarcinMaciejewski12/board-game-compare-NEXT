import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { playedGames } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const data = await db
      .select()
      .from(playedGames)
      .where(eq(playedGames.unique_board_id, id));

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (e) {
    console.error(e);
  }
}

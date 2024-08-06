import { db } from "@/db";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    const { user_id, email } = userData.body;

    const result = await db
      .insert(users)
      .values({
        user_id: user_id,
        email: email,
        created_at: new Date(),
        board_games: "[]",
        premium_user: false,
      })
      .returning();
      
    return NextResponse.json(
      { success: true, data: result[0] },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      success: false,
      error: e,
      message: "Can't save your score sheet.",
      status: 500,
    });
  }
}

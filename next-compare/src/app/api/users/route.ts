import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const body = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const data = db
      .select()
      .from(users)
      .where(eq(users.user_id, userId))
      .limit(1);

    if (!data) {
      db.insert(users)
        .values({
          user_id: body.body.user_id,
          email: body.body.email,
          premium_user: false,
          board_games: "[]",
        })
        .returning();
      return NextResponse.json(
        { success: true, message: "User saved successfully." },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "User alredy exist" },
        { status: 200 },
      );
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: e,
      message: `Something went wrong.`,
    });
  }
}

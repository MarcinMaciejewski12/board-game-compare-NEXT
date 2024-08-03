import { db } from "@/db";
import { allScoreBoards } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const result = await db
      .select()
      .from(allScoreBoards)
      .where(eq(allScoreBoards.is_shared_to_community, true));

    console.log(result);
    
  } catch (e) {
    console.error(e);
  }
}

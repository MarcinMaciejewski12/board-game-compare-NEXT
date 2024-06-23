"use server";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

interface User {
  userId: number | null;
  created_at: Date | null;
  name_and_surename: string | null;
  password: string | null;
  role_id: number | null;
}
const connectionString = process.env.DATABASE;
const client = postgres(connectionString as string);
const db = drizzle(client);

export async function POST(req: Request) {
  if (req.method === "POST") {
    const { login, password } = await req.json();

    const user: User[] = await db
      .select()
      .from(users)
      .where(and(eq(users.email, login), eq(users.password, password)));

    if (user.length > 0) {
      return NextResponse.json({
        message: `Hello ${user[0].name_and_surename}`,
      });
    } else {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 401 },
      );
    }
  } else {
    console.log("authorization failed");
  }
}

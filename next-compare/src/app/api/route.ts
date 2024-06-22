import type { NextApiRequest, NextApiResponse } from "next";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users } from "../../db/schema";

const connectionString = process.env.DATABASE;
console.log(connectionString);
const client = postgres(connectionString as string);
const db = drizzle(client);

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const allUsers = await db.select().from(users);
  console.log(allUsers);
  res.status(200).json(allUsers);
}

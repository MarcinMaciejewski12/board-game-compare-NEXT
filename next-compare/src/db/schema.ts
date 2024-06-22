import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core/columns/timestamp";

export const users = pgTable("users", {
  userId: serial("userId").primaryKey(),
  created_at: timestamp("created_at"),
  name_and_surename: varchar("name_and_surename"),
  email: varchar("email"),
  password: varchar("password"),
  role_id: integer("role_id"),
});

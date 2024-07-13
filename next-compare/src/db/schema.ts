import { pgTable, serial, varchar, json, text } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core/columns/timestamp";

// export const users = pgTable("users", {
//   userId: serial("userId").primaryKey(),
//   created_at: timestamp("created_at"),
//   name_and_surename: varchar("name_and_surename"),
//   email: varchar("email"),
//   password: varchar("password"),
//   role_id: integer("role_id"),
// });

export const playedGames = pgTable("played_games", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at"),
  user_id: text("user_id"),
  unique_board_id: varchar("unique_board_id"),
  game_score_board: json("game_score_board"),
});

import {pgTable, serial, varchar, integer, json} from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core/columns/timestamp";

export const users = pgTable("users", {
  userId: serial("userId").primaryKey(),
  created_at: timestamp("created_at"),
  name_and_surename: varchar("name_and_surename"),
  email: varchar("email"),
  password: varchar("password"),
  role_id: integer("role_id"),
});

export const playedGames = pgTable("played_games", {
  id: serial('id').primaryKey(),
  created_at: timestamp("created_at"),
  userId: integer('user_id'),
  uniqueBoardId: varchar('unique_board_id'),
  gameScoreBoard: json('game_score_board'),
})


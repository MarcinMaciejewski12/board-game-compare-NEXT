import {
  pgTable,
  serial,
  varchar,
  json,
  text,
  boolean,
} from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core/columns/timestamp";

export const users = pgTable("users", {
  user_id: text("user_id"),
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at"),
  email: text("email"),
  premium_user: boolean("premium_user"),
  board_games: text("board_games"),
});

export const playedGames = pgTable("played_games", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at"),
  user_id: text("user_id"),
  unique_board_id: varchar("unique_board_id"),
  game_score_board: json("game_score_board"),
});

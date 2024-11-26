import React from "react";

// Dashboard interfaces
export interface Games {
  difficulty: number;
  created_at: string;
  game_name: string;
  game_score_board: string;
  id: string;
  is_shared_to_community: boolean;
  max_players: number;
  min_players: number;
  photo: string;
  playtime: string;
  unique_board_id: string;
  user_id: string;
  description: string;
  labels: string;
}
// ------------------

// Scoreboard interfaces
export interface Data {
  board_id: string;
  game_name: string;
  max_players: number;
  score_sheet: string;
}

export interface ScoreData {
  color: string;
  id: number;
  placeholder: string;
}
// ------------------

// ScoreCreator interfaces
export interface ScoreCreatorProps {
  submitStep: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  prevStep: () => void;
}
// ------------------

// MultiStepForm interfaces and variables
export const colorPalette = [
  "#FFF", // Original color
  "#8FAF92", // Light green
  "#4F6F52", // Dark green
  "#AFCFB2", // Pale green
  "#3F5F42", // Deep green
  "#B0C4B1", // Soft green
  "#5A7F61", // Medium green
  "#7FAF81", // Fresh green
];
// ------------------

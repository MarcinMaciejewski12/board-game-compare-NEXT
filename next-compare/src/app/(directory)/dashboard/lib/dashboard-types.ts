import React from "react";

// Dashboard interfaces
export interface Games {
  difficulty: number;
  createdAt: string;
  gameName: string;
  gameScoreBoard: string;
  id: number;
  isSharedToCommunity: boolean;
  maxPlayers: number;
  minPlayers: number;
  photo: string;
  playtime: string;
  uniqueBoardId: string;
  userId: string;
  description: string;
  labels: number[];
  horizontalView: boolean;
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

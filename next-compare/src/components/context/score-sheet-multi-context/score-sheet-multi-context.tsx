"use client";
import React, { createContext, useContext, useState } from "react";

interface ContextProps {
  children: React.ReactNode;
}

interface ContextDataInterface {
  gameName: string;
  setGameName: React.Dispatch<React.SetStateAction<string>>;
  reorderValues: ReorderValue[];
  setReorderValues: React.Dispatch<React.SetStateAction<ReorderValue[]>>;
  openIndex: number | null;
  setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  gameInfo: GameInfo | null;
  setGameInfo: React.Dispatch<React.SetStateAction<GameInfo>>;
}

type ReorderValue = {
  id: number;
  placeholder: string;
  color: string;
};

type GameInfo = {
  max_player: number;
  min_player: number;
  difficulty: number;
  playtime: string;
  isSharedToCommunity: boolean;
};

const ScoreSheetMultiFormContext = createContext<ContextDataInterface>({
  gameName: "",
  setGameName: () => {},
  reorderValues: [],
  setReorderValues: () => {},
  openIndex: null,
  setOpenIndex: () => {},
  color: "",
  setColor: () => {},
  gameInfo: null,
  setGameInfo: () => {},
});

export function ScoreSheetMultiFormContextProvider({ children }: ContextProps) {
  const [gameInfo, setGameInfo] = useState<GameInfo>({
    max_player: 0,
    min_player: 0,
    difficulty: 0,
    playtime: "",
    isSharedToCommunity: false,
  });
  const [gameName, setGameName] = useState("");
  const [reorderValues, setReorderValues] = useState<ReorderValue[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [color, setColor] = useState("#fff");

  console.log("context info", gameInfo);

  const contextData: ContextDataInterface = {
    gameName,
    setGameName,
    reorderValues,
    setReorderValues,
    openIndex,
    setOpenIndex,
    color,
    setColor,
    gameInfo,
    setGameInfo,
  };

  return (
    <ScoreSheetMultiFormContext.Provider value={contextData}>
      {children}
    </ScoreSheetMultiFormContext.Provider>
  );
}

export function useScoreSheetMultiContext() {
  return useContext(ScoreSheetMultiFormContext);
}
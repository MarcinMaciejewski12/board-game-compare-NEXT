"use client";
import React, { useRef, useState } from "react";
// import Input from "@/components/input";
import { Reorder } from "framer-motion";
import { Button } from "@/components/button";
import { motion } from "framer-motion";
import { HexColorPicker } from "react-colorful";
import { X } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import GameInfoForm from "@/app/(directory)/dashboard/create-score-sheet/game-info-form/game-info-form";
import MultiStepForm from "@/app/(directory)/dashboard/create-score-sheet/game-info-form/multi-step-form";
import {
  ScoreSheetMultiFormContextProvider,
  useScoreSheetMultiContext,
} from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";

interface GameInfo {
  max_player: number;
  min_player: number;
  difficulty: number;
  playtime: string;
  isSharedToCommunity: boolean;
}
// TODO: REFACTOR NEEDED
export default function CreateScoreSheet() {
  // const [step, setStep] = useState(1);
  // const [gameName, setGameName] = useState("");
  // const [gameInfo, setGameInfo] = useState<GameInfo>({
  //   max_player: 0,
  //   min_player: 0,
  //   difficulty: 0,
  //   playtime: "",
  //   isSharedToCommunity: false,
  // });
  const { gameInfo, gameName } = useScoreSheetMultiContext();
  const { user } = useUser();

  // const gameNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setGameName(value);
  // };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      details: gameInfo,
      // gameFields: reorderValues,
      user_id: user?.id,
      gameName: gameName,
    };
    try {
      await axios.post("/api/new-score-sheet", data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ScoreSheetMultiFormContextProvider>
      <MultiStepForm />
    </ScoreSheetMultiFormContextProvider>
  );
}

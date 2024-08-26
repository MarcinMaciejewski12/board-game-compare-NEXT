"use client";
import React from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import MultiStepForm from "@/app/(directory)/dashboard/create-score-sheet/game-info-form/multi-step-form";
import {
  ScoreSheetMultiFormContextProvider,
  useScoreSheetMultiContext,
} from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";

export default function CreateScoreSheet() {
  const { gameInfo, gameName } = useScoreSheetMultiContext();
  const { user } = useUser();

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

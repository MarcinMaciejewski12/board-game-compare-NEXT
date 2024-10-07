import React from "react";
import MultiStepForm from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/multi-step-form";
import { ScoreSheetMultiFormContextProvider } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";

export default function CreateScoreSheet() {
  return (
    <ScoreSheetMultiFormContextProvider>
      <MultiStepForm />
    </ScoreSheetMultiFormContextProvider>
  );
}

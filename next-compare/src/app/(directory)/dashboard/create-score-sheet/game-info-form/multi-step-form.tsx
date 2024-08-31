import React, { useState } from "react";
import GameInfoForm from "@/app/(directory)/dashboard/create-score-sheet/game-info-form/game-info-form";
import ScoreCreator from "@/app/(directory)/dashboard/create-score-sheet/game-info-form/score-creator";
import axios from "axios";
import { useScoreSheetMultiContext } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import { useUser } from "@clerk/nextjs";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const { gameInfo, gameName, reorderValues } = useScoreSheetMultiContext();
  const { user } = useUser();

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      details: gameInfo,
      gameFields: reorderValues,
      user_id: user?.id,
      gameName: gameName,
    };

    try {
      await axios.post("/api/new-score-sheet", data);
    } catch (e) {
      console.error(e);
    }
  };

  switch (step) {
    case 1:
      return <GameInfoForm nextStep={nextStep} />;

    case 2:
      return <ScoreCreator prevStep={prevStep} submitStep={onSubmit} />;

    default:
      return <GameInfoForm nextStep={nextStep} />;
  }
}

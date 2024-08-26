import React, { useState } from "react";
import GameInfoForm from "@/app/(directory)/dashboard/create-score-sheet/game-info-form/game-info-form";
import ScoreCreator from "@/app/(directory)/dashboard/create-score-sheet/game-info-form/score-creator";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  switch (step) {
    case 1:
      return <GameInfoForm nextStep={nextStep} />;

    case 2:
      return <ScoreCreator />;

    default:
      return <GameInfoForm nextStep={nextStep} />;
  }
}

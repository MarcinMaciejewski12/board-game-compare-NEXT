"use client";
import React, { useState } from "react";
import GameInfoForm from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/game-info-form";
import ScoreCreator from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/score-creator";
import axios from "axios";
import { useScoreSheetMultiContext } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const { gameInfo, gameName, reorderValues, labelTable } =
    useScoreSheetMultiContext();
  const { user } = useUser();
  const router = useRouter();
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      details: gameInfo,
      gameFields: reorderValues,
      user_id: user?.id,
      gameName: gameName,
      labels: labelTable,
    };

    try {
      axios.post("/api/add-or-edit-score-sheet", data).then(() => {
        router.push("/dashboard");
        toast({
          title: `Added ${gameName} to your inventory!`,
          className: "bg-white",
        });
      });
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

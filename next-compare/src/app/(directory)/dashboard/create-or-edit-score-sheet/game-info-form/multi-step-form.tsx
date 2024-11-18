"use client";
import React, { useState } from "react";
import GameInfoForm from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/game-info-form";
import ScoreCreator from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/score-creator";
import {
  GameInfo,
  useScoreSheetMultiContext,
} from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { addGame } from "@/app/(directory)/dashboard/create-or-edit-score-sheet/actions";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const { gameInfo, gameName, reorderValues, labelTable, horizontalView } =
    useScoreSheetMultiContext();
  const { user } = useUser();
  const router = useRouter();
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);
  const {
    max_player,
    min_player,
    difficulty,
    playtime,
    isSharedToCommunity,
    description,
  } = (gameInfo as GameInfo) ?? {};

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = {
      max_player,
      min_player,
      difficulty,
      description,
      playtime,
      isSharedToCommunity,
      gameName,
      horizontalView,
      labels: labelTable,
      gameFields: reorderValues,
    };
    await addGame(user?.id ?? "", data);

    toast({
      title: `Added ${gameName} to your inventory!`,
      className: "bg-white",
    });
    router.push("/dashboard");
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

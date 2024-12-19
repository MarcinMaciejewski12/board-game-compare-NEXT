"use client";
import React, { useState } from "react";
import ScoreCreator from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/score-creator";
import {
  GameInfo,
  useScoreSheetMultiContext,
} from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { addGame } from "@/app/(directory)/dashboard/create-or-edit-score-sheet/actions";
import GameInfoForm from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/game-info-form";
import { v4 as uuidv4 } from "uuid";
import supabase from "@/lib/supabaseClient";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const {
    gameInfo,
    gameName,
    reorderValues,
    labelTable,
    horizontalView,
    image,
  } = useScoreSheetMultiContext();
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
    const fileExt = (image as File)?.name.split(".").pop();
    const filePath = `${uuidv4()}.${fileExt}`;

    const data = {
      max_player,
      min_player,
      difficulty,
      description,
      playtime,
      isSharedToCommunity,
      gameName,
      horizontalView,
      photo: filePath ?? "",
      labels: labelTable,
      gameFields: reorderValues,
    };
    try {
      const uploadImagePromise = image
        ? supabase.storage.from("bgc_test").upload(filePath, image as File, {
            contentType: "image/png",
            upsert: false,
          })
        : Promise.resolve();

      const addGamePromise = addGame(user?.id ?? "", data);
      const [img, game] = await Promise.all([
        uploadImagePromise,
        addGamePromise,
      ]);

      if ((img as { error: any }).error || game?.status === false) {
        throw new Error("Failed to upload image or add game");
      }

      toast({
        title: `Added ${gameName} to your inventory!`,
        className: "bg-white",
      });
    } catch (e) {
      console.error(e);
      toast({
        title: `Failed to add ${gameName} to your inventory`,
        className: "bg-red-500",
      });
    } finally {
      router.push("/dashboard");
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

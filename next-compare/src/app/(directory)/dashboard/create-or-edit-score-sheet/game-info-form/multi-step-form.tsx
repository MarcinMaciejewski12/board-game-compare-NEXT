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
import GameInfoForm, {
  FormFields,
} from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/game-info-form";
import { v4 as uuidv4 } from "uuid";
import supabase from "@/lib/supabaseClient";
import { SubmitHandler, useForm } from "react-hook-form";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const { reorderValues, labelTable, horizontalView, image } =
    useScoreSheetMultiContext();
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<FormFields>();

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const onSubmit: SubmitHandler<FormFields> = async (e: FormFields) => {
    const fileExt = (image as File)?.name.split(".").pop();
    const filePath = `${uuidv4()}.${fileExt}`;

    const data = {
      max_player: e.max_player,
      min_player: e.min_player,
      difficulty: e.difficulty,
      description: e.description,
      playtime: e.playtime,
      isSharedToCommunity: e.isSharedToCommunity,
      gameName: e.gameName,
      horizontalView,
      photo: filePath ?? "",
      labels: labelTable,
      gameFields: reorderValues,
    };
    console.log("data", data);
    return;
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
        title: `Added ${e.gameName} to your inventory!`,
        className: "bg-white",
      });
    } catch (e) {
      console.error(e);
      toast({
        title: `Failed to add game to your inventory`,
        className: "bg-red-500",
      });
    } finally {
      router.push("/dashboard");
    }
  };

  switch (step) {
    case 1:
      return (
        <GameInfoForm
          nextStep={nextStep}
          registerSetValue={setValue}
          register={register}
        />
      );
    case 2:
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ScoreCreator prevStep={prevStep} submitStep={onSubmit} />;
        </form>
      );

    default:
      return (
        <GameInfoForm
          register={register}
          registerSetValue={setValue}
          nextStep={nextStep}
        />
      );
  }
}

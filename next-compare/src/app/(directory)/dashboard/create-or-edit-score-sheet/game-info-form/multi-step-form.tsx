"use client";
import React, { useState } from "react";
import ScoreCreator from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/score-creator";
import {
  GameInfo,
  useScoreSheetMultiContext,
} from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { addGame } from "@/app/(directory)/dashboard/create-or-edit-score-sheet/actions";
import GameInfoForm, {
  FormFields,
} from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/game-info-form";
import { v4 as uuidv4 } from "uuid";
import supabase from "@/lib/supabaseClient";
import { SubmitHandler, useForm } from "react-hook-form";

export default function MultiStepForm() {
  const [step, setStep] = useState(2);
  const { toast } = useToast();

  const { reorderValues, labelTable, horizontalView } =
    useScoreSheetMultiContext();

  const { user } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormFields>();

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const onSubmit: SubmitHandler<FormFields> = async (e: FormFields) => {
    const fileExt = e.gamePhoto?.[0]?.name.split(".").pop();
    const filePath = fileExt ? `${uuidv4()}.${fileExt}` : "";
    const data = {
      max_player: e.max_player,
      min_player: e.min_player,
      difficulty: Number(e.difficulty),
      description: e.description,
      playtime: e.playtime,
      isSharedToCommunity: e.isSharedToCommunity,
      gameName: e.gameName,
      horizontalView,
      photo: filePath ?? "",
      labels: labelTable,
      gameFields: reorderValues,
    };
    console.log(filePath);
    try {
      const uploadImagePromise =
        e.gamePhoto && e.gamePhoto[0]
          ? supabase.storage.from("bgc_test").upload(filePath, e.gamePhoto[0], {
              contentType: "image/png",
              upsert: false,
            })
          : Promise.resolve();

      const addGamePromise = addGame(user?.id ?? "", data);
      const [img, game] = await Promise.all([
        uploadImagePromise,
        addGamePromise,
      ]);

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

  return (
    // TODO: create a multistep path view(currently step and what step user actually is)
    <form onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && (
        <GameInfoForm
          nextStep={nextStep}
          registerSetValue={setValue}
          register={register}
          errors={errors}
          trigger={trigger}
          watch={watch}
        />
      )}
      {step === 2 && <ScoreCreator prevStep={prevStep} />}
    </form>
  );
}

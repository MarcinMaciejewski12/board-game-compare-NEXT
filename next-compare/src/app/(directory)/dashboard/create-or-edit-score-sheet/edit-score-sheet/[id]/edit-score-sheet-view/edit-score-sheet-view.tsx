"use client";
import React from "react";
import ScoreCreator from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/score-creator";
import { useScoreSheetMultiContext } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import { saveEditedGame } from "@/app/(directory)/dashboard/create-or-edit-score-sheet/actions";
import { FormFields } from "../../../game-info-form/game-info-form";
import { SubmitHandler } from "react-hook-form";

export default function EditScoreSheetView({ id }: { id: string }) {
  const { gameName, reorderValues } = useScoreSheetMultiContext();
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormFields> = async (e: FormFields) => {
    const data = { gameFields: reorderValues };
    try {
      const res = await saveEditedGame(user?.id ?? "", data, id);
      if (!res.status) {
        toast({
          title: `Failed to edit game`,
          className: "bg-red-500 text-white",
        });
      } else {
        toast({
          title: `${gameName} is edited successfully`,
          className: "bg-white",
        });
      }
    } catch (e) {
      console.error(e);
      throw new Error("Failed to edit game");
    } finally {
      router.push("/dashboard");
    }
  };

  return <ScoreCreator editedScoreSheetId={id} />;
}

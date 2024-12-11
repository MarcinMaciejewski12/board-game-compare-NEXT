"use client";
import React from "react";
import ScoreCreator from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/score-creator";
import { useScoreSheetMultiContext } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import { saveEditedGame } from "@/app/(directory)/dashboard/create-or-edit-score-sheet/actions";

export default function EditScoreSheetView({ id }: { id: string }) {
  const { gameName, reorderValues } = useScoreSheetMultiContext();
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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

  return <ScoreCreator submitStep={onSubmit} editedScoreSheetId={id} />;
}

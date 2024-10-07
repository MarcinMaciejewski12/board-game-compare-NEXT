"use client";
import React from "react";
import ScoreCreator from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/score-creator";
import axios from "axios";
import { useScoreSheetMultiContext } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function EditScoreSheetView({ id }: { id: string }) {
  const { gameName, reorderValues } = useScoreSheetMultiContext();
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { gameFields: reorderValues, user: user?.id };
    try {
      axios.put(`/api/add-or-edit-score-sheet?id=${id}`, data).then(() => {
        router.push("/dashboard");
        toast({
          title: `${gameName} is edited!`,
          className: "bg-white",
        });
      });
    } catch (e) {
      console.error(e);
    }
  };

  return <ScoreCreator submitStep={onSubmit} editedScoreSheetId={id} />;
}

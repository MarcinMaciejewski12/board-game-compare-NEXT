"use client";
import { Reorder } from "framer-motion";
import { Button } from "@/components/button";
import React, { useEffect, useRef } from "react";
import { useScoreSheetMultiContext } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import { useRouter } from "next/navigation";
import ReorderItem from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/components/reorder-items";
import { cn } from "@/lib/utils";
import { MoveHorizontal } from "lucide-react";
import { getEditingGameFields } from "@/app/(directory)/dashboard/create-or-edit-score-sheet/actions";
import { SubmitHandler } from "react-hook-form";
import { FormFields } from "./game-info-form";

interface ScoreCreatorProps {
  prevStep?: () => void;
  editedScoreSheetId?: string;
}

export default function ScoreCreator({
  editedScoreSheetId,
  prevStep,
}: ScoreCreatorProps) {
  const {
    reorderValues,
    setReorderValues,
    setGameName,
    gameName,
    horizontalView,
    setHorizontalView,
  } = useScoreSheetMultiContext();

  const router = useRouter();

  useEffect(() => {
    if (editedScoreSheetId) {
      const getEditedFields = async () => {
        try {
          const res = await getEditingGameFields(editedScoreSheetId);
          if (!res.status) {
            console.error("Failed to get edited fields");
            router.push("/dashboard");
          } else {
            setGameName(res.data?.gameName ?? "");
            setReorderValues(
              Array.isArray(res.data?.result) ? res.data.result : [],
            );
          }
        } catch (e) {
          console.error(e);
        }
      };
      getEditedFields();
    }
  }, [editedScoreSheetId]);

  const addGameFieldHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newField = {
      id: reorderValues.length + Math.floor(Math.random() * 1e11),
      placeholder: "Field name",
      color: "#fff",
    };
    setReorderValues((prevState) => [...prevState, newField]);
  };

  return (
    <div className="w-full h-full py-20">
      {/*DISPLAY GAME NAME IN EDIT MODE*/}
      <div className="w-full flex justify-center">
        {editedScoreSheetId && (
          <h1 className="text-[52px] lg:text-[72px] text-default font-extrabold">
            {gameName}
          </h1>
        )}
      </div>

      {/*STATIC GAME FIELDS CONTAINER*/}
      <div className="w-full h-32 flex justify-center mb-2">
        <div className="w-72 h-full bg-white rounded-xl shadow-lg">
          <div className="w-full h-[50%] flex items-center justify-center">
            <span className="text-2xl text-default ">Score fields</span>
          </div>
          <div className="w-full h-[50%] flex justify-around items-center">
            <Button
              nameToDisplay="Add score field"
              variant="withoutBackground"
              size="sm"
              onClick={addGameFieldHandler}
            />
            <MoveHorizontal
              className={"cursor-pointer"}
              onClick={() => setHorizontalView(!horizontalView)}
            />
          </div>
        </div>
      </div>

      <Reorder.Group
        onReorder={setReorderValues}
        values={reorderValues}
        axis={horizontalView ? "x" : "y"}
        className={cn(
          "flex w-full gap-2 items-center",
          horizontalView
            ? "overflow-x-auto flex-row h-72 items-start"
            : "flex-col max-h-96 overflow-y-auto",
        )}
      >
        <ReorderItem id={editedScoreSheetId} />
      </Reorder.Group>
      <div className="flex items-center justify-center mt-2">
        <Button
          nameToDisplay={editedScoreSheetId ? "Save changes" : "Save new board"}
          variant="default"
          size="lg"
          type="submit"
        />
      </div>
    </div>
  );
}

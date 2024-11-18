"use client";
import { Reorder } from "framer-motion";
import { Button } from "@/components/button";
import React, { useEffect, useRef, useState } from "react";
import { useScoreSheetMultiContext } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import axios from "axios";
import { useParams } from "next/navigation";
import ReorderItem from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/components/reorder-items";
import { cn } from "@/lib/utils";
import { MoveHorizontal } from "lucide-react";

interface ScoreCreatorProps {
  submitStep: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  prevStep?: () => void;
  editedScoreSheetId?: string;
}

export default function ScoreCreator({
  submitStep,
  editedScoreSheetId,
  prevStep,
}: ScoreCreatorProps) {
  const popover = useRef<HTMLDivElement>(null);

  const {
    reorderValues,
    setReorderValues,
    setGameName,
    gameName,
    horizontalView,
    setHorizontalView,
  } = useScoreSheetMultiContext();

  const { id } = useParams();

  useEffect(() => {
    if (editedScoreSheetId) {
      const getEditedFields = async () => {
        try {
          const data = await axios.get(
            `/api/user-games/get-user-games/get-particular-game?id=${editedScoreSheetId}`,
          );
          const scoreSheet = JSON.parse(data.data.result[0].score_sheet);
          setGameName(data.data.result[0].game_name);
          setReorderValues(scoreSheet);
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
    <div className="w-full h-full">
      {/*DISPLAY GAME NAME IN EDIT MODE*/}
      <div className="w-full flex justify-center">
        {id && (
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
            ? "overflow-x-auto flex-row"
            : "flex-col max-h-96 overflow-y-auto",
        )}
      >
        <ReorderItem id={id} popover={popover} />
      </Reorder.Group>
      <div className="flex items-center justify-center mt-2">
        <Button
          nameToDisplay={editedScoreSheetId ? "Save changes" : "Save new board"}
          variant="default"
          size="lg"
          onClick={submitStep}
        />
      </div>
    </div>
  );
}

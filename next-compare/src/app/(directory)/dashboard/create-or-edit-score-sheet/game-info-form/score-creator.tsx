"use client";
import { Reorder } from "framer-motion";
import { Button } from "@/components/button";
import React, { useEffect, useRef } from "react";
import { useScoreSheetMultiContext } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import axios from "axios";
import { useParams } from "next/navigation";
import ReorderItem from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/components/reorder-items";

interface ScoreCreatorProps {
  submitStep: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  prevStep?: () => void;
  editedScoreSheetId?: string;
}

export default function ScoreCreator({
  submitStep,
  // prevStep,
  editedScoreSheetId,
}: ScoreCreatorProps) {
  const popover = useRef<HTMLDivElement>(null);
  const {
    openIndex,
    setOpenIndex,
    color,
    setColor,
    reorderValues,
    setReorderValues,
    setGameName,
    gameName,
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
    <div className="flex flex-col">
      <>
        {id && (
          <h1 className="text-[52px] lg:text-[72px] text-default font-extrabold">
            {gameName}
          </h1>
        )}
      </>
      <>
        <div className="w-full flex items-center justify-center">
          <div className="w-52 lg:w-72 border border-black bg-white h-24 flex items-center rounded-lg justify-center p-4 mb-4">
            <span className="text-2xl text-default">Game fields</span>
          </div>
        </div>

        {/*REORDER GROUP SECTION*/}
        <Reorder.Group
          onReorder={setReorderValues}
          values={reorderValues}
          axis="y"
          className="flex w-full items-center flex-col gap-4"
        >
          <ReorderItem
            id={id}
            reorderValues={reorderValues}
            reorderValuesSetter={setReorderValues}
            openIndex={openIndex}
            openIndexSetter={setOpenIndex}
            color={color}
            colorSetter={setColor}
            popover={popover}
          />
        </Reorder.Group>
      </>

      {/*BUTTON SECTION*/}
      <div className="flex items-center justify-center flex-col lg:max-w-72 gap-4 p-5">
        <Button
          className="mt-4"
          nameToDisplay="Add score field"
          variant="withoutBackground"
          size="lg"
          onClick={(e) => addGameFieldHandler(e)}
        />
        <Button
          className="mt-4"
          nameToDisplay={
            editedScoreSheetId ? "Edit score board" : "Save score board"
          }
          variant="default"
          size="lg"
          //@ts-ignore
          onClick={(e) => submitStep(e)}
        />
      </div>
    </div>
  );
}

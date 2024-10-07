"use client";
import { Reorder } from "framer-motion";
import { Input } from "@/components/input";
import { HexColorPicker } from "react-colorful";
import { X } from "lucide-react";
import { Button } from "@/components/button";
import React, { useEffect, useRef } from "react";
import { useScoreSheetMultiContext } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import axios from "axios";

interface ScoreCreatorProps {
  submitStep: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  prevStep?: () => void;
  editedScoreSheetId?: string;
}
// TODO: Refactor needed(move functions to dedicated lib folder)
export default function ScoreCreator({
  submitStep,
  prevStep,
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

  const handleToggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setColor(reorderValues[index].color);
      setOpenIndex(index);
    }
  };

  const handleColorChange = (color: string) => {
    setColor(color);
    if (openIndex !== null) {
      setReorderValues((prevState) =>
        prevState.map((item, idx) =>
          idx === openIndex ? { ...item, color } : item,
        ),
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popover.current && !popover.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newPlaceholder = e.target.value;
    setReorderValues((prevState) =>
      prevState.map((item, idx) =>
        idx === index ? { ...item, placeholder: newPlaceholder } : item,
      ),
    );
  };

  const removeReorderItem = (id: number) => {
    const filterAndRemoveGameField = reorderValues.filter(
      (item) => item.id !== id,
    );

    setReorderValues(filterAndRemoveGameField);
  };

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
    <main>
      {gameName && <h1>{gameName}</h1>}
      <div>
        <div className="w-72 border border-black bg-white h-24 flex items-center rounded-lg justify-center p-4 mb-4">
          <span className="text-2xl text-default">Game fields</span>
        </div>
        <Reorder.Group
          onReorder={setReorderValues}
          values={reorderValues}
          className="flex min-h-full flex-col gap-4"
          axis="y"
        >
          {reorderValues.map((reorder, index) => {
            return (
              <Reorder.Item
                value={reorder}
                key={reorder.id}
                className="flex gap-4 w-full items-center"
                dragListener={!(openIndex === index)}
              >
                <div
                  style={{ backgroundColor: reorder.color }}
                  className="bg-white h-24  border border-black rounded-lg flex items-center justify-center"
                >
                  <Input
                    style={{ backgroundColor: reorder.color }}
                    className="border-none"
                    placeholder="Field name"
                    type="text"
                    value={reorder.placeholder}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                <div className="relative">
                  <div className="flex gap-3 items-center">
                    <div
                      style={{ backgroundColor: reorder.color }}
                      onClick={() => {
                        handleToggle(index);
                      }}
                      className="w-[38px] h-[38px] rounded-lg border-[2px] border-white cursor-pointer shadow-colorPicker"
                    />
                  </div>
                  {openIndex === index && (
                    <div
                      className="absolute left-0 rounded-[9px] shadow-colorPicker z-50"
                      //@ts-ignore
                      ref={popover}
                    >
                      <HexColorPicker
                        color={color}
                        onChange={handleColorChange}
                      />
                    </div>
                  )}
                </div>
                <X
                  className="h-8 w-8 cursor-pointer"
                  onClick={() => removeReorderItem(reorder.id)}
                />
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
        <div className="flex flex-col max-w-72 gap-4 mt-10 mb-10">
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
    </main>
  );
}

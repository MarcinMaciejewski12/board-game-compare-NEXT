"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Data,
  ScoreData,
} from "@/app/(directory)/dashboard/scoreboard/[id]/scoreboard-view/scoreboard-view";
import { Input } from "@/components/input";
import { Reorder } from "framer-motion";
import { Button } from "@/components/button";
import { HexColorPicker } from "react-colorful";
import { useScoreSheetMultiContext } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";

export default function EditScoreSheetView({ id }: { id: string }) {
  const {
    openIndex,
    setOpenIndex,
    color,
    setColor,
    reorderValues,
    setReorderValues,
  } = useScoreSheetMultiContext();

  useEffect(() => {
    const dataHandler = async () => {
      const data = await axios.get(
        `/api/user-games/get-user-games/get-particular-game?id=${id}`,
      );
      console.log(data);
      // setReorderValues(data.data[0]);
    };
    dataHandler();
  }, [id]);
  console.log(reorderValues);
  return (
    <div className="w-full h-full">
      <header className="flex items-center justify-center">
        <h1 className="text-[72px] text-default font-extrabold"></h1>
      </header>
      <main className="flex items-center justify-around w-full">
        <div className="">
          <div className="min-w-48 border border-black bg-white h-16 flex items-center justify-center">
            <span>
              Players name <br />
              Game fields
            </span>
          </div>
          <Reorder.Group
            onReorder={(newOrder) =>
              setReorderValues((prevData) => ({
                ...prevData,
                score_sheet: JSON.stringify(newOrder),
              }))
            }
            //@ts-ignore
            values={reorderValues.score_sheet}
            className="flex min-h-full flex-col gap-4"
            axis="y"
          >
            {reorderValues.map((item: ScoreData, index: number) => {
              return (
                <Reorder.Item
                  value={reorderValues}
                  key={item.id}
                  dragListener={!(openIndex === index)}
                >
                  <div key={item.id} className="flex">
                    <div
                      className={`min-w-48 border border-black h-16 flex items-center justify-center`}
                      style={{ backgroundColor: item.color }}
                    >
                      <Input
                        style={{ backgroundColor: item.color }}
                        className="border-none"
                        placeholder={item.placeholder}
                        type="text"
                        value={item.placeholder}
                        // onChange={(e) => handleInputChange(e, index)}
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
                          // onChange={handleColorChange}
                        />
                      </div>
                    )}
                  </div>
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
              // onClick={(e) => addGameFieldHandler(e)}!!
            />
            <Button
              className="mt-4"
              nameToDisplay="Save score board"
              variant="default"
              size="lg"
              //@ts-ignore
              // onClick={(e) => submitStep(e)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

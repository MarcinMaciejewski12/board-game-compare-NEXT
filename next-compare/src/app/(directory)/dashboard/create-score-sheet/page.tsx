"use client";
import React, { useRef, useState } from "react";
import Input from "@/components/input";
import { Reorder } from "framer-motion";
import { Button } from "@/components/button";

import { HexColorPicker } from "react-colorful";
import { X } from "lucide-react";

type ReorderValue = {
  id: number;
  placeholder: string;
  color: string;
};

export default function CreateScoreSheet() {
  const [color, setColor] = useState("#fff");
  const [reorderValues, setReorderValues] = useState<ReorderValue[]>([]);
  const [colorPalette, setColorPalette] = useState<boolean | null>(null);
  const popover = useRef();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const addGameFieldHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newField = {
      id: reorderValues.length + Number(Math.random().toFixed(4)),
      placeholder: "Field name",
      color: "#fff",
    };
    setReorderValues((prevState) => [...prevState, newField]);
  };

  const handleToggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setColor(reorderValues[index].color);
      setOpenIndex(index);
    }
  };

  const removeReorderItem = (id: number) => {
    const filterAndRemoveGameField = reorderValues.filter(
      (item) => item.id !== id,
    );

    setReorderValues(filterAndRemoveGameField);
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
  return (
    <div className="w-full flex flex-col gap-14 h-full">
      <section>
        <header className="flex justify-center">
          <Input
            inputStyle="text-[100px] text-default font-extrabold text-center rounded-lg bg-backgroundColor"
            type="text"
            placeholder="Game name"
          />
        </header>
      </section>
      <main className="flex items-center justify-center ">
        <div className="relative">
          <div className="w-72 border border-black bg-white h-24 flex items-center rounded-lg justify-center p-4 mb-4">
            <span className="text-2xl text-default">Game fields</span>
          </div>

          <Reorder.Group
            onReorder={setReorderValues}
            values={reorderValues}
            className="flex min-w-72 min-h-full flex-col gap-4"
          >
            {reorderValues.map((reorder, index) => {
              return (
                <Reorder.Item
                  value={reorder}
                  key={reorder.id}
                  className="flex gap-4 items-center overflow-x-visible"
                >
                  <div
                    style={{ backgroundColor: reorder.color }}
                    className="w-full bg-white h-24 border border-black rounded-lg flex items-center justify-center"
                  >
                    <Input
                      colorPicker={reorder.color}
                      placeholder="Field name"
                      type="text"
                      inputStyle="w-full focus:outline-none"
                    />
                  </div>
                  <div className="relative">
                    <div className="flex gap-3 items-center">
                      <div
                        style={{ backgroundColor: reorder.color }}
                        onClick={() => {
                          handleToggle(index);
                          setColorPalette(!colorPalette);
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
              className="mt-4 min-w-72"
              nameToDisplay="Add score field"
              variant="default"
              size="lg"
              onClick={(e) => addGameFieldHandler(e)}
            />
            {reorderValues.length >= 1 && (
              <Button
                nameToDisplay="Save scoresheet"
                variant="withoutBackground"
                size="lg"
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

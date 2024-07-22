"use client";
import React, { useEffect, useRef, useState } from "react";
import Input from "@/components/input";
import { Reorder } from "framer-motion";
import { Button } from "@/components/button";

import { HexColorPicker } from "react-colorful";
export default function CreateScoreSheet() {
  const [reorderValues, setReorderValues] = useState<
    { fieldName: string; fieldColor: string }[]
  >([]);
  const [color, setColor] = useState("#fff");

  const addScoreFieldHandler = (data: {
    fieldName: string;
    fieldColor: string;
  }) => {
    setReorderValues([...reorderValues, data]);
  };
  console.log(reorderValues);
  return (
    <div className="w-full flex flex-col gap-14 h-full">
      <header className="h-48 flex items-center justify-center">
        <h1 className="text-[100px] text-default font-extrabold">
          <Input
            inputStyle={
              "text-center border-2 border-solid border-opacity-30 rounded-lg bg-backgroundColor border-black"
            }
            type={"text"}
            placeholder={"Game name"}
          />
        </h1>
      </header>
      <main>
        <div className="flex w-full flex-col gap-4 h-full justify-center items-center">
          <div className="w-40 min-w-40 border border-black bg-white h-16 flex items-center justify-center p-4">
            <span>Game fields</span>
          </div>
          <Reorder.Group values={reorderValues} onReorder={setReorderValues}>
            {reorderValues.map((item) => {
              const { fieldName, fieldColor } = item;
              return (
                <Reorder.Item
                  key={fieldName}
                  style={{ backgroundColor: `${fieldColor}` }}
                  value={fieldName}
                >
                  <div className="flex w-full flex-col gap-4 h-full justify-center items-center">
                    <div className="w-40 min-w-40 border border-black bg-white h-16 flex items-center justify-center p-4">
                      {fieldName}
                    </div>
                  </div>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
          <Button nameToDisplay="Add score field" variant="default" size="lg" />
          {/*<div*/}
          {/*  onClick={() =>*/}
          {/*    showColorPalette ? setShowColorPalette(false) : null*/}
          {/*  }*/}
          {/*>*/}
          {/*  <Dialog>*/}
          {/*    <DialogTrigger>*/}
          {/*      <Button*/}
          {/*        nameToDisplay="Add score field"*/}
          {/*        variant="default"*/}
          {/*        size="lg"*/}
          {/*      />*/}
          {/*    </DialogTrigger>*/}
          {/*    <DialogContent>*/}
          {/*      <DialogHeader>*/}
          {/*        <DialogTitle className="text-white text-2xl font-bold">*/}
          {/*          Add you're own point field!*/}
          {/*        </DialogTitle>*/}
          {/*      </DialogHeader>*/}
          {/*      <div className="w-full h-52 p-4">*/}
          {/*        <Input*/}
          {/*          colorPicker={color}*/}
          {/*          inputStyle={`w-full h-16 border-[0.5px] border-black border-opacity-30 rounded-lg mb-2`}*/}
          {/*          type={"text"}*/}
          {/*          placeholder={"Field Name"}*/}
          {/*        />*/}
          {/*        <div className="relative">*/}
          {/*          <div className="flex gap-3 items-center">*/}
          {/*            <span className="text-white text-xl">*/}
          {/*              Choose field color*/}
          {/*            </span>*/}
          {/*            <div*/}
          {/*              style={{ backgroundColor: color }}*/}
          {/*              onClick={() => setShowColorPalette(!showColorPalette)}*/}
          {/*              className="w-[28px] h-[28px] rounded-lg border-[2px] border-white cursor-pointer shadow-colorPicker"*/}
          {/*            />*/}
          {/*          </div>*/}
          {/*          {showColorPalette && (*/}
          {/*            <div*/}
          {/*              className="absolute left-0 rounded-[9px] shadow-colorPicker"*/}
          {/*              //@ts-ignore*/}
          {/*              ref={popover}*/}
          {/*            >*/}
          {/*              <HexColorPicker color={color} onChange={setColor} />*/}
          {/*            </div>*/}
          {/*          )}*/}
          {/*        </div>*/}
          {/*        <Button*/}
          {/*          nameToDisplay={"Add field"}*/}
          {/*          size={"default"}*/}
          {/*          variant="default"*/}
          {/*          onClick={() =>*/}
          {/*            addScoreFieldHandler({*/}
          {/*              fieldName: "asdq",*/}
          {/*              fieldColor: color ?? "fff",*/}
          {/*            })*/}
          {/*          }*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    </DialogContent>*/}
          {/*  </Dialog>*/}
          {/*</div>*/}
        </div>
      </main>
    </div>
  );
}

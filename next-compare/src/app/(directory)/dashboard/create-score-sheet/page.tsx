"use client";
import { useState } from "react";
import Input from "@/components/input";

import { Reorder } from "framer-motion";
import { Button } from "@/components/button";

export default function CreateScoreSheet() {
  const [scoreBoardName, setScoreBoardGame] = useState("");
  const [reorderValues, setReorderValues] = useState([
    { fieldName: "", fieldColor: "" },
  ]);

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
        <div className="flex w-full h-full justify-center items-center bg-red-600">
          <div>siemano</div>
          <Reorder.Group values={reorderValues} onReorder={setReorderValues}>
            {reorderValues.map((item) => (
              <Reorder.Item
                key={item.fieldName}
                style={{ backgroundColor: `${item.fieldColor}` }}
                value={item.fieldName}
              >
                {item.fieldName}
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        <Button nameToDisplay="Add score field" variant="default" size="lg" />
      </main>
    </div>
  );
}

"use client";
import React, { useRef, useState } from "react";
import Input from "@/components/input";
import { Reorder } from "framer-motion";
import { Button } from "@/components/button";

import { HexColorPicker } from "react-colorful";
import { X } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

type ReorderValue = {
  id: number;
  placeholder: string;
  color: string;
};

interface GameInfo {
  max_player: number;
  min_player: number;
  difficulty: number;
  playtime: string;
  isSharedToCommunity: boolean;
}
// TODO: REFACTOR NEEDED
export default function CreateScoreSheet() {
  const [color, setColor] = useState("#fff");
  const [gameName, setGameName] = useState("");
  const [reorderValues, setReorderValues] = useState<ReorderValue[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [gameInfo, setGameInfo] = useState<GameInfo>({
    max_player: 0,
    min_player: 0,
    difficulty: 0,
    playtime: "",
    isSharedToCommunity: false,
  });
  const [isAriaChecked, setIsAriaChecked] = useState<boolean>(false);
  const popover = useRef();
  const { user } = useUser();

  const addGameFieldHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newField = {
      id: reorderValues.length + Math.floor(Math.random() * 1e11),
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

  const gameNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGameName(value);
  };

  const dialogHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setGameInfo((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? isAriaChecked : value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      details: gameInfo,
      gameFields: reorderValues,
      user_id: user?.id,
      gameName: gameName,
    };

    axios.post("/api/new-score-sheet", { body: data });
  };
  return (
    <div className="w-full flex gap-14 p-20 overflow-y-hidden">
      <div className="w-1/2  flex justify-center p-4">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="flex flex-col gap-4 justify-start items-start w-5/6 ">
            <section className="flex items-center justify-center gap-4">
              <Input
                inputStyle=""
                value={gameName}
                placeholder="Game name"
                type="text"
                onChange={gameNameInputChange}
              />
              <span className="text-xl w-[7rem] text-white font-medium">
                Players:
              </span>

              <Input
                name="min_player"
                onChange={dialogHandler}
                inputStyle="max-w-32"
                type="number"
                placeholder="Min players"
              />
              <span className="text-white font-extrabold">-</span>
              <Input
                name="max_player"
                onChange={dialogHandler}
                inputStyle="max-w-32"
                type="number"
                placeholder="Max players"
              />
            </section>
            <section className="flex items-center justify-center gap-4">
              <span className="text-xl w-[7rem] text-white font-medium">
                Difficulty:
              </span>
              <Input
                inputStyle=""
                type="number"
                max={10}
                min={1}
                placeholder="Difficulty"
                name="difficulty"
                value={Number(gameInfo.difficulty)}
                onChange={dialogHandler}
              />
              <span className="text-white">/10</span>
            </section>
            <section className="flex items-center justify-center gap-4">
              <span className="text-xl w-[7rem] text-white font-medium">
                Playtime:
              </span>
              <Input
                inputStyle=""
                type="number"
                placeholder="Playtime"
                name="playtime"
                value={Number(gameInfo.playtime)}
                onChange={dialogHandler}
              />{" "}
              <div className="flex items-end h-full">
                <span className="text-white">min</span>
              </div>
            </section>
            <section>
              <div className="flex gap-1 justify-center items-center font-medium">
                <input
                  type="checkbox"
                  name="isSharedToCommunity"
                  onChange={(e) => {
                    setIsAriaChecked(!isAriaChecked);
                    dialogHandler(e);
                  }}
                />
                <span className="text-sm text-white">
                  Share with community (other gamers could use your score
                  board!)
                </span>
              </div>
            </section>
            <div className="w-full flex justify-end mt-4">
              <Button
                nameToDisplay={"Save score sheet"}
                variant="default"
                size="lg"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>

      <main className="flex items-center justify-center overflow-auto">
        <div className="relative">
          <div className="w-72 border border-black bg-white h-24 flex items-center rounded-lg justify-center p-4 mb-4">
            <span className="text-2xl text-default">Game fields</span>
          </div>

          <Reorder.Group
            onReorder={setReorderValues}
            values={reorderValues}
            className="flex min-w-72 min-h-full flex-col gap-4"
            axis="y"
          >
            {reorderValues.map((reorder, index) => {
              return (
                <Reorder.Item
                  value={reorder}
                  key={reorder.id}
                  className="flex gap-4 items-center"
                  dragListener={!(openIndex === index)}
                >
                  <div
                    style={{ backgroundColor: reorder.color }}
                    className="bg-white h-24 border border-black rounded-lg flex items-center justify-center"
                  >
                    <Input
                      colorPicker={reorder.color}
                      placeholder="Field name"
                      type="text"
                      inputStyle="w-72 focus:outline-none text-center text-2xl"
                      onChangeFunction={(e) => handleInputChange(e, index)}
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
          </div>
        </div>
      </main>
    </div>
  );
}

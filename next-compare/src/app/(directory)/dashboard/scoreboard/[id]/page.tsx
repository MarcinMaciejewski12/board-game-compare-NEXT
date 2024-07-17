"use client";
import { ChangeEvent, JSX, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/button";
import axios from "axios";
import { auth, getAuth } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import Input from "@/components/input";

const MOCKED_TABLE = {
  gameName: "7 Wonders",
  minPlayers: 3,
  maxPlayers: 7,
  uniqueBoardId: "qP2d531fypsfwefwwq25adhthrhxcvmlpoy",
  gameScoreBoard: [
    { fieldName: "War", fieldColor: "red" },
    { fieldName: "Coins", fieldColor: "white" },
    { fieldName: "Wonders", fieldColor: "white" },
    { fieldName: "", fieldColor: "yellow" },
    { fieldName: "", fieldColor: "purple" },
    { fieldName: "", fieldColor: "green" },
    { fieldName: "", fieldColor: "blue" },
  ],
};

export default function Scoreboard() {
  const { user } = useUser();

  const [playerCount, setPlayerCount] = useState<number>(0);
  const [playerInputs, setPlayerInputs] = useState<
    Array<{ [key: string]: string }>
  >([]);

  const addPlayer = () => {
    setPlayerCount(playerCount + 1);
    setPlayerInputs([...playerInputs, {}]);
  };

  const handleInputChange = (
    playerIndex: number,
    fieldName: string,
    value: string,
  ) => {
    const newPlayerInputs = [...playerInputs];
    newPlayerInputs[playerIndex] = {
      ...newPlayerInputs[playerIndex],
      [fieldName]: value,
    };
    setTimeout(() => {
      setPlayerInputs(newPlayerInputs);
    }, 200);
  };
  const sendPlayedGame = async () => {
    const data = {
      user_id: user?.id,
      unique_board_id: MOCKED_TABLE.uniqueBoardId,
      game_score_board: JSON.stringify(playerInputs),
    };

    return await axios.post("/api/played-games", { body: data });
  };

  return (
    <div className="w-full h-full">
      <header className="h-48 flex items-center justify-center">
        <h1 className="text-[100px] text-default font-extrabold">
          {MOCKED_TABLE.gameName}
        </h1>
      </header>
      <main className="flex w-full justify-center items-center">
        <div
          className=" w-[90vw] max-h-full bg-red-500 overflow-auto"
          id="players input"
        >
          <div className="flex items-center w-[90vw] ">
            <div className="w-40 min-w-40 border border-black bg-white h-16 flex items-center justify-center p-4">
              <span>
                Players name / <br />
                Game fields
              </span>
            </div>

            {Array.from({ length: playerCount }).map((_, playerIndex) => (
              <Input
                index={playerIndex}
                inputStyle={"border border-black h-16"}
                placeholder={`Player ${playerIndex + 1} name`}
                type={"text"}
                onChangeFunction={(e) =>
                  handleInputChange(playerIndex, "name", e.target.value)
                }
              />
            ))}
          </div>
          <div>
            {MOCKED_TABLE.gameScoreBoard.map((item, fieldIndex) => (
              <div key={fieldIndex} className="flex">
                <div
                  className={`w-40 min-w-40 border border-black h-16 flex items-center justify-center`}
                  style={{ backgroundColor: item.fieldColor }}
                >
                  <span>{item.fieldName}</span>
                </div>
                {Array.from({ length: playerCount }).map((_, playerIndex) => (
                  <Input
                    index={playerIndex}
                    placeholder={`Player ${playerIndex + 1} ${item.fieldName}`}
                    inputStyle={"border border-black h-16"}
                    type={"number"}
                    onChangeFunction={(e) =>
                      handleInputChange(
                        playerIndex,
                        item.fieldName === ""
                          ? item.fieldColor
                          : item.fieldName,
                        e.target.value,
                      )
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="w-full flex items-center justify-center">
        <div className="w-[90vw]">
          {!(playerCount >= MOCKED_TABLE.maxPlayers) && (
            <div className="w-full flex items-center justify-start">
              <button className="flex cursor-pointer" onClick={addPlayer}>
                Add player
                <Plus className="cursor-pointer" />
              </button>
            </div>
          )}
          <div className="flex flex-col items-center justify-center">
            <Button
              onClick={() => sendPlayedGame()}
              nameToDisplay={"Save scoresheet"}
              variant="default"
              size="xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

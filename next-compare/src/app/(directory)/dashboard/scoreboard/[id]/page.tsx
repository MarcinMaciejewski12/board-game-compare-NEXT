"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import axios from "axios";
import Input from "@/components/input";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface Data {
  board_id: string;
  game_name: string;
  max_players: number;
  score_sheet: string;
}

interface ScoreData {
  color: string;
  id: number;
  placeholder: string;
}

export default function Scoreboard() {
  const [data, setData] = useState<Data>({
    board_id: "",
    game_name: "",
    max_players: 0,
    score_sheet: "[]",
  });
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [playerInputs, setPlayerInputs] = useState<
    Array<{ [key: string]: string }>
  >([]);
  const { user } = useUser();
  const pathname = usePathname().split("/").pop();
  const scoreData = JSON.parse(data.score_sheet) as ScoreData[];

  useEffect(() => {
    const dataHandler = async () => {
      const data = await axios.get(
        `/api/user-games/get-user-games/get-particular-game?id=${pathname}`,
      );
      setData(data.data[0]);
    };
    dataHandler();
  }, [pathname]);

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
    setPlayerInputs(newPlayerInputs);
  };

  const sendPlayedGame = async () => {
    const data = {
      user_id: user?.id,
      unique_board_id: pathname,
      game_score_board: JSON.stringify(playerInputs),
    };

    return await axios.post("/api/played-games", data);
  };

  return (
    <div className="w-full h-full">
      <header className="h-48 flex items-center justify-center">
        <h1 className="text-[100px] text-default font-extrabold">
          {data?.game_name}
        </h1>
      </header>
      <main className="flex max-w-[90vw] justify-center items-center">
        <div className="max-h-full overflow-auto">
          <div className="flex items-center justify-center">
            <div className="w-40 min-w-40 border border-black bg-white h-16 flex items-center justify-center p-4">
              <span>
                Players name / <br />
                Game fields
              </span>
            </div>

            {Array.from({ length: playerCount }).map((_, playerIndex) => (
              <Input
                key={playerIndex}
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
            {scoreData.map((item, fieldIndex) => (
              <div key={item.id} className="flex items-center justify-center">
                <div
                  className={`w-40 min-w-40 border border-black h-16 flex items-center justify-center`}
                  style={{ backgroundColor: item.color }}
                >
                  <span>{item.placeholder}</span>
                </div>
                {Array.from({ length: playerCount }).map((_, playerIndex) => (
                  <Input
                    key={playerIndex}
                    index={playerIndex}
                    placeholder={`Player ${playerIndex + 1} ${item.placeholder}`}
                    inputStyle={"border border-black h-16"}
                    type={"number"}
                    onChangeFunction={(e) =>
                      handleInputChange(
                        playerIndex,
                        item.placeholder === "" ? item.color : item.placeholder,
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
          {!(playerCount >= data.max_players) && (
            <div className="w-full flex items-center justify-center mt-4">
              <Button
                nameToDisplay="Add player"
                className="flex font-medium cursor-pointer justify-center  items-center"
                onClick={addPlayer}
                size="sm"
                variant="withoutBackground"
              />
            </div>
          )}
          <div className="flex flex-col mt-4 items-center justify-center">
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

"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import axios from "axios";
import { Input } from "@/components/input";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Data,
  ScoreData,
} from "@/app/(directory)/dashboard/lib/dashboard-types";

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
  const router = useRouter();

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
    const playerScores = playerInputs.map((inputs, playerIndex) => ({
      ...inputs,
      totalScore: totalScore(playerIndex),
    }));

    const data = {
      user_id: user?.id,
      unique_board_id: pathname,
      game_score_board: JSON.stringify(playerScores),
    };

    try {
      await axios.post("/api/played-games", data);
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  const totalScore = (playerIndex: number) => {
    return scoreData.reduce((sum, item) => {
      const key = item?.placeholder === "" ? item.color : item.placeholder;

      return sum + parseInt(playerInputs[playerIndex]?.[key] || "0", 10);
    }, 0);
  };
  console.log(totalScore(1));
  return (
    <div className="w-full h-full">
      <header className="flex items-center justify-center">
        <h1 className="text-[72px] text-default font-extrabold">
          {data?.game_name}
        </h1>
      </header>
      <main className="flex items-center justify-around w-full">
        <div className="overflow-y-auto">
          <div className="flex">
            <div className="min-w-48 border border-black bg-white h-16 flex items-center justify-center">
              <span>
                Players name <br />
                Game fields
              </span>
            </div>
            {Array.from({ length: playerCount }).map((_, playerIndex) => (
              <Input
                className="p-2 lg:h-16"
                key={playerIndex}
                placeholder={`Player ${playerIndex + 1} name`}
                type={"text"}
                onChange={(e) =>
                  handleInputChange(playerIndex, "name", e.target.value)
                }
              />
            ))}
          </div>
          {scoreData.map((item, fieldIndex) => (
            <div key={item.id} className="flex">
              <div
                className={`min-w-48 border border-black h-16 flex items-center justify-center`}
                style={{ backgroundColor: item.color }}
              >
                <span>{item.placeholder}</span>
              </div>
              {Array.from({ length: playerCount }).map((_, playerIndex) => (
                <Input
                  className="p-2 lg:h-16"
                  key={playerIndex}
                  placeholder={`Player ${playerIndex + 1} ${item.placeholder}`}
                  type={"number"}
                  onChange={(e) =>
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
          {/*SUMMARY ROW*/}
          <div className="flex">
            <div className="min-w-48 border border-black bg-white h-10 flex items-center justify-center">
              Total
            </div>
            <div className="flex">
              {Array.from({ length: playerCount }).map((_, playerIndex) => (
                <Input
                  className="p-2 lg:h-10"
                  key={playerIndex}
                  value={totalScore(playerIndex)}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      </main>
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
  );
}

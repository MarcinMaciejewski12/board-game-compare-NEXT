"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

export interface Data {
  board_id: string;
  game_name: string;
  max_players: number;
  score_sheet: string;
  horizontal: boolean;
}

export interface ScoreData {
  color: string;
  id: number;
  placeholder: string;
}

export default function ScoreboardView() {
  const [data, setData] = useState<Data | null>(null);
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [playerInputs, setPlayerInputs] = useState<
    Array<{ [key: string]: string }>
  >([]);
  const [inputFields, setInputFields] = useState<{}[] | null>(null);
  const { user } = useUser();
  const pathname = usePathname().split("/").pop();
  const scoreData = JSON.parse(data?.score_sheet ?? "[]") as ScoreData[];
  const router = useRouter();

  useEffect(() => {
    const dataHandler = async () => {
      const data = await axios.get(
        `/api/user-games/get-user-games/get-particular-game?id=${pathname}`,
      );

      setData(data.data.result[0]);
    };
    dataHandler();
  }, [pathname]);

  const addPlayer = () => {
    setPlayerCount(playerCount + 1);
    const newInputs = scoreData.map((score) => ({
      [score.placeholder || score.color]: "", // Przykładowo placeholder lub color z score
    }));

    setInputFields((prevState) => [
      ...(prevState || []),
      {
        name: `Player ${playerCount + 1} name`,
        fields: [...playerInputs, ...newInputs],
      },
    ]);
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

  return (
    <div className="w-full h-full">
      {/*GAME NAME*/}
      <div className="w-full flex justify-center">
        <h1 className="text-[52px] lg:text-[72px] text-default font-extrabold">
          {data?.game_name}
        </h1>
      </div>

      {/*DISPLAY SCORE FIELDS*/}
      <div className={cn("flex", data?.horizontal ? "flex-col" : "flex-row")}>
        <div
          className={cn(
            "bg-red-200 flex",
            data?.horizontal ? "flex-row" : "flex-col",
          )}
        >
          <div className="min-w-48 w-52 border border-black bg-white h-16 rounded-xl flex items-center justify-center">
            <span>
              Players name <br />
              Game fields
            </span>
          </div>
          {scoreData.map((score: ScoreData) => (
            <div
              key={score.id}
              className={`min-w-48 w-52 rounded-xl border  border-black h-16 flex items-center justify-center`}
              style={{ backgroundColor: score.color }}
            >
              <span>{score.placeholder}</span>
            </div>
          ))}
        </div>
        <DisplayPLayersAndScoresFields
          horizontal={data?.horizontal ?? false}
          playerCount={playerCount}
          handleInputChange={handleInputChange}
          scoreData={scoreData}
          inputFields={inputFields}
        />
      </div>

      <Button
        nameToDisplay="Add player"
        className="flex font-medium cursor-pointer justify-center items-center"
        onClick={addPlayer}
        size="sm"
        variant="withoutBackground"
      />
    </div>
  );
}

interface DisplayPLayersAndScoresFieldsProps {
  playerCount: number;
  handleInputChange: (
    playerIndex: number,
    fieldName: string,
    value: string,
  ) => void;
  horizontal: boolean;
  scoreData: ScoreData[];
  inputFields: any;
}

function DisplayPLayersAndScoresFields({
  playerCount,
  horizontal,
  handleInputChange,
  scoreData,
  inputFields,
}: DisplayPLayersAndScoresFieldsProps) {
  return (
    <div>
      <div className={cn("flex", horizontal ? "flex-col" : "flex-row")}>
        {inputFields?.map((fieldObject: any, idx: number) => {
          return (
            <div
              key={fieldObject.name}
              className={cn("", horizontal && "flex")}
            >
              <Input
                className="p-2 w-52 rounded-xl h-16"
                key={fieldObject.name}
                placeholder={`Player ${idx + 1} name`}
                type="text"
              />
              {fieldObject.fields.map((field: any, index: number) => {
                return Object.entries(field).map(([name, value]) => {
                  return (
                    <Input
                      className="p-2 w-52 rounded-xl h-16"
                      key={field.placeholder}
                      placeholder={name}
                      type={"text"}
                    />
                  );
                });
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

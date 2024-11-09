"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

interface DisplayPlayersFieldsProps {
  horizontal: boolean;
  inputFields: InputFields[];
  playerInputsHandler: (
    playerName: string,
    name: string,
    index: number,
  ) => void;
}

interface DisplayScoreFieldsProps {
  horizontal: boolean;
  data: ScoreData[];
}

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

interface InputFields {
  name: string;
  fields: { [key: string]: string }[];
}

export default function ScoreboardView() {
  const [data, setData] = useState<Data | null>(null);
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [inputFields, setInputFields] = useState<InputFields[] | undefined>(
    undefined,
  );
  const [nameAndPoints, setNameAndPoints] = useState<
    { [key: string]: number | string }[] | undefined
  >(undefined);

  const { user } = useUser();
  const pathname = usePathname().split("/").pop();
  const scoreData = JSON.parse(data?.score_sheet ?? "[]") as ScoreData[];
  const router = useRouter();

  // DON'T LOOK AT THIS EFFECT, DATA WILL BE EXECUTED IN SERVER ACTIONS IN THE NEAREST FUTURE
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
      [score.placeholder || score.color]: "",
    }));

    setInputFields((prevState) => [
      ...(prevState ?? []),
      {
        name: `Player ${playerCount + 1} name`,
        fields: newInputs,
      },
    ]);
  };

  const playerInputsHandler = (
    playerName: string,
    name: string,
    index: number,
  ) => {
    setNameAndPoints((prevState) => {
      const newState = [...(prevState ?? [])];
      if (!newState[index]) {
        newState[index] = {};
      }
      newState[index][name] = playerName;
      return newState;
    });
  };

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-center">
        <h1 className="text-[52px] lg:text-[72px] text-default font-extrabold">
          {data?.game_name}
        </h1>
      </div>

      <div className={cn("flex", data?.horizontal && "flex-col")}>
        {/*DISPLAY CELLS WITH SCORE FIELD NAME AND ATTACHED COLOR*/}
        <DisplayScoreFields
          data={scoreData}
          horizontal={data?.horizontal ?? false}
        />
        {/*ADDING ACTUAL DATA TO SCORE BOARD*/}
        <DisplayPlayersFields
          playerInputsHandler={playerInputsHandler}
          horizontal={data?.horizontal ?? false}
          inputFields={inputFields ?? []}
        />
      </div>

      <div className="w-full flex  justify-center mt-6">
        <div className="flex-col flex gap-4">
          {Number(data?.max_players ?? 0) > playerCount && (
            <Button
              nameToDisplay="Add player"
              onClick={addPlayer}
              size="sm"
              variant="withoutBackground"
            />
          )}
          <Button
            nameToDisplay="Show total points"
            variant="default"
            size="default"
          />
        </div>
      </div>
    </div>
  );
}

function DisplayPlayersFields({
  playerInputsHandler,
  horizontal,
  inputFields,
}: DisplayPlayersFieldsProps): React.ReactNode {
  return (
    <div className="w-full max-w-full bg-gray-300 overflow-hidden">
      <div
        className={cn(
          "flex overflow-x-auto",
          horizontal ? "flex-col" : "flex-row",
        )}
      >
        {inputFields?.map((fieldObject: InputFields, idx: number) => (
          <div key={fieldObject.name} className={cn("", horizontal && "flex")}>
            <Input
              className="p-2 w-52 rounded-xl h-16"
              key={fieldObject.name}
              placeholder={`Player ${idx + 1} name`}
              type="text"
              name={fieldObject.name}
              onChange={(e) =>
                playerInputsHandler(e.target.value, fieldObject.name, idx)
              }
            />
            {fieldObject.fields.map((field: { [p: string]: string }) => {
              return Object.entries(field).map(([name, value]) => (
                <Input
                  className="p-2 w-52 rounded-xl h-16"
                  key={idx}
                  placeholder={name}
                  name={name}
                  type="number"
                  onChange={(e) =>
                    playerInputsHandler(e.target.value, name, idx)
                  }
                />
              ));
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function DisplayScoreFields({ horizontal, data }: DisplayScoreFieldsProps) {
  return (
    <div className={cn("flex", horizontal ? "flex-row" : "flex-col")}>
      <div className="min-w-48 w-52 border border-black bg-white h-16 rounded-xl flex items-center justify-center">
        <span>
          Players name <br />
          Game fields
        </span>
      </div>
      {data.map((score: ScoreData) => (
        <div
          key={score.id}
          className={`min-w-48 w-52 rounded-xl border  border-black h-16 flex items-center justify-center`}
          style={{ backgroundColor: score.color }}
        >
          <span>{score.placeholder}</span>
        </div>
      ))}
    </div>
  );
}

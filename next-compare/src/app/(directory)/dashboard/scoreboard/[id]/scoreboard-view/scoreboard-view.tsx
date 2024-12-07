"use client";
import React, { useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";
import { ScoreboardFields } from "@/app/(directory)/dashboard/lib/dashboard-types";
import { X } from "lucide-react";
import ShowScoreResult from "@/app/(directory)/dashboard/scoreboard/[id]/scoreboard-view/score-dialog/show-score-result-dialog";

interface DisplayPlayersFieldsProps {
  horizontal: boolean;
  inputFields: InputFields[];
  playerInputsHandler: (
    playerName: string,
    name: string,
    index: number,
  ) => void;
  setInputFields: React.Dispatch<
    React.SetStateAction<InputFields[] | undefined>
  >;
}

interface DisplayScoreFieldsProps {
  horizontal: boolean;
  data: ScoreData[];
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

interface ScoreboardViewProps {
  board: ScoreboardFields | undefined;
}

export default function ScoreboardView({ board }: ScoreboardViewProps) {
  const [playerCount, setPlayerCount] = useState<number>(0);
  const [inputFields, setInputFields] = useState<InputFields[] | undefined>(
    undefined,
  );
  const [nameAndPoints, setNameAndPoints] = useState<
    { [key: string]: string }[] | undefined
  >(undefined);

  const scoreData: ScoreData[] = board?.scoreSheet ?? [];

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
          {board?.gameName}
        </h1>
      </div>

      <div className={cn("flex", board?.horizontal && "flex-col")}>
        <DisplayScoreFields
          data={scoreData}
          horizontal={board?.horizontal ?? false}
        />
        <DisplayPlayersFields
          playerInputsHandler={playerInputsHandler}
          horizontal={board?.horizontal ?? false}
          inputFields={inputFields ?? []}
          setInputFields={setInputFields}
        />
      </div>

      <div className="w-full flex  justify-center mt-6">
        <div className="flex-col flex gap-4">
          {/*IF PLAYER COUNT IS BIGGER THAN BOARD GAME MAX PLAYERS HIDE THE BUTTON*/}
          {Number(board?.maxPlayers ?? 0) > (inputFields?.length ?? 0) && (
            <Button
              nameToDisplay="Add player"
              onClick={addPlayer}
              size="sm"
              variant="withoutBackground"
            />
          )}

          <ShowScoreResult points={nameAndPoints} />
        </div>
      </div>
    </div>
  );
}

function DisplayPlayersFields({
  playerInputsHandler,
  horizontal = false,
  inputFields = [],
  setInputFields,
}: DisplayPlayersFieldsProps): React.ReactNode {
  function removePlayerHandler(index: number) {
    const filteredFields = inputFields.filter(
      (field) => field.name !== inputFields[index].name,
    );
    setInputFields(filteredFields);
  }

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div
        className={cn(
          "flex overflow-x-auto",
          horizontal ? "flex-col" : "flex-row",
        )}
      >
        {inputFields?.map((field: InputFields, idx: number) => (
          <div key={field.name} className={cn(horizontal && "flex")}>
            <div className="relative">
              <Input
                className="h-16 bg-white rounded-xl p-2 w-52"
                key={field.name}
                placeholder={`Player ${idx + 1} name`}
                type="text"
                name={field.name}
                onChange={(e) =>
                  playerInputsHandler(e.target.value, field.name, idx)
                }
              />
              <X
                className="absolute top-1 text-default right-1 h-4 w-4 cursor-pointer"
                onClick={() => removePlayerHandler(idx)}
              />
            </div>
            <FieldsMapper
              field={field}
              playerInputsHandler={playerInputsHandler}
              index={idx}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface FieldsMapperProps {
  field: InputFields;
  playerInputsHandler: any;
  index: number;
}

function FieldsMapper({
  field,
  playerInputsHandler,
  index,
}: FieldsMapperProps) {
  return field.fields.map((field: { [p: string]: string }) =>
    Object.entries(field).map(([name]) => (
      <Input
        className="p-2 w-52 rounded-xl h-16"
        key={index}
        placeholder={name}
        name={name}
        type="number"
        onChange={(e) => playerInputsHandler(e.target.value, name, index)}
      />
    )),
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

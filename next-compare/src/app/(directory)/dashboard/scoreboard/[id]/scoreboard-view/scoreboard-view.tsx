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
    setPlayerInputs([...playerInputs, {}]);
  };
  console.log(playerCount);
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
  console.log(scoreData);
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
      <div className="flex">
        <div
          className={cn(
            "bg-red-200 flex",
            data?.horizontal ? "flex-row" : "flex-col",
          )}
        >
          <div className="min-w-48 max-w-52 border border-black bg-white h-16 rounded-xl flex items-center justify-center">
            <span>
              Players name <br />
              Game fields
            </span>
          </div>
          {scoreData.map((score: ScoreData) => (
            <div
              key={score.id}
              className={`min-w-48 max-w-52 rounded-xl border  border-black h-16 flex items-center justify-center`}
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
    // <div className="w-full h-full">
    //   <header className="flex items-center justify-center">
    //     <h1 className="text-[52px]  lg:text-[72px] text-default font-extrabold p-2">
    //       {data?.game_name}
    //     </h1>
    //   </header>
    //   <main className="flex items-center justify-around w-full">
    //     <div className="overflow-y-auto">
    //       <div className="flex">
    //         <div className="min-w-48 border border-black bg-white h-16 flex items-center justify-center">
    //           <span>
    //             Players name <br />
    //             Game fields
    //           </span>
    //         </div>
    //         {Array.from({ length: playerCount }).map((_, playerIndex) => (
    //           <Input
    //             className="p-2 h-16"
    //             key={playerIndex}
    //             placeholder={`Player ${playerIndex + 1} name`}
    //             type={"text"}
    //             onChange={(e) =>
    //               handleInputChange(playerIndex, "name", e.target.value)
    //             }
    //           />
    //         ))}
    //       </div>
    //       {scoreData.map((item) => (
    //         <div key={item.id} className="flex">
    //           <div
    //             className={`min-w-48 border border-black h-16 flex items-center justify-center`}
    //             style={{ backgroundColor: item.color }}
    //           >
    //             <span>{item.placeholder}</span>
    //           </div>
    //           {Array.from({ length: playerCount }).map((_, playerIndex) => (
    //             <Input
    //               className="p-2 h-16"
    //               key={playerIndex}
    //               placeholder={`Player ${playerIndex + 1} ${item.placeholder}`}
    //               type={"number"}
    //               onChange={(e) =>
    //                 handleInputChange(
    //                   playerIndex,
    //                   item.placeholder === "" ? item.color : item.placeholder,
    //                   e.target.value,
    //                 )
    //               }
    //             />
    //           ))}
    //         </div>
    //       ))}
    //       {/*SUMMARY ROW*/}
    //       <div className="flex">
    //         <div className="min-w-48 border border-black bg-white h-10 flex items-center justify-center">
    //           Total
    //         </div>
    //         <div className="flex">
    //           {Array.from({ length: playerCount }).map((_, playerIndex) => (
    //             <Input
    //               className="p-2 lg:h-10"
    //               key={playerIndex}
    //               value={totalScore(playerIndex)}
    //               readOnly
    //             />
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </main>
    //   {data && !(playerCount >= data.max_players) && (
    //     <div className="w-full flex items-center justify-center p-4 ">
    //       <Button
    //         nameToDisplay="Add player"
    //         className="flex font-medium cursor-pointer justify-center items-center"
    //         onClick={addPlayer}
    //         size="sm"
    //         variant="withoutBackground"
    //       />
    //     </div>
    //   )}
    //
    //   <div className="flex flex-col items-center justify-center p-4">
    //     <Button
    //       onClick={() => sendPlayedGame()}
    //       nameToDisplay={"Save scoresheet"}
    //       variant="default"
    //       size="xl"
    //     />
    //   </div>
    // </div>
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
}

function DisplayPLayersAndScoresFields({
  playerCount,
  horizontal,
  handleInputChange,
  scoreData,
}: DisplayPLayersAndScoresFieldsProps) {
  return (
    <div className="flex flex-col">
      <div className={cn("flex", horizontal ? "flex-col" : "flex-row")}>
        {Array.from({ length: playerCount }).map((_, playerIndex) => (
          <Input
            className="p-2 h-16"
            key={playerIndex}
            placeholder={`Player ${playerIndex + 1} name`}
            type={"text"}
            onChange={(e) =>
              handleInputChange(playerIndex, "name", e.target.value)
            }
          />
        ))}
      </div>
      <div className={cn("flex", horizontal ? "flex-row" : "flex-col")}>
        {/*{Array.from({ length: scoreData.length }).map((_, playerIndex) => (*/}
        {/*  <Input*/}
        {/*    className="p-2 h-16"*/}
        {/*    key={playerIndex}*/}
        {/*    placeholder={`Player ${playerIndex + 1} asd`}*/}
        {/*    type="number"*/}
        {/*    // onChange={(e) =>*/}
        {/*    // handleInputChange(*/}
        {/*    //   playerIndex,*/}
        {/*    //   item.placeholder === "" ? item.color : item.placeholder,*/}
        {/*    //   e.target.value,*/}
        {/*    //  // )*/}
        {/*    // }*/}
        {/*  />*/}
        {/*))}*/}
      </div>
    </div>
  );
}

//
// function DisplayPlayersFields({
//   playerCount,
//   handleInputChange,
//   horizontal,
// }: DisplayScoreFieldsProps) {
//   return (
//     <div>
//       <div className={cn("flex", !horizontal ? "flex-row" : "flex-col")}>
//         {Array.from({ length: playerCount }).map((_, playerIndex) => (
//           <Input
//             className="p-2 h-16"
//             key={playerIndex}
//             placeholder={`Player ${playerIndex + 1} name`}
//             type={"text"}
//             onChange={(e) =>
//               handleInputChange(playerIndex, "name", e.target.value)
//             }
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
//
// interface DisplayScoreDataProps {
//   data: ScoreData[];
//   playerCount: number;
// }
//
// function DisplayScoreData({ data, playerCount }: DisplayScoreDataProps) {
//   return data.map((score) => (
//     <div key={score.id} className={cn("flex")}>
//       <div
//         className={`min-w-48 rounded-xl border  border-black h-16 flex items-center justify-center`}
//         style={{ backgroundColor: score.color }}
//       >
//         <span>{score.placeholder}</span>
//       </div>
//       {Array.from({ length: playerCount }).map((_, playerIndex) => (
//         <Input
//           className="p-2 h-16"
//           key={playerIndex}
//           placeholder={`Player ${playerIndex + 1} ${score.placeholder}`}
//           type="number"
//           // onChange={(e) =>
//           // handleInputChange(
//           //   playerIndex,
//           //   item.placeholder === "" ? item.color : item.placeholder,
//           //   e.target.value,
//           //  // )
//           // }
//         />
//       ))}
//     </div>
//   ));
// }

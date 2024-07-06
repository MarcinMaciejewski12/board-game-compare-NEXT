"use client";
import { ChangeEvent, JSX, useState } from "react";
import { Plus } from "lucide-react";

const MOCKED_TABLE = {
  gameName: "7 Wonders",
  minPlayers: 3,
  maxPlayers: 7,
  gameScoreBoard: [
    { fieldName: "War", fieldColor: "red" },
    { fieldName: "Coins", fieldColor: "white" },
    { fieldName: "Wonders", fieldColor: "white" },
    { fieldName: "", fieldColor: "yellow" },
    { fieldName: "", fieldColor: "purple" },
    { fieldName: "", fieldColor: "gold" },
    { fieldName: "", fieldColor: "green" },
    { fieldName: "", fieldColor: "blue" },
  ],
};
export default function Scoreboard() {
  const [score, setScore] = useState();
  const [playerName, setPlayerName] = useState("");
  const [playerCount, setPlayerCount] = useState<JSX.Element[]>([]);
  const playerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };
  const playersInputHandler = () => {
    const inputValue = (
      <input
        className="border border-black h-10"
        value={playerName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => playerHandler(e)}
        placeholder="player name"
      />
    );
    setPlayerCount((prevState) => [...prevState, inputValue]);
  };

  return (
    <div className="w-full h-full">
      <header className="h-48 flex items-center justify-center">
        <h1 className="text-[100px] text-default font-extrabold">
          {MOCKED_TABLE.gameName}
        </h1>
      </header>
      <main className="flex justify-center items-center">
        <div className="w-[90vw] max-h-full bg-red-500" id="players input">
          <div className="flex items-center">
            <div className="w-28 border border-black bg-white h-10 flex items-center justify-center">
              <span>Players name:</span>
            </div>
            <div>{playerCount}</div>
            <button onClick={() => playersInputHandler()}>
              <Plus className="cursor-pointer" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

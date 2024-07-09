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
    { fieldName: "", fieldColor: "green" },
    { fieldName: "", fieldColor: "blue" },
  ],
};

export default function Scoreboard() {
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
    setPlayerInputs(newPlayerInputs);
  };

  return (
    <div className="w-full h-full overflow-auto">
      <header className="h-48 flex items-center justify-center">
        <h1 className="text-[100px] text-default font-extrabold">
          {MOCKED_TABLE.gameName}
        </h1>
      </header>
      <main className="flex justify-center items-center">
        <div
          className="w-[90vw] max-h-full bg-red-500 overflow-x-auto"
          id="players input"
        >
          <div className="flex items-center">
            <div className="w-40 border border-black bg-white h-16 flex items-center justify-center p-4">
              <span>
                Players name / <br />
                Game fields
              </span>
            </div>
            <div>
              {Array.from({ length: playerCount }).map((_, playerIndex) => (
                <input
                  key={playerIndex}
                  className="border border-black h-16"
                  placeholder={`Player ${playerIndex + 1} name`}
                  onChange={(e) =>
                    handleInputChange(playerIndex, "name", e.target.value)
                  }
                />
              ))}
            </div>
            <button onClick={addPlayer}>
              <Plus className="cursor-pointer" />
            </button>
          </div>
          <div>
            {MOCKED_TABLE.gameScoreBoard.map((item, fieldIndex) => (
              <div key={fieldIndex} className="flex">
                <div
                  className={`w-40 border border-black h-16 flex items-center justify-center`}
                  style={{ backgroundColor: item.fieldColor }}
                >
                  <span>{item.fieldName}</span>
                </div>
                {Array.from({ length: playerCount }).map((_, playerIndex) => (
                  <input
                    key={playerIndex}
                    className="border border-black h-16"
                    placeholder={`Player ${playerIndex + 1} ${item.fieldName}`}
                    onChange={(e) =>
                      handleInputChange(
                        playerIndex,
                        item.fieldName,
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
    </div>
  );
}

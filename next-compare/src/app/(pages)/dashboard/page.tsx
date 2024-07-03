"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/button";
import azulPhoto from "@/assets/azul.jpeg";
import sevenWonders from "@/assets/7wonders.jpeg";
type TODO = any;
const MOCKED_DATA: TODO = [
  {
    userId: 1,
    gameName: "7 Wonders",
    minPlayers: 3,
    maxPlayers: 7,
    difficulty: 4,
    playtime: "30min",
    photoValue: sevenWonders,
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
  },
  {
    userId: 2,
    gameName: "Azul",
    minPlayers: 2,
    maxPlayers: 4,
    difficulty: 2,
    playtime: "40min",
    photoValue: azulPhoto,
    gameScoreBoard: [{ fieldName: "Points", fieldColor: "white" }],
  },
];

export default function Dashboard() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="p-11">
      <div className="w-full h-36 flex items-end">
        <div className="flex flex-col gap-1">
          <h1 className="font-extrabold text-4xl  text-default">{`Hello ${isSignedIn ? user?.username : "You are not authorized! please sign in!"}!`}</h1>
          <p className="font-medium text-2xl  text-default">
            What did you play this time?
          </p>
        </div>
      </div>
      <div className="w-full max-h-full bg-red-500">
        <div className="flex justify-end">
          <Button nameToDisplay="Add scoreboard" variant="default" size="xl" />
        </div>
        <div className="w-full h-full bg-blue-600 flex flex-col gap-6">
          {/*TODO: mocked data with TODO types, change it when you connect dashboard to database*/}
          {MOCKED_DATA.map((data: TODO) => {
            return (
              <div className="w-full h-36 bg-white grid grid-cols-5">
                <div className="bg-amber-600">tr</div>
                <div className="bg-orange-600">asd</div>
                <div className="bg-amber-950">qweq</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

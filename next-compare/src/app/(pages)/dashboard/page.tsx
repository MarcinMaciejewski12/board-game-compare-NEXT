"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/button";
import azulPhoto from "@/assets/azul.jpeg";
import sevenWonders from "@/assets/7wonders.jpeg";
import Image from "next/image";
import { Plus } from "lucide-react";
import Link from "next/link";
type TODO = any;
const MOCKED_DATA: TODO = [
  {
    userId: 1,
    uniqueBoardId: "qP2d531fypsfwefwwq25adhthrhxcvmlpoy",
    gameName: "7 Wonders",
    minPlayers: 3,
    maxPlayers: 7,
    difficulty: 4,
    playtime: "30",
    photoValue: sevenWonders,
    isSharedToCommunity: false,
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
    userId: 1,
    uniqueBoardId: "asdASFrgqwefRsAwDgwFAdw",
    gameName: "Azul",
    minPlayers: 2,
    maxPlayers: 4,
    difficulty: 2,
    playtime: "40",
    photoValue: azulPhoto,
    isSharedToCommunity: false,
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
      <div className="w-full max-h-full">
        <div className="flex justify-end p-4">
          <Button nameToDisplay="Add scoreboard" variant="default" size="xl" />
        </div>
        <div className="w-full h-full flex flex-col items-center gap-6">
          {/*TODO: mocked data with TODO types, change it when you connect dashboard to database*/}
          {MOCKED_DATA.map((data: TODO) => {
            return (
              <div
                key={data.uniqueBoardId}
                className="w-[90%] h-44 bg-white grid grid-cols-[10%,70%,20%] rounded-2xl"
              >
                <div className="grid-cols-2 max-h-44 overflow-hidden ">
                  <Image
                    src={data.photoValue}
                    alt={"board game icon"}
                    className="object-cover rounded-2xl w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="h-3/4 flex items-center justify-center">
                    <h1>{data.gameName}</h1>
                  </div>
                  <div className="h-2/4 flex justify-around items-center">
                    <span>{`players: ${data.minPlayers}-${data.maxPlayers}`}</span>
                    <span>{`difficulty: ${data.difficulty}/10`}</span>
                    <span>{`playtime: ${data.playtime}min`}</span>
                  </div>
                </div>
                <div className="grid-cols-2 flex items-center justify-center">
                  <Link href={`/dashboard/scoreboard/${data.uniqueBoardId}`}>
                    <Plus className="w-12 h-12 cursor-pointer" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

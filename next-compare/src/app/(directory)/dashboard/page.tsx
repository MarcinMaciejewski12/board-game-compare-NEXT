"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/button";
import azulPhoto from "@/assets/azul.jpeg";
import sevenWonders from "@/assets/7wonders.jpeg";
import Image from "next/image";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { useUserContext } from "@/components/context/user-context/user-context";
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

interface Games {
  createdAt: string;
  difficulty: number;
  game_name: string;
  game_score_board: string;
  id: string;
  is_shared_to_community: boolean;
  max_players: number;
  min_players: number;
  photo: string;
  playtime: string;
  unique_board_id: string;
  user_id: string;
}

export default function Dashboard() {
  const { isSignedIn, user } = useUser();
  const [userGamesId, setUserGamesId] = useState<string[]>([]);
  const [games, setGames] = useState<Games[]>([]);
  const { setUser } = useUserContext();
  useEffect(() => {
    const saveUserInDatabaseOrGetBoardGames = async () => {
      if (isSignedIn) {
        const response = await axios.get(
          `api/users/get-user?userId=${user.id}`,
        );
        const data = await response.data;

        if (user && data.length === 0) {
          const data = {
            user_id: user.id,
            email: user.emailAddresses[0].emailAddress,
          };
          return await axios.post("api/users/save-user", { body: data });
        }
        if (data) {
          setUser(data[0]);
          setUserGamesId(data[0].board_games);
        }
      }
    };

    //   TODO: refactor, change it to useSWR!
    if (userGamesId) {
      const getUserGames = async () => {
        const data = await axios.get(
          `api/user-games/get-user-games/get-all-user-games?id=${userGamesId}`,
        );
        setGames(data.data.result);
      };
      getUserGames();
    }

    saveUserInDatabaseOrGetBoardGames();
  }, [isSignedIn, user, userGamesId]);

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
          <Link href={"/dashboard/create-score-sheet"}>
            <Button
              nameToDisplay="Add scoreboard"
              variant="default"
              size="xl"
            />
          </Link>
        </div>
        <div className="w-full h-full flex flex-col items-center gap-6">
          {games.map((data: Games) => {
            return (
              <div
                key={data.unique_board_id}
                className="w-[90%] h-44 bg-white grid grid-cols-[10%,70%,20%] rounded-2xl"
              >
                <div className="grid-cols-2 max-h-44 overflow-hidden ">
                  <Image
                    src={data.photo}
                    alt={"board game icon"}
                    className="object-cover rounded-2xl w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="h-3/4 flex items-center justify-center">
                    <h1>{data.game_name}</h1>
                  </div>
                  <div className="h-2/4 flex justify-around items-center">
                    <span>{`players: ${data.min_players}-${data.max_players}`}</span>
                    <span>{`difficulty: ${data.difficulty}/10`}</span>
                    <span>{`playtime: ${data.playtime}min`}</span>
                  </div>
                </div>
                <div className="grid-cols-2 flex items-center justify-center">
                  <Link href={`/dashboard/scoreboard/${data.unique_board_id}`}>
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

"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "@/components/context/user-context/user-context";
import DashboardCard from "@/components/dashboard-card";

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
  const [games, setGames] = useState<Games[]>([
    {
      createdAt: "",
      difficulty: 0,
      game_name: "",
      game_score_board: "",
      id: "",
      is_shared_to_community: false,
      max_players: 0,
      min_players: 0,
      photo: "",
      playtime: "",
      unique_board_id: "",
      user_id: "",
    },
  ]);
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
    <div className="w-full h-full">
      <div className="ml-10 mt-5 mb-5">
        <h1 className="text-default text-5xl font-bold mb-2">{`Hello ${isSignedIn ? user.username : ""}`}</h1>
        <span className="text-default text-3xl">
          What did you play this time?
        </span>
      </div>
      <div>
        <div className="w-full px-10 h-16 items-center flex justify-start">
          <Link href={"/dashboard/create-score-sheet"}>
            <Button
              nameToDisplay="Add score board"
              variant="default"
              size="default"
            />
          </Link>
        </div>
      </div>
      <div className="">
        <section className="grid gap-4 px-10 w-full h-full overflow-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games.map((data) => {
            return (
              <div>
                <DashboardCard
                  key={data.id}
                  unique_board_id={data.unique_board_id}
                  game_name={data.game_name}
                  id={data.id}
                  difficulty={data.difficulty}
                  max_players={data.max_players}
                  min_players={data.min_players}
                  photo={data.photo}
                  playtime={data.playtime}
                />
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

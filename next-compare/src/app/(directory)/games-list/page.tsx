"use client";
import { fetcher } from "@/lib/swr-fetcher/fetcher";
import useSWR from "swr";
import DashboardCard from "@/components/dashboard-card";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Input } from "@/components/input";
import { Games } from "@/app/(directory)/dashboard/lib/dashboard-types";

export default function GamesList() {
  const { data } = useSWR(
    "/api/user-games/get-shared-games/get-all-games-list",
    fetcher,
  );
  const [search, setSearch] = useState("");
  const { user } = useUser();
  const gamesData = search
    ? data?.data?.filter((item: Games) =>
        item.game_name.toLowerCase().includes(search.toLowerCase()),
      )
    : data?.data;

  //   TODO: create default view for pages [dashboard, games-list]
  return (
    <div className="w-full h-full">
      <div className="flex justify-center pb-2 sm:block">
        <Input
          variant="searchbar"
          className="mb-3"
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search games"
        />
      </div>
      <section className="w-full flex flex-col items-center gap-2 md:grid md:grid-cols-2 h-full lg:grid lg:grid-cols-3 xl:grid-cols-4">
        {gamesData
          ? gamesData?.map((data: Games) => {
              return (
                <div key={data.id}>
                  <DashboardCard
                    userId={user?.id as string}
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
            })
          : "Loading..."}
      </section>
    </div>
  );
}

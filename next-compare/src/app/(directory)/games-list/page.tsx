"use client";
import { fetcher } from "@/lib/swr-fetcher/fetcher";
import useSWR from "swr";
import DashboardCard from "@/components/dashboard-card";
import { Games } from "@/app/(directory)/dashboard/page";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Input } from "@/components/input";

export default function GamesList() {
  const { data } = useSWR(
    "/api/user-games/get-shared-games/get-all-games-list",
    fetcher,
  );
  const [search, setSearch] = useState("");
  const { user } = useUser();
  const gamesData = search
    ? data?.data.filter((item: Games) =>
        item.game_name.toLowerCase().includes(search.toLowerCase()),
      )
    : data?.data;

  return (
    <>
      {/*TODO: styles*/}
      <Input
        variant="searchbar"
        className="mb-3"
        onChange={(e) => setSearch(e.target.value)}
        type="search"
        placeholder="Search games"
      />
      <section className="grid gap-2 w-full h-full overflow-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {gamesData?.map((data: Games) => {
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
        }) ?? "Loading"}
      </section>
    </>
  );
}

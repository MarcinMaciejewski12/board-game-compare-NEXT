"use client";
import { fetcher } from "@/lib/swr-fetcher/fetcher";
import useSWR from "swr";
import DashboardCard from "@/components/dashboard-card";
import { Games } from "@/app/(directory)/dashboard/page";
import { useUser } from "@clerk/nextjs";

export default function GamesList() {
  const { data, isLoading } = useSWR(
    "/api/user-games/get-shared-games/get-all-games-list",
    fetcher,
  );
  const { user } = useUser();

  return (
    <section className="grid gap-4 px-10 w-full h-full overflow-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data?.data.map((data: Games) => {
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
  );
}

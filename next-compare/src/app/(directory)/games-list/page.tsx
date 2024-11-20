import CardTable from "@/components/views/card-table";
import { cache } from "react";
import { getSharedGames } from "@/app/(directory)/games-list/actions";

const cachedSharedGames = cache(async () => {
  return await getSharedGames();
});

export default async function GamesList() {
  const games = await cachedSharedGames();

  if (!games.status) {
    return <div>No games available</div>;
  }

  return <CardTable data={games.data ?? []} />;
}

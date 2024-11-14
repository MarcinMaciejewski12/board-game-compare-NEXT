import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Link from "next/link";
import DashboardCard from "@/components/dashboard-card";
import { Games } from "@/app/(directory)/dashboard/lib/dashboard-types";

interface TableProps<T> {
  data: T[];
  isDashboard?: boolean;
}

export default function CardTable<T extends Games>({
  data,
  isDashboard = false,
}: TableProps<T>) {
  return (
    <div className="w-full h-full">
      <div className="w-full  justify-center sm:justify-between max-h-16 flex items-center mb-2">
        <Input
          className="h-12"
          variant="searchbar"
          // onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search games"
        />
        <div className="hidden sm:block">
          {isDashboard && (
            <Link href={"/dashboard/create-or-edit-score-sheet"}>
              <Button
                className="h-12 "
                nameToDisplay="Add score board"
                variant="default"
                size="default"
              />
            </Link>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-2 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item, index) => {
          return (
            <DashboardCard
              key={index}
              gameName={item.game_name}
              uniqueBoardId={item.unique_board_id}
              difficulty={item.difficulty}
              minPlayers={item.min_players}
              maxPlayers={item.max_players}
              playtime={item.playtime}
              description={item.description}
              labels={item.labels}
              id={item.id}
            />
          );
        })}
      </div>
    </div>
  );
}

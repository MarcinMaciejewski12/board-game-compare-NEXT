"use client";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Link from "next/link";
import DashboardCard from "@/components/dashboard-card";
import { Games } from "@/app/(directory)/dashboard/lib/dashboard-types";
import React, { useEffect, useState } from "react";
import { toast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { addToShelf } from "@/app/(directory)/games-list/actions";

interface TableProps<T> {
  data: T[];
  isDashboard?: boolean;
}

export default React.memo(function CardTable<T extends Games>({
  data,
  isDashboard = false,
}: TableProps<T>) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>(data);

  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.gameName.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, data]);

  const addToShelfHandler = async (gameId: string): Promise<void> => {
    try {
      const res = await addToShelf(user?.id ?? "", gameId);
      if (res.status) {
        toast({
          title: res.message,
          className: "bg-white",
        });
        if (res.data) {
          router.push("/dashboard");
        }
      } else {
        toast({
          title: `Failed to add game to your shelf!`,
          className: "bg-red-500",
        });
      }
    } catch (e) {
      toast({
        title: `Something went wrong!`,
        className: "bg-red-500",
      });
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full justify-center sm:justify-between max-h-16 flex items-center mb-2">
        <Input
          className="h-12"
          variant="searchbar"
          onChange={(e) => setSearch(e.target.value)}
          type="text"
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
        {filteredData.map((item, index) => {
          return (
            <DashboardCard
              isDashboard={isDashboard}
              key={index}
              gameName={item.gameName}
              uniqueBoardId={item.uniqueBoardId}
              difficulty={item.difficulty}
              minPlayers={item.minPlayers}
              maxPlayers={item.maxPlayers}
              playtime={item.playtime}
              description={item.description}
              labels={item.labels}
              id={item.id}
              photo={item.photo}
              addToShelfHandler={addToShelfHandler}
            />
          );
        })}
      </div>
    </div>
  );
});

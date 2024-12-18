import { UserContextProvider } from "@/components/context/user-context/user-context";
import { auth } from "@clerk/nextjs/server";
import { getUserGames } from "@/app/(directory)/dashboard/actions";
import React, { cache } from "react";
import { redirect } from "next/navigation";

import CardTable from "@/components/views/card-table";

const cachedGetUserGames = cache(async (userId: string) => {
  return await getUserGames(userId);
});

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) redirect("/");
  const games = await cachedGetUserGames(userId);

  return (
    <UserContextProvider>
      <h1 className="text-brightBlack text-[2rem] font-bold p-2">Your shelf</h1>
      {/* TODO: create many to many table for shared games(one user can add to shelf many games, 
      but one games can be added to shelf many times) */}
      <CardTable isDashboard={true} data={games.data ?? []} />
    </UserContextProvider>
  );
}

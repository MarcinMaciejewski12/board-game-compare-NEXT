import DashboardView from "@/app/(directory)/dashboard/dashboard-view/dashboard-view";
import { UserContextProvider } from "@/components/context/user-context/user-context";
import { auth } from "@clerk/nextjs/server";
import { getUserGames } from "@/app/(directory)/dashboard/actions";
import { cache } from "react";
import { redirect } from "next/navigation";

const cachedGetUserGames = cache(async (userId: string) => {
  return await getUserGames(userId);
});

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) redirect("/");
  const games = await cachedGetUserGames(userId);

  if (!games.status) {
    return (
      <h1>Your inventory is empty. Add games from list or create new one!</h1>
    );
  }

  return (
    <UserContextProvider>
      <div className="overflow-hidden">
        <DashboardView data={games.data} />
      </div>
    </UserContextProvider>
  );
}

import { UserContextProvider } from "@/components/context/user-context/user-context";
import { auth } from "@clerk/nextjs/server";
import { getUserGames } from "@/app/(directory)/dashboard/actions";
import { cache, Suspense } from "react";
import { redirect } from "next/navigation";
import Loading from "@/app/(directory)/dashboard/loading";
import CardTable from "@/components/views/card-table";

const cachedGetUserGames = cache(async (userId: string) => {
  return await getUserGames(userId);
});

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) redirect("/");
  const games = await cachedGetUserGames(userId);

  return (
    <UserContextProvider>
      <h1 className="text-buttonAndShadowColor text-[2rem] font-bold p-2">
        Your shelf
      </h1>
      <Suspense fallback={<Loading />}>
        <CardTable isDashboard={true} data={games.data ?? []} />
      </Suspense>
    </UserContextProvider>
  );
}

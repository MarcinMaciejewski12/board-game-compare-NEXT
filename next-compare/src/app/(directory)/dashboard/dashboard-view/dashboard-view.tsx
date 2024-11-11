import { Games } from "@/app/(directory)/dashboard/lib/dashboard-types";
import Table from "@/components/views/table";
import React from "react";

interface DashboardViewProps {
  data: Games[];
}
const DashboardView = React.memo(function DashboardView({
  data,
}: DashboardViewProps) {
  return <Table<Games> data={data} isDashboard={true} />;
});

export default DashboardView;
// export default function DashboardView({ data }: DashboardViewProps) {
//   // const [search, setSearch] = useState("");
//   // const [games, setGames] = useState<Games[]>([]);
//
//   const { setUser } = useUserContext();
//
//   // useEffect(() => {
//   // const saveUserInDatabaseOrGetBoardGames = async () => {
//   //   if (isSignedIn) {
//   //     if (user && data?.length === 0 && !isLoading) {
//   //       const userData = {
//   //         user_id: user.id,
//   //         email: user.emailAddresses[0].emailAddress,
//   //       };
//   //       return await axios.post("api/users/save-user", { body: userData });
//   //     }
//   //
//   //     if (data) {
//   //       setUser(data);
//   //       setUserGamesId(data[0].board_games);
//   //     }
//   //   }
//   // };
//   // saveUserInDatabaseOrGetBoardGames();
//   // }, [data, user]);
//
//   // useEffect(() => {
//   //   if (getUserBoardGames) {
//   //     setGames(getUserBoardGames.data);
//   //   }
//   // }, [getUserBoardGames, data, games]);
//
//   // if (isLoading) return "Loading...";
//
//   // const gamesData = search
//   //   ? games.filter((item) =>
//   //       item.game_name.toLowerCase().includes(search.toLowerCase()),
//   //     )
//   //   : games;
//
//   return <Table<Games> data={data} isDashboard={true} />;
//   // return (
//   //   <div className="w-full h-full ">
//   //     <div className="hidden sm:block">
//   //       <h1 className="text-default text-5xl font-bold mb-2">
//   //         {isSignedIn && `Hello ${user.username}`}
//   //       </h1>
//   //       <span className="text-default text-3xl">
//   //         What did you play this time?
//   //       </span>
//   //     </div>
//   //     <div className="mb-5">
//   //       <div className="hidden w-full h-16 items-center sm:flex justify-start">
//   //         <Link href={"/dashboard/create-or-edit-score-sheet"}>
//   //           <Button
//   //             nameToDisplay="Add score board"
//   //             variant="default"
//   //             size="default"
//   //           />
//   //         </Link>
//   //       </div>
//   //     </div>
//   //
//   //     <div className="flex justify-center pb-2 sm:block">
//   //       <Input
//   //         variant={"searchbar"}
//   //         onChange={(e) => setSearch(e.target.value)}
//   //         type="search"
//   //         placeholder="Search games"
//   //       />
//   //     </div>
//   //     <section className="w-full overflow-auto max-h-[45rem] flex flex-col items-center gap-2 md:grid md:grid-cols-2 h-full lg:grid lg:grid-cols-3 xl:grid-cols-4">
//   //       {gamesData?.map((data: Games) => (
//   //         <DashboardCard
//   //           key={data.id}
//   //           userId={user?.id as string}
//   //           unique_board_id={data.unique_board_id}
//   //           game_name={data.game_name}
//   //           id={data.id}
//   //           difficulty={data.difficulty}
//   //           max_players={data.max_players}
//   //           min_players={data.min_players}
//   //           photo={data.photo}
//   //           playtime={data.playtime}
//   //           description={data.description}
//   //           labels={data.labels}
//   //         />
//   //       )) ?? "Add first scoresheet"}
//   //     </section>
//   //   </div>
//   // );
// }

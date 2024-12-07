import ScoreboardView from "@/app/(directory)/dashboard/scoreboard/[id]/scoreboard-view/scoreboard-view";
import { getScoreBoardSheet } from "@/app/(directory)/dashboard/actions";
import { auth } from "@clerk/nextjs/server";

export default async function Scoreboard({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = auth();
  const data = await getScoreBoardSheet(params.id);
  if (!data.status || !userId) {
    return <div>Failed to get score board</div>;
  }

  return (
    <ScoreboardView userId={userId} gameId={params.id} board={data.data} />
  );
}

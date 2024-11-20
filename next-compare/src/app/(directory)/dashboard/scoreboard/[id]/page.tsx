import ScoreboardView from "@/app/(directory)/dashboard/scoreboard/[id]/scoreboard-view/scoreboard-view";
import { getScoreBoardSheet } from "@/app/(directory)/dashboard/actions";

export default async function Scoreboard({
  params,
}: {
  params: { id: string };
}) {
  const data = await getScoreBoardSheet(params.id);
  if (!data.status) {
    return <div>Failed to get score board</div>;
  }

  return <ScoreboardView board={data.data} />;
}

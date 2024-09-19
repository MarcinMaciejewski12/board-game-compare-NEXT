import HistoryView from "@/app/(directory)/dashboard/scoreboard/[id]/history-view/history-view";

export default function PlayedGamesHistory({
  params,
}: {
  params: { id: string };
}) {
  return <HistoryView id={params.id} />;
}

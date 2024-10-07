import HistoryView from "@/app/(directory)/dashboard/history/[id]/history-view/history-view";

export default function PlayedGamesHistory({
  params,
}: {
  params: { id: string };
}) {
  return <HistoryView id={params.id} />;
}

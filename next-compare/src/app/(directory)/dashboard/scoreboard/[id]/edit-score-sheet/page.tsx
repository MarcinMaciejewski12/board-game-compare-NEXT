import EditScoreSheetView from "@/app/(directory)/dashboard/scoreboard/[id]/edit-score-sheet/edit-score-sheet-view/edit-score-sheet-view";
import { ScoreSheetMultiFormContextProvider } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";

export default function EditScoreSheet({ params }: { params: { id: string } }) {
  return (
    <ScoreSheetMultiFormContextProvider>
      <EditScoreSheetView id={params.id} />;
    </ScoreSheetMultiFormContextProvider>
  );
}

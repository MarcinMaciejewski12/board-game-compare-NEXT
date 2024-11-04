import { ScoreSheetMultiFormContextProvider } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import EditScoreSheetView from "@/app/(directory)/dashboard/create-or-edit-score-sheet/edit-score-sheet/[id]/edit-score-sheet-view/edit-score-sheet-view";

export default function EditScoreSheet({ params }: { params: { id: string } }) {
  return (
    <ScoreSheetMultiFormContextProvider>
      <EditScoreSheetView id={params.id} />
    </ScoreSheetMultiFormContextProvider>
  );
}

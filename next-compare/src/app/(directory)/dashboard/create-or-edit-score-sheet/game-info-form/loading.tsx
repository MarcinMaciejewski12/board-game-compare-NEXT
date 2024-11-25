import AddScoreBoardSkeleton from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/components/loading-view";

export default function MultiStepFormSkeleton({
  component,
}: {
  component: string;
}) {
  if (component === "addScoreBoard") {
    return <h1>siemano</h1>;
  } else if (component === "gameInfoForm") {
    return <AddScoreBoardSkeleton />;
  }
}

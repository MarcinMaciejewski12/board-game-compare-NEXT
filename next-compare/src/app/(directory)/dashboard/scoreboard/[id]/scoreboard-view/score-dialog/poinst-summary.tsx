import { Crown } from "lucide-react";

export default function PointsSummary({
  points,
}: {
  points: { [key: string]: string }[];
}) {
  console.log("points", points);
  const places = [];
  return (
    <div className="w-[70vw] h-[60vh] bg-red-200">
      <Crown />
      <div>siemano</div>
    </div>
    // <>
    //   <Crown />
    //   <h1 className="text-2xl">siemano</h1>
    // </>
  );
}

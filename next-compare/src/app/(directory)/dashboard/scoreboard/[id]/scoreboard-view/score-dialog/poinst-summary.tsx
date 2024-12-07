"use client";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { displayColor } from "./lib/helpers";
import { Button } from "@/components/button";
import { toast } from "@/hooks/use-toast";
import { saveResults } from "../actions";
import { useRouter } from "next/router";

interface PointsSummaryProps {
  points: { [key: string]: string }[];
  gameId: string;
  userId: string;
}

export default function PointsSummary({
  points,
  gameId,
  userId,
}: PointsSummaryProps) {
  const router = useRouter();
  const [pointsSum, setPointsSum] = useState<
    { name: string; points: number }[]
  >([]);

  useEffect(() => {
    const calculatePoints = () => {
      const result = points.map((pointObj) => {
        let pointsObject = { name: "", points: 0 };

        Object.entries(pointObj).forEach(([key, value]) => {
          if (key.includes("Player")) {
            pointsObject["name"] = value;
          } else {
            pointsObject["points"] += Number(value);
          }
        });
        return pointsObject;
      });

      return result;
    };
    const newPoints = calculatePoints();
    setPointsSum(newPoints.sort((a, b) => b.points - a.points));
  }, [points]);

  async function saveResultsHandler() {
    try {
      const res = await saveResults(userId, gameId, points);
      if (res.status) {
        toast({
          title: res.message,
          className: "bg-white",
        });
        router.push("/dashboard");
      } else {
        toast({
          title: res.message,
          className: "bg-red-500",
        });
      }
    } catch (e) {
      console.error(`Can't save your score sheet to database:`, e);
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="w-[70vw] h-[55vh] overflow-auto max-w-[70vw] items-end flex gap-2">
        {pointsSum.map((pointAndPlayer, idx) => {
          const { name, points } = pointAndPlayer;

          function getCardHeight(id: number) {
            if (id === 0) {
              return 100;
            } else if (id === 1) {
              return 90;
            } else if (id === 2) {
              return 80;
            } else {
              return 70;
            }
          }

          return (
            <Fragment key={name}>
              <div
                className={cn(
                  "w-64 border-2 rounded  border-black",
                  `h-[${getCardHeight(idx)}%]`,
                  idx > 2 ? "bg-white" : displayColor[idx],
                )}
              >
                <div key={name} className="w-64 h-full rounded">
                  <div className="w-full h-[50%] flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      {idx === 0 && <Crown color="gold" size={50} />}
                      <p className="text-4xl font-bold text-white">{name}</p>
                    </div>
                  </div>
                  <div className="w-full h-[50%] flex items-center justify-center">
                    <p className="text-4xl font-bold  text-white">{points}</p>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      <Button
        nameToDisplay="Save results"
        className="max-w-52"
        size="default"
        variant="default"
        onClick={() => saveResultsHandler()}
      />
    </div>
  );
}

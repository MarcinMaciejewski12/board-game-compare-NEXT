"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/swr-fetcher/fetcher";
import { useEffect, useState } from "react";
import Chart from "@/app/(directory)/dashboard/history/[id]/components/chart";

interface HistoryViewProps {
  id: string;
}

export default function HistoryView({ id }: HistoryViewProps) {
  const { data } = useSWR(`/api/history?id=${id}`, fetcher);
  const [historyData, setHistoryData] = useState(data ?? []);

  useEffect(() => {
    setHistoryData(data?.data);
  }, [data]);

  const scoreBoardData = historyData
    ?.map((item: { [key: string]: string | null }) => {
      const game_score_board = item?.game_score_board;
      const parsedScores = JSON.parse(game_score_board as string);
      return parsedScores.map((score: any) => {
        const name = score?.name ?? "Unknown";
        const totalScore = score?.totalScore ?? 0;
        return { name, totalScore };
      });
    })
    .flat();

  return <Chart scoreBoardData={scoreBoardData} />;
}

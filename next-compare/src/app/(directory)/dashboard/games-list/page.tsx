"use client";
import { fetcher } from "@/lib/swr-fetcher/fetcher";
import useSWR from "swr";

export default function GamesList() {
  const { data } = useSWR(
    "/api/user-games/get-shared-games/get-all-games-list",
    fetcher,
  );
  console.log(data);
  return <h1>siemanko</h1>;
}

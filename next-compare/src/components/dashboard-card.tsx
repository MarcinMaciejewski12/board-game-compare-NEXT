"use client";
import sevenWonders from "@/assets/7wonders.jpeg";
import Image from "next/image";
import { Button } from "@/components/button";
import { Pencil, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

import { Trash, History, Info, ArrowLeft, Users, Clock } from "lucide-react";
import axios from "axios";
import { mutate } from "swr";
import { useToast } from "@/components/hooks/use-toast";
import { labels, LabelType } from "@/app/(directory)/dashboard/lib/labels";
import Label from "@/components/Label";

interface DashboardCardProps {
  difficulty?: number;
  game_name?: string;
  id?: string;
  max_players?: number;
  min_players?: number;
  photo?: string;
  playtime?: string;
  unique_board_id?: string;
  isFlippedState?: boolean;
  setIsFlippedState?: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  description?: string | null;
  labels?: string;
}

export default function DashboardCard({
  difficulty,
  game_name,
  min_players,
  max_players,
  photo,
  playtime,
  unique_board_id,
  userId,
  description,
  labels,
}: DashboardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div className="max-w-72 min-h-[23rem] h-[23rem] shadow-xl rounded-lg bg-white">
      {isFlipped ? (
        <BackSide
          difficulty={difficulty}
          min_players={min_players}
          max_players={max_players}
          playtime={playtime}
          game_name={game_name}
          setIsFlippedState={setIsFlipped}
          isFlippedState={isFlipped}
          userId={userId}
          description={description}
          unique_board_id={unique_board_id}
        />
      ) : (
        <FrontSide
          labels={labels}
          game_name={game_name}
          unique_board_id={unique_board_id}
          isFlippedState={isFlipped}
          setIsFlippedState={setIsFlipped}
          userId={userId}
        />
      )}
    </motion.div>
  );
}

function FrontSide({
  game_name,
  unique_board_id,
  isFlippedState,
  setIsFlippedState,
  userId,
  labels: _labels,
}: DashboardCardProps) {
  const reverseCardHandler = () => {
    setIsFlippedState!(!isFlippedState);
  };
  const parsedLabels = JSON.parse(_labels ?? "[]");

  const labelsToDisplay = parsedLabels.map((id: number) =>
    labels.find((label) => label.id === id),
  );

  return (
    <motion.div className="h-full">
      <section className="h-56 relative">
        <Info
          className="absolute text-white end-2 top-2 cursor-pointer"
          onClick={() => reverseCardHandler()}
        />
        <Image
          src={sevenWonders}
          alt="game"
          className="object-fit w-full h-full rounded-xl"
        />
      </section>
      <section className="rounded flex flex-col gap-4">
        <div className="w-full flex items-center justify-center">
          <h1 className="text-default text-2xl">{game_name}</h1>
        </div>

        <>
          <div className="flex gap-1 w-full px-1 items-center justify-between">
            {labelsToDisplay.slice(0, 2).map((label: LabelType) => (
              <Label
                key={label.id}
                id={label.id}
                color={label.color}
                name={label.name}
              />
            ))}
            {labelsToDisplay.length > 2 && (
              <div className="w-8 h-8 rounded-2xl bg-gray-300 flex items-center justify-center">
                {`+${labelsToDisplay.length - 2}`}
              </div>
            )}
          </div>

          <div className="flex h-full items-end justify-center ">
            <Link href={`/dashboard/scoreboard/${unique_board_id}`}>
              <Button
                nameToDisplay={"Add score"}
                variant="default"
                className="px-2 h-8"
              />
            </Link>
          </div>
        </>
      </section>
    </motion.div>
  );
}

function BackSide({
  game_name,
  min_players,
  max_players,
  difficulty,
  playtime,
  setIsFlippedState,
  isFlippedState,
  unique_board_id,
  userId,
  description,
}: DashboardCardProps) {
  const { toast } = useToast();
  async function deleteGameHandler(id: string, userId: string) {
    try {
      const res = await axios.post("api/user-games/delete-game", {
        userId: userId,
        gameId: id,
      });
      if (res.status)
        toast({
          title: "Delete score sheet",
          className: "bg-white",
        });
      await mutate(`api/users/get-user?userId=${userId}`);
      await mutate(
        `api/user-games/get-user-games/get-all-user-games?id=${userId}`,
      );
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <motion.div>
      <div className="flex flex-col w-full h-[100%] justify-center items-center">
        <section className="w-full h-12">
          <div className="flex h-full items-center justify-between p-4">
            <ArrowLeft
              className="cursor-pointer"
              onClick={() => setIsFlippedState!(!isFlippedState)}
            />
            <span className="text-xl font-medium">{game_name}</span>
            <Trash
              onClick={() =>
                deleteGameHandler(unique_board_id as string, userId)
              }
              className="cursor-pointer"
            />
          </div>
        </section>
        <section className="flex flex-col items-center justify-center w-full h-32">
          <div className="px-7">
            <div className="flex gap-4">
              <div className="flex">
                <Users />: {min_players} - {max_players}
              </div>
              <div className="flex">
                <Clock />: {playtime}
              </div>
            </div>
            <div className="flex w-full ">
              <TrendingUp />: {difficulty}
            </div>
          </div>
        </section>
        <section className=" w-full px-4 h-32">
          <p className="break-all"> {description ?? "Empty description"}</p>
        </section>
        <section className="w-full h-12 px-4 flex gap-1 items-center justify-end">
          <Link
            href={`/dashboard/create-or-edit-score-sheet/edit-score-sheet/${unique_board_id}`}
          >
            <div className="w-8 h-8 rounded bg-buttonAndShadowColor flex justify-center items-center">
              <Pencil className="w-5 h-5 text-white" />
            </div>
          </Link>
          <Link href={`/dashboard/history/${unique_board_id}`}>
            <div className="w-8 h-8 border rounded flex items-center justify-center">
              <History className="cursor-pointer h-6 w-6 text-default " />
            </div>
          </Link>
        </section>
      </div>
    </motion.div>
  );
}

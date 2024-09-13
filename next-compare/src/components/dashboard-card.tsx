import sevenWonders from "@/assets/7wonders.jpeg";
import Image from "next/image";
import { Button } from "@/components/button";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

import { Trash, History, Info, ArrowLeft, Users, Clock } from "lucide-react";
import axios from "axios";
import { mutate } from "swr";
import { useToast } from "@/components/hooks/use-toast";

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
}: DashboardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div className="max-w-72 lg:h-[22rem] shadow-xl rounded-lg bg-white">
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
          unique_board_id={unique_board_id}
        />
      ) : (
        <FrontSide
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
}: DashboardCardProps) {
  const reverseCardHandler = () => {
    setIsFlippedState!(!isFlippedState);
  };
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
        {/*  TODO: create real label for games types  */}
        <>
          <div className="flex justify-center items-center">
            <div className="bg-blue-500 px-2 h-6 inline-block rounded text-white cursor-default">
              Deck building
            </div>
          </div>
          <div className="flex h-full items-end justify-center">
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
          {/*TODO: add description to form!*/}
          Plance for description
        </section>
        <section className="w-full h-12 px-4 flex gap-2 items-center justify-end">
          <Link href={`/dashboard/scoreboard/${unique_board_id}`}>
            <Button variant="default" className="px-3 h-8" nameToDisplay="+" />
          </Link>
          <Link href={`/dashboard/history/${unique_board_id}`}>
            <History className="cursor-pointer h-6 w-6 text-default " />
          </Link>
        </section>
      </div>
    </motion.div>
  );
}

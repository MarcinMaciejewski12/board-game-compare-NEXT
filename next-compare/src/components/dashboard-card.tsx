import sevenWonders from "@/assets/7wonders.jpeg";
import Image from "next/image";
import { Button } from "@/components/button";
import InfoSign from "@/components/info-sign";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { CircleArrowLeft } from "lucide-react";

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
}

export default function DashboardCard({
  difficulty,
  game_name,
  min_players,
  max_players,
  photo,
  playtime,
  unique_board_id,
}: DashboardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.5 }}
      className="lg:min-w-80 lg:h-80 shadow-xl rounded-lg bg-white"
    >
      {isFlipped ? (
        <BackSide
          difficulty={difficulty}
          min_players={min_players}
          max_players={max_players}
          playtime={playtime}
          game_name={game_name}
          setIsFlippedState={setIsFlipped}
          isFlippedState={isFlipped}
        />
      ) : (
        <FrontSide
          game_name={game_name}
          unique_board_id={unique_board_id}
          isFlippedState={isFlipped}
          setIsFlippedState={setIsFlipped}
        />
      )}
    </motion.div>
  );
}

function LiElement({ children }: any) {
  return <li className="text-default text-2xl">{children}</li>;
}

function FrontSide({
  game_name,
  unique_board_id,
  isFlippedState,
  setIsFlippedState,
}: DashboardCardProps) {
  // TODO: refactor this function to one function in parent component!
  const reverseCardHandler = () => {
    setIsFlippedState!(!isFlippedState);
  };
  return (
    <>
      <motion.div className="w-full h-[80%]">
        <div className="flex gap-4 items-center flex-col">
          <Image
            src={sevenWonders}
            alt="game"
            className="object-fit rounded-2xl w-[40%] mt-4"
          />
          <h1 className="text-default text-2xl">{game_name}</h1>
        </div>
      </motion.div>
      <motion.div className="w-full flex justify-between items-center p-4 h-[20%] border-t">
        <InfoSign className="w-8 h-8" onClick={() => reverseCardHandler()} />
        <Link href={`/dashboard/scoreboard/${unique_board_id}`}>
          <Button
            nameToDisplay="+"
            variant="default"
            size="sm"
            className="text-2xl shadow-xl"
          />
        </Link>
      </motion.div>
    </>
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
}: DashboardCardProps) {
  // TODO: refactor this function to one function in parent component!
  const reverseCardHandler = () => {
    setIsFlippedState!(!isFlippedState);
  };
  return (
    <motion.div animate={{ rotateY: -180 }}>
      <div className="w-full justify-center flex items-center h-16 border-b">
        <h1 className="text-default text-2xl ">{game_name}</h1>
      </div>
      <ol className="w-full h-52 flex p-4 flex-col gap-4">
        <div>
          <LiElement>
            Players: {min_players}-{max_players}
          </LiElement>
        </div>
        <LiElement>Difficulty: {difficulty}/10</LiElement>
        <LiElement>Playtime: {playtime}min</LiElement>
      </ol>
      <CircleArrowLeft
        className="cursor-pointer ml-4 h-8 w-8 text-default"
        onClick={() => reverseCardHandler()}
      />
    </motion.div>
  );
}

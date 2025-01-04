import { Button } from "@/components/button";
import { Pencil, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { History, Info, ArrowLeft, Users, Clock } from "lucide-react";

import { useUser } from "@clerk/nextjs";
import DeleteGameDialog from "@/components/dialogs/delete-dialog";

import Avatar from "@/components/avatar";

interface DashboardCardProps {
  gameName: string;
  id?: number;
  maxPlayers: number;
  minPlayers: number;
  photo?: string;
  playtime?: string;
  uniqueBoardId: string;
  isFlippedState?: boolean;
  setIsFlippedState?: React.Dispatch<React.SetStateAction<boolean>>;
  description?: string | null;
  labels?: number[];
  isDashboard?: boolean;
  addToShelfHandler?: (gameId: string) => Promise<void>;
  difficulty?: number;
}

export default function DashboardCard({
  difficulty = 1,
  gameName,
  minPlayers,
  maxPlayers,
  photo,
  playtime = "",
  uniqueBoardId,
  description,
  labels,
  isDashboard = false,
  addToShelfHandler,
}: DashboardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="min-h-[23rem] h-56 max-h-56 w-72 shadow-lg rounded-lg bg-white">
      {!isFlipped ? (
        <CardFrontSide
          name={gameName}
          uniqueBoardId={uniqueBoardId}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
          isDashboard={isDashboard}
          addToShelfHandler={addToShelfHandler}
          photo={photo ?? ""}
        />
      ) : (
        <CardBackSide
          name={gameName}
          minPlayers={minPlayers}
          maxPlayers={maxPlayers}
          playtime={playtime}
          difficulty={difficulty}
          description={description}
          uniqueBoardId={uniqueBoardId}
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
          isDashboard={isDashboard}
        />
      )}
    </div>
  );
}

interface CardFrontSideProps {
  name: string;
  uniqueBoardId: string;
  setIsFlipped: Dispatch<SetStateAction<boolean>>;
  isFlipped: boolean;
  isDashboard?: boolean;
  addToShelfHandler?: (gameId: string) => Promise<void>;
  photo: string;
}
function CardFrontSide({
  name,
  uniqueBoardId = "",
  setIsFlipped,
  isFlipped,
  isDashboard,
  addToShelfHandler,
  photo = "",
}: CardFrontSideProps) {
  return (
    <div className="w-full h-full">
      <div className="w-full h-[60%]  relative">
        <Info
          className="absolute text-white z-50 end-2 top-2 cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
        />
        <Avatar img={photo} />
      </div>
      <div className="w-full h-[40%] flex flex-col items-center justify-around">
        <h1 className="text-2xl text-default font-medium">{name}</h1>

        {isDashboard ? (
          <Link href={`/dashboard/scoreboard/${uniqueBoardId}`}>
            <Button
              nameToDisplay="Add score"
              variant="default"
              className="px-2 h-8"
            />
          </Link>
        ) : (
          <Button
            onClick={() =>
              addToShelfHandler && addToShelfHandler(uniqueBoardId)
            }
            nameToDisplay="Add to shelf"
            variant="default"
            className="px-2 h-8"
          />
        )}
      </div>
    </div>
  );
}

interface CardBackSideProps {
  name: string;
  maxPlayers: number;
  minPlayers: number;
  playtime: string;
  difficulty: number;
  uniqueBoardId: string;
  isFlipped: boolean;
  setIsFlipped: Dispatch<SetStateAction<boolean>>;
  description?: string | null;
  isDashboard: boolean;
}
function CardBackSide({
  name,
  maxPlayers,
  minPlayers,
  playtime,
  difficulty,
  description,
  uniqueBoardId,
  setIsFlipped,
  isFlipped,
  isDashboard,
}: CardBackSideProps) {
  const { user } = useUser();

  return (
    <div className="w-full h-full">
      <div className="h-[15%] w-full flex items-center justify-between px-4">
        <ArrowLeft
          className="cursor-pointer text-default"
          onClick={() => setIsFlipped(!isFlipped)}
        />
        <span className="text-xl font-medium text-default">{name}</span>
        {isDashboard && (
          <DeleteGameDialog
            gameName={name}
            userId={user?.id ?? ""}
            uniqueBoardId={uniqueBoardId}
          />
        )}
      </div>
      <div className="h-[70%]">
        <BaseGameInformation
          maxPlayers={maxPlayers}
          minPlayers={minPlayers}
          playtime={playtime}
          difficulty={difficulty}
          description={description}
        />
      </div>
      {isDashboard && (
        <div className="h-[15%] flex items-center justify-end px-4 border-t gap-2 w-full">
          <Link
            href={`/dashboard/create-or-edit-score-sheet/edit-score-sheet/${uniqueBoardId}`}
          >
            <div className="w-8 h-8 rounded bg-defaultButton flex justify-center items-center">
              <Pencil className="w-5 h-5 text-white" />
            </div>
          </Link>
          <Link href={`/dashboard/history/${uniqueBoardId}`}>
            <div className="w-8 h-8 border rounded flex items-center justify-center">
              <History className="cursor-pointer h-6 w-6 text-default " />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

interface GameInfoProps {
  minPlayers: number;
  maxPlayers: number;
  playtime: string;
  difficulty: number;
  description?: string | null;
}
function BaseGameInformation({
  minPlayers,
  maxPlayers,
  playtime,
  difficulty,
  description,
}: GameInfoProps) {
  return (
    <div className="text-default flex flex-col items-center gap-10 w-full h-full p-4">
      <div className="flex flex-col gap-4">
        <div className="gap-6 flex flex-row">
          <div className="flex items-center text-xl">
            <Users className="size-8" />: {minPlayers}-{maxPlayers}
          </div>
          <div className="items-center flex text-xl">
            <Clock className="size-8" />: {playtime}min
          </div>
        </div>
        <div className="flex text-xl">
          <TrendingUp className="size-8" />: {difficulty}/10
        </div>
      </div>
      <p className="text-sm text-center overflow-auto">
        {description ? description : "No description available for this game."}
      </p>
    </div>
  );
}

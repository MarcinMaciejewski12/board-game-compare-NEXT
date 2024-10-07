import { Input } from "@/components/input";
import React, { useRef } from "react";
import { Button } from "@/components/button";
import { motion } from "framer-motion";
import { useScoreSheetMultiContext } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import { Textarea } from "@/components/ui/textarea";

type GameInfoFormProps = {
  nextStep: () => void;
};

export default function GameInfoForm({ nextStep }: GameInfoFormProps) {
  const { setGameInfo, setGameName, gameName, gameInfo } =
    useScoreSheetMultiContext();

  const formRef = useRef<HTMLFormElement>(null);

  const nextStepValidation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (formRef.current?.checkValidity()) {
      nextStep();
    }
  };

  const gameNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGameName(value);
  };

  const dialogHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    console.log(value);
    setGameInfo((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  // TODO: needed to add validation info for user
  return (
    <motion.div className="w-[40vw] h-[70vh] bg-white flex justify-center rounded shadow-xl p-8">
      <div className="flex flex-col justify-between items-center w-full">
        <h1 className="text-default font-bold text-xl">
          Basic game information
        </h1>
        <form
          ref={formRef}
          onSubmit={(e) => e.preventDefault()}
          noValidate={false}
        >
          <div className="w-full flex flex-col gap-4">
            <Input
              value={gameName}
              label="Game Name"
              placeholder="Game name"
              variant="default"
              type="text"
              onChange={gameNameInputChange}
              required
            />
            <div className="flex gap-2 items-end">
              <Input
                name="min_player"
                onChange={dialogHandler}
                label="Players"
                placeholder="Min players"
                variant="default"
                type="number"
                min={1}
                max={15}
                required
              />
              <Input
                onChange={dialogHandler}
                name="max_player"
                placeholder="Max players"
                variant="default"
                min={1}
                max={15}
                type="number"
                required
              />
            </div>
            <div className="flex items-end gap-2">
              <Input
                label="Difficulty"
                type="number"
                max={10}
                min={1}
                placeholder="Difficulty"
                name="difficulty"
                variant="default"
                onChange={dialogHandler}
                required
              />
              <span className="font-bold text-2xl">/10</span>
            </div>
            <div className="flex items-end gap-2">
              <Input
                label="Playtime"
                variant="default"
                type="number"
                placeholder="Playtime"
                name="playtime"
                onChange={dialogHandler}
                required
              />
              <span className="font-bold text-2xl">min</span>
            </div>
            <div className="flex items-end gap-2">
              <Textarea
                placeholder="Write a short description of the game"
                name="description"
                onChange={dialogHandler}
                className="bg-white resize-none outline-none"
              />
            </div>
            <div className="flex gap-1 justify-center items-center font-medium">
              <input
                type="checkbox"
                id="checkbox"
                name="isSharedToCommunity"
                checked={gameInfo?.isSharedToCommunity}
                onChange={dialogHandler}
              />
              <label htmlFor="checkbox" className="text-sm">
                Share with community (other gamers could use your score board!)
              </label>
            </div>
          </div>
        </form>
        <Button
          nameToDisplay={"Go to creator"}
          size="lg"
          variant="default"
          onClick={nextStepValidation}
          type="button"
        />
      </div>
    </motion.div>
  );
}

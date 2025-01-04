"use client";
import { Input } from "@/components/input";
import React, { useRef, useState } from "react";
import { Button } from "@/components/button";
import {
  GameInfo,
  useScoreSheetMultiContext,
} from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import { Textarea } from "@/components/ui/textarea";
import {
  difficultyLevels,
  labels,
  LabelType,
  playTime,
} from "@/app/(directory)/dashboard/lib/labels";
import {
  FieldErrors,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";
import MultiStepCombobox from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/components/multi-step-combobox";
import { Info } from "lucide-react";

export type FormFields = {
  gameName: string;
  gameInfo: GameInfo | null;
  // TODO: change to camelCase
  min_player: number;
  max_player: number;
  // TODO: change to camelCase
  difficulty: LabelType;
  playtime: string;
  labels: LabelType;
  isSharedToCommunity: boolean;
  description: string;
  gamePhoto: FileList | null;
};

type GameInfoFormProps = {
  nextStep(): void;
  register: UseFormRegister<FormFields>;
  registerSetValue?: UseFormSetValue<FormFields>;
  errors: FieldErrors<FormFields>;
  trigger: UseFormTrigger<FormFields>;
  watch: UseFormWatch<FormFields>;
};

export default function GameInfoForm({
  nextStep,
  register,
  registerSetValue,
  trigger,
  errors,
  watch,
}: GameInfoFormProps) {
  const nextStepValidation = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      nextStep();
    }
  };

  return (
    <div className="bg-white h-[70vh] w-[70vw] rounded p-4 flex flex-col justify-center">
      <header className="w-full h-16 flex items-center justify-center">
        <h1 className="text-brightBlack font-bold text-xl">
          Basic game information
        </h1>
      </header>
      <div className="w-full h-3/4 flex">
        <DisplayFormFields
          errors={errors}
          registerSetValue={registerSetValue}
          inputRegister={register}
          watch={watch}
        />
        <div className="w-1/2 h-full">
          <div className="flex flex-col gap-4 p-1">
            <Textarea
              {...register("description")}
              placeholder="Write a short description of the game"
              name="description"
              className="bg-white outline-none resize-none min-h-[26vh] w-full"
            />
            <Input
              {...(register("gamePhoto"),
              {
                maxLength:
                  500 || "Game image cannot be more than 500 characters",
              })}
              label="Game image"
              type="file"
              name="gamePhoto"
              accept="image/*"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-16 flex items-center justify-center">
        <Button
          nameToDisplay={"Go to creator"}
          size="lg"
          variant="default"
          onClick={nextStepValidation}
          type="button"
        />
      </div>
    </div>
  );
}

const DisplayFormFields = ({
  inputRegister,
  registerSetValue,
  errors,
  watch,
}: {
  inputRegister: UseFormRegister<FormFields>;
  registerSetValue?: UseFormSetValue<FormFields>;
  errors: FieldErrors<FormFields>;
  watch: UseFormWatch<FormFields>;
}) => {
  const minPlayer = watch("min_player");
  const maxPlayer = watch("max_player");
  return (
    <div className="w-1/2 h-full p-1">
      <div className="bg-defaultYellow rounded h-full p-4 justify-center flex flex-col gap-4">
        <Input
          {...inputRegister("gameName", {
            required: "Game name field is required",
            maxLength: 256 || "Game name cannot be more than 256 characters",
          })}
          label="Game Name"
          placeholder="Game name"
          variant="default"
          type="text"
          required
          className="w-full"
          errorMessage={errors.gameName?.message}
        />
        <div className="flex flex-col w-full gap-2 justify-between md:items-end md:flex-row">
          <Input
            {...inputRegister("min_player", {
              required: "Min player field is required",
              validate: (value) =>
                !maxPlayer ||
                value <= maxPlayer ||
                "Min player cannot be greater than max player",
              min: {
                value: 1,
                message: "Minimum players must be at least 1",
              },
            })}
            className="w-full md:w-[45%]"
            name="min_player"
            label="Players"
            placeholder="Min players"
            variant="default"
            type="number"
            min={1}
            max={15}
            required
            errorMessage={errors.min_player?.message}
          />
          <Input
            {...inputRegister("max_player", {
              required: "Max player field is required",
              min: {
                value: 1,
                message: "Maximum players must be at least 1",
              },
              validate: (value) =>
                !minPlayer ||
                value >= minPlayer ||
                "Max player cannot be less than min player",
            })}
            className="w-full md:w-[45%]"
            name="max_player"
            placeholder="Max players"
            variant="default"
            min={1}
            max={15}
            type="number"
            required
            errorMessage={errors.max_player?.message}
          />
        </div>
        <div className="flex justify-between">
          <MultiStepCombobox
            valueSetter={registerSetValue}
            gameInfoName="difficulty"
            commandEmpty="difficulty"
            inputPlaceholder={"Select difficulty..."}
            values={difficultyLevels}
            buttonChildren={"Select difficulty..."}
            comboboxLabel={"Difficulty"}
            suffixText="/10"
            className="w-[150px]"
            searchDisabled={true}
            errorMessage={errors.difficulty?.message}
          />
          <MultiStepCombobox
            valueSetter={registerSetValue}
            commandEmpty={"playtime"}
            gameInfoName="playtime"
            values={playTime}
            inputPlaceholder={"Select playtime..."}
            buttonChildren={"Select playtime..."}
            suffixText={"min"}
            className="w-[150px]"
            comboboxLabel={"Playtime"}
            searchDisabled={true}
            errorMessage={errors.playtime?.message}
          />
        </div>
        <MultiStepCombobox<LabelType>
          valueSetter={registerSetValue}
          gameInfoName={"labels"}
          inputPlaceholder={"Select labels..."}
          values={labels}
          buttonChildren={"Select Labels..."}
          commandEmpty={"labels"}
          comboboxLabel={"Labels"}
          multipleChoices
          validate={false}
        />
        <div className="flex gap-2 justify-center items-center font-medium">
          <input
            {...inputRegister("isSharedToCommunity")}
            type="checkbox"
            id="checkbox"
            name="isSharedToCommunity"
            className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="checkbox"
            className="text-sm flex items-center gap-2 text-default"
          >
            Share with community {<Info />}
          </label>
        </div>
      </div>
    </div>
  );
};

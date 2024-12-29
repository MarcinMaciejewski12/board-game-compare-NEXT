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
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import MultiStepCombobox from "@/app/(directory)/dashboard/create-or-edit-score-sheet/game-info-form/components/multi-step-combobox";
import { Info } from "lucide-react";

type GameInfoFormProps = {
  nextStep(): void;
  register: UseFormRegister<FormFields>;
  registerSetValue?: UseFormSetValue<FormFields>;
};

export default function GameInfoForm({
  nextStep,
  register,
  registerSetValue,
}: GameInfoFormProps) {
  // const formRef = useRef<HTMLFormElement>(null);

  const nextStepValidation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    nextStep();
    // if (formRef.current?.checkValidity()) {

    // } else {
    //   const formElements = formRef.current?.elements;
    //   const newErrorMessages: { [key: string]: string } = {};

    //   Array.from(formElements as unknown as HTMLFormElement).forEach(
    //     (element) => {
    //       if (
    //         element instanceof HTMLInputElement ||
    //         element instanceof HTMLTextAreaElement
    //       ) {
    //         if (element.required && !element.value) {
    //           newErrorMessages[element.name] = "This field is required.";
    //         }
    //       }
    //     },
    //   );

    //   setErrorMessage(newErrorMessages);
    // }
  };

  // const gameNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setGameName(value);
  //   handleBlur(e as React.FocusEvent<HTMLInputElement>);
  // };

  // const dialogHandler = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   const { name, value, type, checked, files } = e.target as HTMLInputElement;
  //   if (files?.[0]) {
  //     setImage(files?.[0]);
  //   }
  //   setGameInfo((prevState) => ({
  //     ...prevState,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));

  //   handleBlur(e as React.FocusEvent<HTMLInputElement>);
  // };

  // const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   if (!value) {
  //     setErrorMessage((prev) => ({
  //       ...prev,
  //       [name]: "This field is required.",
  //     }));
  //   } else {
  //     setErrorMessage((prev) => ({ ...prev, [name]: "" }));
  //   }
  // };

  return (
    <div className="bg-white h-[70vh] w-[70vw] rounded p-4">
      <div className="flex items-center justify-center h-[15%]">
        <h1 className="text-brightBlack font-bold text-xl">
          Basic game information
        </h1>
      </div>
      <div className="flex w-full h-[70%]">
        <FormFields
          registerSetValue={registerSetValue}
          inputRegister={register}
        />
        <div className="w-[50%] bg-red-500 h-[70%]"></div>
      </div>

      <div className="w-full flex justify-center items-center h-[15%]">
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
};

const FormFields = ({
  inputRegister,
  registerSetValue,
}: {
  inputRegister: UseFormRegister<FormFields>;
  registerSetValue?: UseFormSetValue<FormFields>;
}) => {
  return (
    <div className="w-full h-[70%]">
      <div className="w-1/2 bg-defaultYellow rounded h-full p-4 flex flex-col gap-4">
        <Input
          label="Game Name"
          placeholder="Game name"
          variant="default"
          type="text"
          required
          className="w-full"
        />
        <div className="flex flex-col w-full gap-2 justify-between md:items-end md:flex-row">
          <Input
            {...inputRegister("min_player")}
            className="w-full md:w-[45%]"
            name="min_player"
            label="Players"
            placeholder="Min players"
            variant="default"
            type="number"
            min={1}
            max={15}
            required
          />
          <Input
            {...inputRegister("max_player")}
            className="w-full md:w-[45%]"
            name="max_player"
            placeholder="Max players"
            variant="default"
            min={1}
            max={15}
            type="number"
            required
          />
        </div>
        <div className="flex justify-between">
          <MultiStepCombobox<LabelType>
            valueSetter={registerSetValue}
            gameInfoName="difficulty"
            commandEmpty="difficulty"
            inputPlaceholder={"Select difficulty..."}
            values={difficultyLevels}
            buttonChildren={"Select difficulty..."}
            comboboxLabel={"Difficulty"}
            required
            suffixText="/10"
            className="w-[150px]"
            searchDisabled={true}
          />
          <MultiStepCombobox
            valueSetter={registerSetValue}
            commandEmpty={"playtime"}
            gameInfoName="playtime"
            values={playTime}
            inputPlaceholder={"Select playtime..."}
            buttonChildren={"Select playtime..."}
            suffixText={"min"}
            className={"w-[150px]"}
            comboboxLabel={"Playtime"}
            searchDisabled={true}
            required
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

// function MultiStepInputSection({
//   gameName,
//   gameNameInputChange,
//   errorMessage,
//   handleBlur,
//   dialogHandler,
//   gameInfo,
// }: {
//   gameName: string;
//   gameNameInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   errorMessage: { [key: string]: string };
//   handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
//   gameInfo: GameInfo | null;
//   dialogHandler: (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => void;
// }) {
//   return (
//     <div className="flex flex-col gap-5">
//       <Input
//         value={gameName}
//         label="Game Name"
//         placeholder="Game name"
//         variant="default"
//         type="text"
//         onChange={gameNameInputChange}
//         required
//         errorMessage={errorMessage["gameName"]}
//         name={"gameName"}
//         onBlur={handleBlur}
//         className="w-full"
//       />
//       <div className="flex flex-col w-full gap-2 justify-between md:items-end md:flex-row">
//         <Input
//           className="w-full md:w-[45%]"
//           name="min_player"
//           onChange={dialogHandler}
//           label="Players"
//           placeholder="Min players"
//           variant="default"
//           type="number"
//           min={1}
//           max={15}
//           required
//           errorMessage={errorMessage["min_player"]}
//           onBlur={handleBlur}
//         />
//         <Input
//           onChange={dialogHandler}
//           className="w-full md:w-[45%]"
//           name="max_player"
//           placeholder="Max players"
//           variant="default"
//           min={1}
//           max={15}
//           type="number"
//           required
//           errorMessage={errorMessage["max_player"]}
//           onBlur={handleBlur}
//         />
//       </div>
//       <div className="flex justify-between">
//         <MultiStepCombobox<LabelType>
//           gameInfoName="difficulty"
//           commandEmpty="difficulty"
//           inputPlaceholder={"Select difficulty..."}
//           values={difficultyLevels}
//           buttonChildren={"Select difficulty..."}
//           comboboxLabel={"Difficulty"}
//           required
//           suffixText="/10"
//           className="w-[150px]"
//           searchDisabled={true}
//         />
//         <MultiStepCombobox
//           commandEmpty={"playtime"}
//           gameInfoName="playtime"
//           values={playTime}
//           inputPlaceholder={"Select playtime..."}
//           buttonChildren={"Select playtime..."}
//           suffixText={"min"}
//           className={"w-[150px]"}
//           comboboxLabel={"Playtime"}
//           searchDisabled={true}
//           required
//         />
//       </div>
//       <MultiStepCombobox<LabelType>
//         gameInfoName={"labels"}
//         inputPlaceholder={"Select labels..."}
//         values={labels}
//         buttonChildren={"Select Labels..."}
//         commandEmpty={"labels"}
//         comboboxLabel={"Labels"}
//         multipleChoices
//       />
//       <div className="flex gap-2 justify-center items-center font-medium">
//         <input
//           type="checkbox"
//           id="checkbox"
//           name="isSharedToCommunity"
//           checked={gameInfo?.isSharedToCommunity}
//           onChange={dialogHandler}
//           className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//         />
//         <label
//           htmlFor="checkbox"
//           className="text-sm flex items-center gap-2 text-default"
//         >
//           Share with community {<Info />}
//         </label>
//       </div>
//     </div>
//   );
// }

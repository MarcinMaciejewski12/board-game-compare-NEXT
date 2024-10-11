import { Input } from "@/components/input";
import React, { useRef, useState } from "react";
import { Button } from "@/components/button";
import { useScoreSheetMultiContext } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";
import { Textarea } from "@/components/ui/textarea";
import { labels } from "@/app/(directory)/dashboard/lib/labels";
import Label from "@/components/Label";

type GameInfoFormProps = {
  nextStep: () => void;
};

export default function GameInfoForm({ nextStep }: GameInfoFormProps) {
  const {
    setGameInfo,
    setGameName,
    gameName,
    gameInfo,
    labelTable,
    setLabelTable,
  } = useScoreSheetMultiContext();
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {},
  );

  const formRef = useRef<HTMLFormElement>(null);

  const nextStepValidation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (formRef.current?.checkValidity()) {
      nextStep();
    } else {
      const formElements = formRef.current?.elements;
      const newErrorMessages: { [key: string]: string } = {};

      Array.from(formElements as unknown as HTMLFormElement).forEach(
        (element) => {
          if (
            element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement
          ) {
            if (element.required && !element.value) {
              newErrorMessages[element.name] = "This field is required.";
            }
          }
        },
      );

      setErrorMessage(newErrorMessages);
    }
  };

  const gameNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGameName(value);
    handleBlur(e as React.FocusEvent<HTMLInputElement>);
  };

  const dialogHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setGameInfo((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    handleBlur(e as React.FocusEvent<HTMLInputElement>);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!value) {
      setErrorMessage((prev) => ({
        ...prev,
        [name]: "This field is required.",
      }));
    } else {
      setErrorMessage((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const isCheckedHandler = (id: number) => {
    if (labelTable.includes(id)) {
      return setLabelTable([...labelTable.filter((item) => item !== id)]);
    }
    return setLabelTable([...labelTable, id]);
  };

  return (
    <div className="w-[65vw]  h-full bg-white rounded shadow-xl flex flex-col items-center gap-2 p-4">
      <h1 className="text-default font-bold text-xl">Basic game information</h1>
      <div className="w-full h-full">
        <form
          ref={formRef}
          onSubmit={(e) => e.preventDefault()}
          noValidate={false}
        >
          <div className="flex gap-2">
            <div className="w-[50%] h-full flex flex-col gap-4 p-2 bg-primary rounded">
              <Input
                value={gameName}
                label="Game Name"
                placeholder="Game name"
                variant="default"
                type="text"
                onChange={gameNameInputChange}
                required
                errorMessage={errorMessage["gameName"]}
                name={"gameName"}
                onBlur={handleBlur}
                className="w-full"
              />

              <div className="flex gap-2 justify-between items-end">
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
                  errorMessage={errorMessage["min_player"]}
                  onBlur={handleBlur}
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
                  errorMessage={errorMessage["max_player"]}
                  onBlur={handleBlur}
                />
              </div>

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
                errorMessage={errorMessage["difficulty"]}
                onBlur={handleBlur}
                suffixText="/10"
              />
              <Input
                label="Playtime"
                variant="default"
                type="number"
                placeholder="Playtime"
                name="playtime"
                onChange={dialogHandler}
                required
                errorMessage={errorMessage["playtime"]}
                onBlur={handleBlur}
                suffixText={"min"}
              />
              <div className="flex gap-1 justify-center items-center font-medium">
                <input
                  type="checkbox"
                  id="checkbox"
                  name="isSharedToCommunity"
                  checked={gameInfo?.isSharedToCommunity}
                  onChange={dialogHandler}
                />
                <label htmlFor="checkbox" className="text-sm">
                  Share with community (other gamers could use your score
                  board!)
                </label>
              </div>
            </div>

            <div className="w-[50%] h-full">
              <div className="flex flex-col gap-4">
                <Textarea
                  placeholder="Write a short description of the game"
                  name="description"
                  onChange={dialogHandler}
                  className="bg-white outline-none resize-none min-h-[26vh] w-full"
                />

                <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
                  {labels.map((item) => (
                    <div
                      onClick={() => isCheckedHandler(item.id)}
                      className="flex w-full items-center justify-center max-w-full"
                      key={item.id}
                      title={item.name}
                    >
                      <Label
                        id={item.id}
                        name={item.name}
                        color={item.color}
                        idTable={labelTable}
                        spanClasses="cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="w-full flex justify-center mt-2">
          <Button
            nameToDisplay={"Go to creator"}
            size="lg"
            variant="default"
            onClick={nextStepValidation}
            type="button"
          />
        </div>
      </div>
    </div>
  );
}

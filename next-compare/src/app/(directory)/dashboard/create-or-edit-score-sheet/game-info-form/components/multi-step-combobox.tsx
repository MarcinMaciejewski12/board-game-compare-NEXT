import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useScoreSheetMultiContext } from "@/components/context/score-sheet-multi-context/score-sheet-multi-context";

interface MultiStepComboboxProps<T> {
  commandEmpty: string;
  values: T[];
  inputPlaceholder: string;
  buttonChildren: string;
  comboboxLabel: string;
  gameInfoName: string;
  multipleChoices?: boolean;
  required?: boolean;
  suffixText?: string;
  className?: string;
  searchDisabled?: boolean;
}

interface Label {
  id: number;
  name: string | number;
}

export default function MultiStepCombobox<T extends Label>({
  commandEmpty,
  values,
  inputPlaceholder,
  buttonChildren,
  comboboxLabel,
  gameInfoName,
  multipleChoices = false,
  required = false,
  suffixText = "",
  className = "",
  searchDisabled = false,
}: MultiStepComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | string[]>("");
  const { setGameInfo, gameInfo } = useScoreSheetMultiContext();

  function selectValuesHandler(currentValue: string, value: string | string[]) {
    if (multipleChoices) {
      if (Array.isArray(value) && value.includes(currentValue)) {
        return value.filter((item) => item !== currentValue);
      }
      return [...(value as string[]), currentValue];
    }
    return currentValue === value ? "" : currentValue;
  }

  function displayButtonChildren() {
    if (Array.isArray(value) && value.length) {
      return value.join(", ");
    } else if (value === "" || value.length === 0) {
      return buttonChildren;
    } else return value;
  }

  function displayCheckIcon(name: string) {
    if (Array.isArray(value)) {
      return value.includes(name) && <Check />;
    }
    return value === name && <Check />;
  }
  console.log(gameInfo);
  return (
    <div>
      <p className="text-sm font-bold text-default">
        {comboboxLabel}
        {required && "*"}
      </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-[200px] truncate justify-between text-default",
              className,
            )}
          >
            <p className={cn("max-w-[200px] truncate", className)}>
              {displayButtonChildren()}
            </p>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        {suffixText && (
          <span className="text-xl ml-2 text-default font-medium">
            {suffixText}
          </span>
        )}
        <PopoverContent
          className={cn("w-[200px] max-h-16 p-0", className)}
          side="bottom"
          align="start"
        >
          <Command>
            {!searchDisabled && <CommandInput placeholder={inputPlaceholder} />}
            <CommandList className="max-h-52">
              <CommandEmpty>No {commandEmpty} found.</CommandEmpty>
              <CommandGroup>
                {values?.map((label) => (
                  <CommandItem
                    key={label.id}
                    value={String(label.name)}
                    onSelect={(currentValue) => {
                      !multipleChoices && setOpen(false);
                      setValue((prevValue) => {
                        const newValue = selectValuesHandler(
                          currentValue,
                          prevValue,
                        );
                        setGameInfo((prevState) => ({
                          ...prevState,
                          [gameInfoName]: newValue,
                        }));
                        return newValue;
                      });
                    }}
                  >
                    {label.name}
                    {displayCheckIcon(String(label.name))}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

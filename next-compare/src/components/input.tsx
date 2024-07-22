import { ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface InputProps {
  index?: number;
  inputStyle: string;
  placeholder: string;
  type: "text" | "number";
  onChangeFunction?: (value: ChangeEvent<HTMLInputElement>) => void;
  colorPicker?: string;
}

export default function Input({
  index,
  inputStyle,
  placeholder,
  onChangeFunction,
  type,
  colorPicker,
}: InputProps) {
  return (
    <input
      style={{ backgroundColor: colorPicker }}
      key={index}
      className={cn(`p-4 ${inputStyle}`)}
      placeholder={placeholder}
      onChange={onChangeFunction}
      type={type}
    />
  );
}

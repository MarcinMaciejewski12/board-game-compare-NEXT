import { ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface InputProps {
  index?: number;
  inputStyle: string;
  placeholder: string;
  type: "text" | "number";
  onChangeFunction?: (value: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  index,
  inputStyle,
  placeholder,
  onChangeFunction,
  type,
}: InputProps) {
  return (
    <input
      key={index}
      className={cn(`${inputStyle}`)}
      placeholder={placeholder}
      onChange={onChangeFunction}
      type={type}
    />
  );
}

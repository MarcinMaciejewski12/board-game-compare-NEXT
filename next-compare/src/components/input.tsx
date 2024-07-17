import { ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface InputProps {
  index: number;
  inputStyle: string;
  placeholder: string;
  onChangeFunction: (value: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  index,
  inputStyle,
  placeholder,
  onChangeFunction,
}: InputProps) {
  return (
    <input
      key={index}
      className={cn(`${inputStyle}`)}
      placeholder={placeholder}
      onChange={onChangeFunction}
    />
  );
}

import { ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  index?: number;
  inputStyle: string;
  placeholder: string;
  type: "text" | "number";
  onChangeFunction?: (value: ChangeEvent<HTMLInputElement>) => void;
  colorPicker?: string;
  label?: string;
}

export default function Input({
  index,
  inputStyle,
  placeholder,
  onChangeFunction,
  type,
  colorPicker,
  label,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col text-default text-sm">
      {label && <label htmlFor={`input-${index}`}>{label}</label>}
      <input
        style={{ backgroundColor: colorPicker }}
        key={index}
        className={cn(`p-4 ${inputStyle}`)}
        placeholder={placeholder}
        onChange={onChangeFunction}
        type={type}
        {...props}
      />
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

interface LabelProps {
  id: number;
  name: string;
  color: string;
  idTable?: number[];
  spanClasses?: string;
}

export default function Label({
  id,
  name,
  color,
  spanClasses,
  idTable,
}: LabelProps) {
  return (
    <div className={cn("max-w-full rounded", color, spanClasses)} title={name}>
      <div className="flex items-center gap-1 px-1">
        <h1 className="text-sm truncate">{name}</h1>
        <div className={cn("w-4", color)}>
          {idTable?.includes(id) && <Check className="w-4 h-4" />}
        </div>
      </div>
    </div>
  );
}

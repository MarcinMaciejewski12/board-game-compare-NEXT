import { cn } from "@/lib/utils";
import React from "react";

interface InfoSignProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function InfoSign({ className, ...props }: InfoSignProps) {
  return (
    <div
      className={cn(
        "flex cursor-pointer font-bold border-2 items-center text-default justify-center border-[#284B63] rounded-full bg-none ",
        className,
      )}
      {...props}
    >
      i
    </div>
  );
}

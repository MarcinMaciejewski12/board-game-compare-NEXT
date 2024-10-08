import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default:
        "bg-buttonAndShadowColor rounded-md text-white hover:bg-buttonAndShadowColor/90",
      withoutBackground:
        "border-2 shadow-xl text-black border-black rounded-md ",
    },
    size: {
      loginSize: "h-8 rounded-md px-8 shadow-xl",
      navigationSize: "h-16 w-52 rounded-md text-2xl px-8",
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
      xl: "h-16 w-80 text-xl shadow-xl ",
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  nameToDisplay?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, nameToDisplay, ...props }, ref) => {
    return (
      <button
        className={cn(
          "shadow-xl",
          buttonVariants({ variant, size, className }),
        )}
        ref={ref}
        {...props}
      >
        {nameToDisplay}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

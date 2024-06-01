import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default:
        "bg-buttonAndShadowColor rounded-md text-buttonAndShadowColor-foreground hover:bg-buttonAndShadowColor/90",
    },
    size: {
      loginSize: "h-8 rounded-md px-8 shadow-xl",
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
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
  nameToDisplay: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, nameToDisplay, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
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

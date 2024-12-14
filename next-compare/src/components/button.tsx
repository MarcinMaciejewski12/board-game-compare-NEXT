import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

const buttonVariants = cva("", {
  variants: {
    variant: {
      signup:
        "cursor-pointer rounded-md bg-[#DF6F1F] text-[#3F3A3A] w-32 border-[#3F3A3A] border-2",
      default:
        "bg-buttonAndShadowColor cursor-pointer rounded-md text-white hover:bg-buttonAndShadowColor/90",
      withoutBackground:
        "border-2 shadow-xl text-black border-black cursor-pointer rounded-md ",
      dialogDelete:
        "bg-red-500 text-white rounded-md w-24 h-8 hover:bg-red-500/80",
      dialogCancel:
        "border-2 shadow-xl text-black border-black rounded-md w-24 h-8",
      outline:
        "border border-border text-primary hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      disabled:
        "bg-gray-600 text-gray-500 opacity-50 rounded cursor-not-allowed",
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
        disabled={props.disabled}
        className={cn(
          "shadow-xl",
          props.disabled
            ? buttonVariants({ variant: "disabled", size, className })
            : buttonVariants({ variant, size, className }),
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

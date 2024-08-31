import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva("", {
  variants: {
    variant: {
      default: "h-12 min-w-48 p-2 border rounded",
    },
  },
});

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, label, ...props }, ref) => {
    return (
      <div className="flex flex-col text-default ">
        {label && (
          <label className="text-sm font-bold" htmlFor={label}>
            {label}
          </label>
        )}
        <input
          className={cn(
            "border border-black",
            inputVariants({ variant, className }),
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };

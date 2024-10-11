import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva("", {
  variants: {
    variant: {
      default: "h-12 min-w-48 p-2",
      searchbar: "h-12 w-72 sm:w-48 p-2",
    },
  },
});

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
  label?: string;
  errorMessage?: string;
  suffixText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant, label, onBlur, errorMessage, suffixText, ...props },
    ref,
  ) => {
    return (
      <div className="flex flex-col text-default ">
        {label && (
          <label className="text-sm font-bold flex" htmlFor={label}>
            {label}
            {props.required && "*"}
          </label>
        )}
        <div className="flex items-center gap-2">
          <input
            onBlur={onBlur}
            className={cn(
              `border rounded border-input text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`,
              inputVariants({ variant, className }),
            )}
            ref={ref}
            {...props}
          />
          {suffixText && (
            <span className="text-xl font-medium">{suffixText}</span>
          )}
        </div>

        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };

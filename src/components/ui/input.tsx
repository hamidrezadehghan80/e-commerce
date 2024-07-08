import * as React from "react";
import { cn } from "../../libs/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: "default" | "danger";
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, color, error, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-md ring-offset-neutral-50 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
            {
              "border-red-600": color === "danger",
            },
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };

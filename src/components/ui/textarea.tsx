import * as React from "react";
import { cn } from "../../libs/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  color?: "default" | "danger";
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, color, error, ...props }, ref) => {
    return (
      <>
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-0 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-0 dark:placeholder:text-slate-400 dark:focus-visible:ring-0",
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
Textarea.displayName = "Textarea";

export { Textarea };

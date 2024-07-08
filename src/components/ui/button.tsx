import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../libs/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm  font-normal transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:!cursor-not-allowed disabled:opacity-50 md:rounded-md",
  {
    variants: {
      variant: {
        default: "bg-neutral-800 text-neutral-100 hover:bg-opacity-95",
        destructive: "bg-red-600 text-white hover:bg-red-600/90",
        outline:
          "border border-neutral-300 bg-transparent text-black-1 hover:bg-neutral-100",
        secondary:
          "bg-black-3  text-white hover:bg-black-3/80 dark:bg-neutral-50 dark:text-black-4 dark:hover:bg-neutral-300",
        ghost:
          "hover:bg-neutral-300/60 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        link: "text-black-500 hover:text-black-500/80 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-7  px-4 text-xs md:rounded",
        lg: "h-11 px-8 md:rounded-md",
        icon: " !size-10 shrink-0 ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

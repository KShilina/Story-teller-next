import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md",
  {
    variants: {
      variant: {
        // Main olive accent button
        default:
          "bg-[var(--color-accent)] text-[var(--color-background)] " +
          "hover:bg-[color-mix(in srgb, var(--color-accent) 85%, black)] " +
          "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",

        // Calm soft warning/destructive tone (terracotta olive muted)
        destructive:
          "bg-[color-mix(in srgb, var(--color-accent) 50%, #a94444)] text-[var(--color-background)] " +
          "hover:bg-[color-mix(in srgb, #a94444 80%, var(--color-accent))] " +
          "focus-visible:ring-2 focus-visible:ring-[color-mix(in srgb, #a94444 70%, var(--color-accent))] focus-visible:ring-offset-2",

        // Gentle bordered button
        outline:
          "border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] " +
          "hover:bg-[var(--color-muted)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",

        // Soft muted background version
        secondary:
          "bg-[var(--color-muted)] text-[var(--color-foreground)] " +
          "hover:bg-[color-mix(in srgb, var(--color-muted) 85%, var(--color-accent))] " +
          "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",

        // Bare ghost button
        ghost:
          "text-[var(--color-foreground)] hover:bg-[var(--color-muted)] " +
          "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",

        // Olive-tinted link
        link:
          "text-[var(--color-accent)] underline-offset-4 hover:underline " +
          "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
      },

      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-sm",
        lg: "h-10 rounded-md px-6 text-base",
        icon: "size-9 rounded-md p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

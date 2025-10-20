import * as React from "react";
import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
        "border-[0.5px] border-[#F6EFEF] flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        // Focus state
        "focus-visible:border-[#F6EFEF] focus-visible:ring-[#F6EFEF]/50 focus-visible:ring-[3px]",
        // Invalid state
        "aria-invalid:border-[#F6EFEF] aria-invalid:ring-[#F6EFEF]/20 dark:aria-invalid:border-[#F6EFEF] dark:aria-invalid:ring-[#F6EFEF]/40",
        className
      )}
      {...props}
    />
  );
}

export { Input };

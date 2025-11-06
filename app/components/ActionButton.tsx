"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "./ui/utils";
import { ButtonHTMLAttributes, FC } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: LucideIcon;
  loadingIcon?: LucideIcon;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "success";
  className?: string;
}

const ActionButton: FC<ActionButtonProps> = ({
  label,
  icon: Icon,
  loadingIcon: LoadingIcon,
  isLoading = false,
  disabled = false,
  variant = "primary",
  className,
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center gap-2 font-medium rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#BD8581] hover:bg-[#8F5E5E] text-white h-10 px-4 text-sm shadow-sm",
    secondary:
      "bg-[#E7ECD9] text-[#3E4A2B] hover:bg-[#D9E3C0] h-10 px-5 text-sm rounded-md",
    success:
      "h-12 px-6 bg-gradient-to-r from-[#6F8056] to-[#5E7047] text-white font-semibold shadow-sm hover:shadow-md hover:brightness-110",
  };

  return (
    <button
      type="button"
      className={cn(baseStyles, variants[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && LoadingIcon ? (
        <LoadingIcon className="h-4 w-4 animate-spin" />
      ) : (
        Icon && <Icon className="h-4 w-4" />
      )}
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default ActionButton;

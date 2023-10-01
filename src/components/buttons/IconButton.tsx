import { LucideIcon } from "lucide-react";
import * as React from "react";
import { IconType } from "react-icons";
import { ImSpinner2 } from "react-icons/im";

import { cn } from "@/lib/utils";

const IconButtonVariant = [
  "primary",
  "outline",
  "ghost",
  "light",
  "dark",
  "nachos",
  "crunchex",
  "tomato",
  "chaska",
  "primary-nachos",
  "primary-crunchex",
  "primary-tomato",
  "primary-chaska",
] as const;

type IconButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: (typeof IconButtonVariant)[number];
  icon?: IconType | LucideIcon;
  classNames?: {
    icon?: string;
  };
  isActive?: boolean;
} & React.ComponentPropsWithRef<"button">;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = "primary",
      isDarkBg = false,
      icon: Icon,
      classNames,
      isActive,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    const activated =
      isActive &&
      [
        "nachos",
        "crunchex",
        "tomato",
        "chaska",
        "primary-nachos",
        "primary-crunchex",
        "primary-tomato",
        "primary-chaska",
      ].find((val) => val === variant);
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded font-medium",
          "focus-visible:ring-primary-500 focus:outline-none focus-visible:ring",
          "shadow-sm",
          "transition-colors duration-75",
          "min-h-[28px] min-w-[28px] p-1 md:min-h-[34px] md:min-w-[34px] md:p-2",
          //#region  //*=========== Variants ===========
          [
            variant === "nachos" && [
              "bg-slate-100 text-slate-600",
              "border border-slate-600",
              "hover:border-amber-500 hover:bg-white hover:text-amber-500",
              "active:border-amber-500 active:bg-white",
              "border-slate-400 disabled:bg-slate-300 disabled:text-slate-500",
            ],
            variant === "crunchex" && [
              "bg-slate-100 text-slate-600",
              "border border-slate-600",
              "hover:border-sky-500 hover:bg-white hover:text-sky-500",
              "active:border-sky-500 active:bg-white",
              "border-slate-400 disabled:bg-slate-300 disabled:text-slate-500",
            ],
            variant === "tomato" && [
              "bg-slate-100 text-slate-600",
              "border border-slate-600",
              "hover:border-red-500 hover:bg-white hover:text-red-500",
              "active:border-red-500 active:bg-white",
              "border-slate-400 disabled:bg-slate-300 disabled:text-slate-500",
            ],
            variant === "chaska" && [
              "bg-slate-100 text-slate-600",
              "border border-slate-600",
              "hover:border-emerald-500 hover:bg-white hover:text-emerald-500",
              "active:border-emerald-500 active:bg-white",
              "border-slate-400 disabled:bg-slate-300 disabled:text-slate-500",
            ],
            variant === "primary-nachos" && [
              "bg-amber-500 text-white",
              "border border-amber-600",
              "hover:bg-amber-600 hover:text-white",
              "active:bg-amber-700",
              "disabled:bg-amber-700",
            ],
            variant === "primary-crunchex" && [
              "bg-sky-500 text-white",
              "border border-sky-600",
              "hover:bg-sky-600 hover:text-white",
              "active:bg-sky-700",
              "disabled:bg-sky-700",
            ],
            variant === "primary-tomato" && [
              "bg-red-500 text-white",
              "border border-red-600",
              "hover:bg-red-600 hover:text-white",
              "active:bg-red-700",
              "disabled:bg-red-700",
            ],
            variant === "primary-chaska" && [
              "bg-emerald-500 text-white",
              "border border-emerald-600",
              "hover:bg-emerald-600 hover:text-white",
              "active:bg-emerald-700",
              "disabled:bg-emerald-700",
            ],

            variant === "primary" && [
              "bg-primary-500 text-white",
              "border-primary-600 border",
              "hover:bg-primary-600 hover:text-white",
              "active:bg-primary-700",
              "disabled:bg-primary-700",
            ],
            variant === "outline" && [
              "text-primary-500",
              "border-primary-500 border",
              "hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100",
              isDarkBg &&
                "hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800",
            ],
            variant === "ghost" && [
              "text-primary-500",
              "shadow-none",
              "hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100",
              isDarkBg &&
                "hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800",
            ],
            variant === "light" && [
              "bg-white text-gray-700",
              "border border-gray-300",
              "hover:text-dark hover:bg-gray-100",
              "active:bg-white/80 disabled:bg-gray-200",
            ],
            variant === "dark" && [
              "bg-gray-900 text-white",
              "border border-gray-600",
              "hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700",
            ],
          ],

          activated === "nachos" && "border-amber-500 bg-white text-amber-500",
          activated === "crunchex" && "border-sky-500 bg-white text-sky-500",
          activated === "tomato" && "border-red-500 bg-white text-red-500",
          activated === "chaska" &&
            "border-emerald-500 bg-white text-emerald-500",
          activated === "primary-nachos" &&
            "border-amber-700 bg-white text-amber-700",
          activated === "primary-crunchex" &&
            "border-sky-700 bg-white text-sky-700",
          activated === "primary-tomato" &&
            "border-red-700 bg-white text-red-700",
          activated === "primary-chaska" &&
            "border-emerald-700 bg-white text-emerald-700",
          //#endregion  //*======== Variants ===========
          "disabled:cursor-not-allowed",
          isLoading &&
            "relative text-transparent transition-none hover:text-transparent disabled:cursor-wait",
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              {
                "text-white": ["primary", "dark"].includes(variant),
                "text-black": ["light"].includes(variant),
                "text-primary-500": ["outline", "ghost"].includes(variant),
              }
            )}
          >
            <ImSpinner2 className="animate-spin" />
          </div>
        )}
        {Icon && <Icon size="1em" className={cn(classNames?.icon)} />}
      </button>
    );
  }
);

export default IconButton;

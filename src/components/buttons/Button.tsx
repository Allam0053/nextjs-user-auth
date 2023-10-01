import { LucideIcon } from "lucide-react";
import * as React from "react";
import { IconType } from "react-icons";
import { ImSpinner2 } from "react-icons/im";

import { cn } from "@/lib/utils";

const ButtonVariant = [
  "primary",
  "outline",
  "ghost",
  "light",
  "dark",
  "danger",
  "nachos",
  "crunchex",
  "tomato",
  "chaska",
  "primary-nachos",
  "primary-crunchex",
  "primary-tomato",
  "primary-chaska",
] as const;
const ButtonSize = ["xs", "sm", "base"] as const;

type RenderProps = {
  disabled?: boolean;
  isLoading?: boolean;
  variant?: (typeof ButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
  isDarkBg?: boolean;
};

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: (typeof ButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
  leftIcon?: IconType | LucideIcon | string;
  rightIcon?: IconType | LucideIcon | string;
  leftNode?: ({
    disabled,
    isLoading,
    variant,
    size,
    isDarkBg,
  }: RenderProps) => React.ReactNode;
  classNames?: {
    leftIcon?: string;
    rightIcon?: string;
  };
  isActive?: boolean;
} & React.ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = "primary",
      size = "base",
      isDarkBg = false,
      leftIcon: LeftIcon,
      leftNode,
      rightIcon: RightIcon,
      classNames,
      isActive,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    const activated =
      isActive &&
      ["nachos", "crunchex", "tomato", "chaska"].find((val) => val === variant);

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          "inline-flex items-center rounded font-medium",
          "focus-visible:ring-primary-500 focus:outline-none focus-visible:ring",
          "shadow-sm",
          "transition-colors duration-75",
          //#region  //*=========== Size ===========
          [
            size === "base" && ["px-3 py-1.5", "text-sm md:text-base"],
            size === "sm" && ["px-2 py-1", "text-xs md:text-sm"],
            size === "xs" && [
              "min-h-[1rem] px-1 md:min-h-[1.25rem]",
              "text-[0.625rem] leading-[0.75rem] md:text-xs",
            ],
          ],
          //#endregion  //*======== Size ===========
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

            variant === "danger" && [
              "bg-red-500 text-white",
              "border border-red-600",
              "hover:bg-red-600 hover:text-white",
              "active:bg-red-700",
              "disabled:bg-red-700",
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
        {(LeftIcon || leftNode) && (
          <div
            className={cn([
              size === "base" && "mr-2",
              size === "sm" && "mr-1.5",
              size === "xs" && "mr-1",
            ])}
          >
            {typeof LeftIcon === "function" ? (
              <LeftIcon
                size="1em"
                className={cn(
                  [
                    size === "base" && "md:text-md text-md",
                    size === "sm" && "md:text-md text-sm",
                    size === "xs" && "text-xs md:text-xs",
                  ],
                  classNames?.leftIcon
                )}
              />
            ) : (
              LeftIcon
            )}
            {leftNode &&
              leftNode({
                disabled: buttonDisabled,
                isLoading,
                variant,
                size,
                isDarkBg,
              })}
          </div>
        )}
        {children}
        {RightIcon && (
          <div
            className={cn([
              size === "base" && "ml-1",
              size === "sm" && "ml-1.5",
            ])}
          >
            {typeof RightIcon === "function" ? (
              <RightIcon
                size="1em"
                className={cn(
                  [
                    size === "base" && "text-md md:text-md",
                    size === "sm" && "md:text-md text-sm",
                  ],
                  classNames?.rightIcon
                )}
              />
            ) : (
              RightIcon
            )}
          </div>
        )}
      </button>
    );
  }
);

export default Button;

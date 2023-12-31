import { LucideIcon } from "lucide-react";
import * as React from "react";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";

import UnstyledLink, {
  UnstyledLinkProps,
} from "@/components/links/UnstyledLink";
import { Variant } from "@/types/variant";

const ButtonLinkVariant = [
  "primary",
  "outline",
  "ghost",
  "light",
  "dark",
  "danger",
] as const;
const ButtonLinkSize = ["xs", "sm", "base"] as const;

type ButtonLinkProps = {
  isDarkBg?: boolean;
  variant?: (typeof ButtonLinkVariant)[number];
  primary?: Variant;
  size?: (typeof ButtonLinkSize)[number];
  leftIcon?: IconType | LucideIcon;
  rightIcon?: IconType | LucideIcon;
  classNames?: {
    leftIcon?: string;
    rightIcon?: string;
  };
  isActive?: boolean;
} & UnstyledLinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      variant = "primary",
      primary,
      size = "base",
      isDarkBg = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      classNames,
      isActive,
      ...rest
    },
    ref
  ) => {
    const activated =
      primary &&
      ["nachos", "crunchex", "tomato", "chaska"].find((val) => val === primary);
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
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
          activated === "nachos" && "border-amber-500 text-amber-500",
          activated === "crunchex" && "border-sky-500 text-sky-500",
          activated === "tomato" && "border-red-500 text-red-500",
          activated === "chaska" && "border-emerald-500 text-emerald-500",
          !isActive && "text-slate-700",
          isActive && "bg-white text-slate-700",
          //#endregion  //*======== Variants ===========
          "disabled:cursor-not-allowed",
          className
        )}
      >
        {LeftIcon && (
          <div
            className={cn([
              size === "base" && "mr-1",
              size === "sm" && "mr-1.5",
            ])}
          >
            <LeftIcon
              size="1em"
              className={cn(
                [
                  size === "base" && "md:text-md text-md",
                  size === "sm" && "md:text-md text-sm",
                ],
                classNames?.leftIcon
              )}
            />
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
          </div>
        )}
      </UnstyledLink>
    );
  }
);

export default ButtonLink;

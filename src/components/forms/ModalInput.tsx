import clsx from "clsx";
import _ from "lodash";
import * as React from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { IconType } from "react-icons";
import { HiEye, HiEyeOff } from "react-icons/hi";

import { cn as clsxm } from "@/lib/utils";

import Typography from "@/components/Typography";

export type InputProps = {
  /** Input label */
  label: React.ReactNode;
  /**
   * id to be initialized with React Hook Form,
   * must be the same with the pre-defined types.
   */
  id: string;
  /** Input placeholder */
  placeholder?: string;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
  leftIcon?: IconType | string;
  rightNode?: React.ReactNode;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<"input">;

export default function ModalInput({
  label,
  placeholder = "",
  helperText,
  id,
  type = "text",
  disabled,
  readOnly = false,
  hideError = false,
  validation,
  leftIcon: LeftIcon,
  rightNode,
  containerClassName,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // need this in parrent -> import { FormProvider, useForm } from 'react-hook-form';
  const error = _.get(errors, id);
  const withLabel = label !== null;

  const [showPassword, setShowPassword] = React.useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div
      className={clsxm(
        "mt-4 flex w-full items-start justify-between gap-6", // approx w => 460px
        containerClassName
      )}
    >
      {withLabel && (
        <Typography
          as="label"
          variant="s3"
          className="mt-3 flex w-48"
          htmlFor={id}
        >
          {label}
        </Typography>
      )}
      <div className={clsxm("flex w-full flex-col")}>
        <div className={clsx("relative", withLabel && "mt-1")}>
          {LeftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {typeof LeftIcon === "string" ? (
                <Typography variant="s4">{LeftIcon}</Typography>
              ) : (
                <LeftIcon size="1em" className="text-typo text-xl" />
              )}
            </div>
          )}
          <input
            {...register(id, validation)}
            {...rest}
            type={type === "password" && showPassword ? "text" : type}
            name={id}
            id={id}
            readOnly={readOnly}
            disabled={disabled}
            className={clsx(
              "flex w-full rounded-lg shadow-sm",
              "min-h-[2.25rem] py-0 md:min-h-[2.5rem]",
              "focus:border-primary-500 focus:ring-primary-500 border-gray-300",
              (readOnly || disabled) &&
                "cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              LeftIcon && "pl-9",
              rightNode && "pr-10"
            )}
            placeholder={placeholder}
            aria-describedby={id}
          />

          {rightNode && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {rightNode}
            </div>
          )}

          {type === "password" && (
            <button
              onClick={togglePassword}
              type="button"
              className="focus:ring-primary-500 absolute right-0 top-1/2 mr-3 flex -translate-y-1/2 items-center rounded-lg p-1 focus:outline-none focus:ring"
            >
              {showPassword ? (
                <HiEyeOff className="text-typo-icons hover:text-typo-secondary cursor-pointer text-xl" />
              ) : (
                <HiEye className="text-typo-icons hover:text-typo-secondary cursor-pointer text-xl" />
              )}
            </button>
          )}
        </div>
        {helperText && (
          <Typography variant="c1" color="secondary" className="mt-1">
            {helperText}
          </Typography>
        )}
        {!hideError && error && (
          <Typography variant="c1" color="danger" className="mt-1">
            {error?.message?.toString()}
          </Typography>
        )}
      </div>
    </div>
  );
}

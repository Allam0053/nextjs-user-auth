import clsx from "clsx";
import _, { get } from "lodash";
import * as React from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { IconType } from "react-icons";
import { NumericFormat } from "react-number-format";

import {
  isContainsNonDigitCharacters,
  isStringConvertableToNumber,
} from "@/lib/data-converter";

import Typography from "@/components/Typography";
export type InputProps = {
  /** Input label */
  label?: React.ReactNode;
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
  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;
  containerClassName?: string;
  className?: string;
  isShowInputFormat?: boolean;
  isText?: boolean;
} & React.ComponentPropsWithoutRef<"input">;
export default function Input({
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
  leftNode,
  rightNode,
  isShowInputFormat,
  containerClassName,
  className,
  isText,
  ...rest
}: InputProps) {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const error = _.get(errors, id);
  const withLabel = label !== null;

  // to keep focus on input when value changed
  const inputValue = watch(id);
  const [isCurrentPressedIsNotNumber, setIsCurrentPressedIsNotNumber] =
    React.useState(false);
  const isNumber = React.useMemo(() => {
    if (typeof isText === "boolean" && isText === false) return true;
    return (
      !isText &&
      !(typeof inputValue === "string" && inputValue.startsWith("0")) &&
      !isCurrentPressedIsNotNumber &&
      isStringConvertableToNumber(inputValue)
    );
  }, [inputValue, isCurrentPressedIsNotNumber, isText]);

  // TODO: masih jadi number kalo 4 angka berturut-turut dengan awalan bukan 0
  React.useEffect(() => {
    if (isText) return;
    if (!inputValue) return;
    const numberInputId = document.getElementById("number" + id);
    const textInputId = document.getElementById("text" + id);
    if (isNumber && !/\D/.test(inputValue)) {
      numberInputId && numberInputId.focus();
      return;
    }
    textInputId && textInputId.focus();
  }, [inputValue, id, isNumber, isCurrentPressedIsNotNumber, isText]);

  const onKeyDownNumericFormatHandler = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const currentInputPressed = get(e, "key", "");
      if (
        isContainsNonDigitCharacters(currentInputPressed) ||
        currentInputPressed === "0"
      ) {
        setIsCurrentPressedIsNotNumber(true);
      }
      setIsCurrentPressedIsNotNumber(false);
    },
    []
  );

  return (
    <div className={containerClassName}>
      {withLabel && (
        <Typography as="label" variant="s3" className="block" htmlFor={id}>
          {label}
        </Typography>
      )}
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
        <Controller
          rules={validation}
          render={({ field }) => {
            return (
              <>
                {!isText && isNumber && (
                  <NumericFormat
                    thousandSeparator={true}
                    onValueChange={(v) => field.onChange(v.value)}
                    value={field.value}
                    onKeyDown={(e) => {
                      // console.log('input is number', { key: e.key });
                      onKeyDownNumericFormatHandler(e);
                      if (e.key === "Enter") {
                        rest.onKeyDown?.(e);
                      }
                    }}
                    id={"number" + id}
                    readOnly={readOnly}
                    enterKeyHint="done"
                    disabled={disabled}
                    className={clsx(
                      "placeholder:capitalize",
                      "flex w-full rounded-lg shadow-sm",
                      "min-h-[2.25rem] py-0 md:min-h-[2.5rem]",
                      "focus:border-primary-500 focus:ring-primary-500 border-gray-300",
                      (readOnly || disabled) &&
                        "cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0",
                      error &&
                        "border-red-500 focus:border-red-500 focus:ring-red-500",
                      LeftIcon && "pl-9",
                      leftNode && "pl-9",
                      rightNode && "pr-10",
                      !isNumber && "hidden",
                      className
                    )}
                    placeholder={placeholder}
                    aria-describedby={id}
                    onBlur={() => {
                      field.onBlur();
                    }}
                  />
                )}
                <input
                  {...field}
                  {...rest}
                  name={id}
                  type={type}
                  id={"text" + id}
                  readOnly={readOnly}
                  disabled={disabled}
                  className={clsx(
                    "placeholder:capitalize",
                    "flex w-full rounded-lg shadow-sm",
                    "min-h-[2.25rem] py-0 md:min-h-[2.5rem]",
                    "focus:border-primary-500 focus:ring-primary-500 border-gray-300",
                    "hover:border-primary-400 transition-all",
                    (readOnly || disabled) &&
                      "cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0",
                    error &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500",
                    LeftIcon && "pl-9",
                    leftNode && "pl-9",
                    rightNode && "pr-10",
                    isNumber && "hidden",
                    className
                  )}
                  placeholder={placeholder}
                  aria-describedby={id}
                  onBlur={() => {
                    field.onBlur();
                  }}
                />
              </>
            );
          }}
          name={id}
          control={control}
        />
        {leftNode && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {leftNode}
          </div>
        )}
        {rightNode && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightNode}
          </div>
        )}
      </div>
      {helperText && (
        <Typography
          variant="c1"
          color="secondary"
          className="mt-1 flex w-full justify-between"
        >
          {helperText}
          {isShowInputFormat && (
            <Typography
              variant="c2"
              className="border-1 inline-flex border-slate-200 bg-slate-100 text-slate-600"
            >
              {isNumber ? "Nomor" : "Teks"}
            </Typography>
          )}
        </Typography>
      )}
      {!hideError && error && (
        <Typography variant="c1" color="danger" className="mt-1">
          {error?.message?.toString()}
        </Typography>
      )}
    </div>
  );
}

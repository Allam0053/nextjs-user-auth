import _ from "lodash";
import * as React from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { IconType } from "react-icons";

import { cn as clsxm } from "@/lib/utils";

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
  /**
   * Input type
   * @example text, email, password
   */
  type?: React.HTMLInputTypeAttribute;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
  leftIcon?: IconType | string;
  rightNode?: React.ReactNode;
  containerClassName?: string;
  outterClassName?: string;
  /** Small text below input, useful for additional information */
  helperText?: string;

  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
} & React.ComponentPropsWithoutRef<"input">;

export default function EditableInput({
  label,
  placeholder = "",
  id,
  type = "text",
  disabled,
  readOnly = false,
  validation,
  leftIcon: LeftIcon,
  rightNode,
  containerClassName,
  outterClassName,
  value: passedValue,
  helperText,

  hideError = false,
  ...rest
}: InputProps) {
  const [inputValue, setInputValue] = React.useState<
    number | string | string[] | undefined
  >(passedValue as string);
  const {
    // register,
    formState: { errors },
    control,
  } = useFormContext();
  // const {
  //   field,
  //   fieldState: { invalid, isTouched, isDirty },
  //   formState: { touchedFields, dirtyFields }
  // } = useController({
  //   id,
  //   control,
  //   rules: { required: true },
  // });

  React.useEffect(() => {
    if (Array.isArray(passedValue)) setInputValue([...passedValue]);
    setInputValue(passedValue as number | string | undefined);
  }, [passedValue]);
  const withLabel = label !== null;

  const error = _.get(errors, id);
  return (
    <div className={clsxm("relative", outterClassName)}>
      {withLabel && (
        <Typography as="label" variant="s3" className="block" htmlFor={id}>
          {label}
        </Typography>
      )}
      <div className={clsxm("relative", containerClassName)}>
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
          control={control}
          name={id}
          defaultValue={passedValue}
          rules={validation}
          render={({ field }) => (
            <input
              {...field}
              {...rest}
              type={type}
              name={field.name}
              id={field.name}
              readOnly={readOnly}
              className={clsxm(
                "flex w-full rounded-lg shadow-sm",
                "min-h-[2.25rem] py-0 md:min-h-[2.5rem]",
                "focus:border-primary-500 focus:ring-primary-500 border-gray-300",
                (readOnly || disabled) &&
                  "cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0",
                error &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500",
                LeftIcon && "pl-9",
                rightNode && "pr-10"
              )}
              placeholder={placeholder}
              aria-describedby={id}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                rest.onChange && rest.onChange(e);
                field.onChange && field.onChange(e);
              }}
            />
          )}
        />

        {rightNode && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightNode}
          </div>
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
  );
}

/*
<input
  {...register(id, validation)}
  {...rest}
  type={type}
  name={id}
  id={id}
  readOnly={readOnly}
  disabled={disabled}
  className={clsxm(
    'text-xs',
    'flex w-full rounded-lg', //shadow-sm
    'min-h-[2.25rem] py-0 md:min-h-[2.5rem]',
    'focus:border-1 border-0 border-gray-300 focus:border-primary-500 focus:ring-primary-500',
    (readOnly || disabled) &&
      'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    LeftIcon && 'pl-9',
    rightNode && 'pr-10'
  )}
  placeholder={placeholder}
  aria-describedby={id}
/>
*/

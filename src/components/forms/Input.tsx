import clsx from 'clsx';
import _ from 'lodash';
import * as React from 'react';
import { useEffect } from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { IconType } from 'react-icons';
import { NumericFormat } from 'react-number-format';

import Typography from '@/components/elements/typography/Typography';
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
  rightNode?: React.ReactNode;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'input'>;
export default function Input({
  label,
  placeholder = '',
  helperText,
  id,
  type = 'text',
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
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const error = _.get(errors, id);
  const withLabel = label !== null;

  // to keep focus on input when value changed
  const inputValue = watch(id);
  const isNumber = !isNaN(parseInt(inputValue));

  useEffect(() => {
    const numberInputId = document.getElementById('number' + id);
    const textInputId = document.getElementById('text' + id);
    if (isNumber && numberInputId) {
      numberInputId.focus();
    } else if (textInputId) {
      textInputId.focus();
    }
  }, [inputValue, id, isNumber]);

  return (
    <div className={containerClassName}>
      {withLabel && (
        <Typography as='label' variant='s3' className='block' htmlFor={id}>
          {label}
        </Typography>
      )}
      <div className={clsx('relative', withLabel && 'mt-1')}>
        {LeftIcon && (
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            {typeof LeftIcon === 'string' ? (
              <Typography variant='s4'>{LeftIcon}</Typography>
            ) : (
              <LeftIcon size='1em' className='text-xl text-typo' />
            )}
          </div>
        )}
        <Controller
          rules={validation}
          render={({ field }) => {
            return (
              <>
                <NumericFormat
                  thousandSeparator={true}
                  onValueChange={(v) => field.onChange(v.value)}
                  value={field.value}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      rest.onKeyDown?.(e);
                    }
                  }}
                  id={'number' + id}
                  readOnly={readOnly}
                  enterKeyHint='done'
                  disabled={disabled}
                  className={clsx(
                    'flex w-full rounded-lg shadow-sm',
                    'min-h-[2.25rem] py-0 md:min-h-[2.5rem]',
                    'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
                    (readOnly || disabled) &&
                      'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
                    error &&
                      'border-red-500 focus:border-red-500 focus:ring-red-500',
                    LeftIcon && 'pl-9',
                    rightNode && 'pr-10',
                    !isNumber && 'hidden'
                  )}
                  placeholder={placeholder}
                  aria-describedby={id}
                  onBlur={() => {
                    field.onBlur();
                  }}
                />
                <input
                  {...field}
                  {...rest}
                  name={id}
                  type={type}
                  id={'text' + id}
                  readOnly={readOnly}
                  disabled={disabled}
                  className={clsx(
                    'flex w-full rounded-lg shadow-sm',
                    'min-h-[2.25rem] py-0 md:min-h-[2.5rem]',
                    'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
                    (readOnly || disabled) &&
                      'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
                    error &&
                      'border-red-500 focus:border-red-500 focus:ring-red-500',
                    LeftIcon && 'pl-9',
                    rightNode && 'pr-10',
                    isNumber && 'hidden'
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
        {rightNode && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
            {rightNode}
          </div>
        )}
      </div>
      {helperText && (
        <Typography variant='c1' color='secondary' className='mt-1'>
          {helperText}
        </Typography>
      )}
      {!hideError && error && (
        <Typography variant='c1' color='danger' className='mt-1'>
          {error?.message?.toString()}
        </Typography>
      )}
    </div>
  );
}

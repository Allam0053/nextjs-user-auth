import clsx from 'clsx';
import { get } from 'lodash';
import React from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/elements/typography/Typography';

export type TextAreaProps = {
  label?: React.ReactNode;
  id: string;
  placeholder?: string;
  helperText?: string;
  readOnly?: boolean;
  hideError?: boolean;
  validation?: RegisterOptions;
  containerClassName?: string;
} & React.ComponentPropsWithoutRef<'textarea'>;

export default function TextArea({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  hideError = false,
  validation,
  disabled,
  containerClassName,
  value: passedValue,
  ...rest
}: TextAreaProps) {
  const [inputValue, setInputValue] = React.useState<
    number | string | string[] | undefined
  >(passedValue as string);
  const {
    // register,
    formState: { errors },
    control,
  } = useFormContext();
  const error = get(errors, id);
  const withLabel = label !== null;
  React.useEffect(() => {
    if (Array.isArray(passedValue)) setInputValue([...passedValue]);
    setInputValue(passedValue as number | string | undefined);
  }, [passedValue]);

  return (
    <div className={containerClassName}>
      {withLabel && (
        <Typography as='label' variant='s3' className='block' htmlFor={id}>
          {label}
        </Typography>
      )}
      <div className={clsx('relative', withLabel && 'mt-1')}>
        <Controller
          control={control}
          name={id}
          defaultValue={passedValue}
          rules={validation}
          render={({ field }) => (
            <textarea
              {...field}
              {...rest}
              name={field.name}
              id={field.name}
              readOnly={readOnly}
              className={clsxm(
                'flex w-full rounded-lg shadow-sm',
                'min-h-[2.25rem] py-0 md:min-h-[2.5rem]',
                'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
                (readOnly || disabled) &&
                  'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0',
                error &&
                  'border-red-500 focus:border-red-500 focus:ring-red-500'
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

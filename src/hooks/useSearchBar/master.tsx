/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "lodash";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { HiOutlineSearch, HiOutlineXCircle } from "react-icons/hi";
import { useDebounce } from "usehooks-ts";

import Input, { InputProps } from "@/components/forms/Input";

// TODO: extract this to another file
export default function useSearchBar(
  placeholder = "Cari sesuatu",
  inputComponentProps: Omit<React.ComponentProps<typeof Input>, "id"> & {
    id?: string;
    onEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  } = { id: "search" },
  helperText = "Enter untuk cari"
) {
  const id = inputComponentProps.id ? inputComponentProps.id : "search";
  //#region  //*=========== Form ===========
  const [query, setQuery] = useState("");
  const [onChangeValue, setOnChangeValue] = useState("");
  const onChangeValueDebounced = useDebounce<string>(onChangeValue, 500);
  const className = inputComponentProps?.className;
  // const [inputSearch, setInputSearch] = useState('');
  const methods = useForm({
    mode: "onTouched",
  });
  const { handleSubmit, reset, setValue } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onEnter = React.useCallback<
    React.KeyboardEventHandler<HTMLInputElement>
  >(
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const value = get(event, "target.value", "");
        // submit on enter
        setQuery(value);
        setValue(id, value);
        inputComponentProps?.onEnter?.(event);
      }
    },
    [setQuery, setValue]
  );
  // const onBlur = React.useCallback<React.FocusEventHandler<HTMLInputElement>>(
  //   (event) => {
  //     const value = get(event, 'target.value', '');
  //     setQuery(value);
  //     setValue(id, value);
  //   },
  //   [setQuery, setValue]
  // );
  const onChange = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((event) => {
    setOnChangeValue(get(event, "target.value", ""));
    setValue(id, get(event, "target.value", ""));
  }, []);
  React.useEffect(() => {
    setQuery(onChangeValueDebounced);
    //   // setValue(id, onChangeValueDebounced);
    // console.log({ onChangeValueDebounced });
  }, [onChangeValueDebounced]);
  const onSubmit = React.useCallback(
    (data: unknown) => {
      setQuery(get(data, id, ""));
      return;
    },
    [id]
  );
  const onClearSearch = React.useCallback(() => {
    // setInputSearch('');
    reset();
    setValue(id, "");
    setTimeout(() => handleSubmit(onSubmit)());
  }, [handleSubmit, inputComponentProps.id, onSubmit, reset, setValue]);
  //#endregion  //*======== Form Submit ===========

  const InputComponent: React.FC<Omit<InputProps, "id"> & { id?: string }> =
    React.useCallback(
      (componentProps) => {
        return (
          <Input
            {...inputComponentProps}
            {...componentProps}
            id={id}
            key={id}
            // value={inputSearch}
            // onChange={(e) => setInputSearch(String(e.target.value))}
            label={null}
            placeholder={placeholder}
            helperText={helperText}
            leftIcon={HiOutlineSearch}
            className={className}
            onKeyDown={onEnter}
            rightNode={
              <button type="button" className="p-1" onClick={onClearSearch}>
                <HiOutlineXCircle className="text-typo-icons text-xl" />
              </button>
            }
            onChange={onChange}
          />
        );
      },
      [
        className,
        helperText,
        // inputComponentProps,
        onClearSearch,
        onEnter,
        placeholder,
      ]
    );

  const SearchBarComponent: React.FC<Omit<InputProps, "id"> & { id?: string }> =
    React.useCallback(
      (componentProps) => {
        return (
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-3"
            >
              <InputComponent {...componentProps} />
            </form>
          </FormProvider>
        );
      },
      [InputComponent, handleSubmit, methods, onSubmit]
    );

  return {
    query,
    setQuery,
    // inputSearch,
    // setInputSearch,
    methods,
    onSubmit,
    onEnter,
    onClearSearch,
    SearchBarComponent,
  };
}

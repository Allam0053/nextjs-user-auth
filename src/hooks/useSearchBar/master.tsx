/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from 'lodash';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiOutlineSearch, HiOutlineXCircle } from 'react-icons/hi';

import Input from '@/components/forms/Input';

// TODO: extract this to another file
export default function useSearchBar(
  placeholder = 'Cari sesuatu',
  inputComponentProps = {},
  helperText = 'enter untuk search'
) {
  //#region  //*=========== Form ===========
  const [query, setQuery] = useState('');
  // const [inputSearch, setInputSearch] = useState('');
  const methods = useForm({
    mode: 'onTouched',
  });
  const { handleSubmit, reset } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Form Submit ===========
  const onEnter = React.useCallback<
    React.KeyboardEventHandler<HTMLInputElement>
  >((event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // submit on enter
      setQuery(get(event, 'target.value', ''));
    }
  }, []);
  const onSubmit = React.useCallback((data: unknown) => {
    setQuery(get(data, 'search', ''));
    return;
  }, []);
  const onClearSearch = React.useCallback(() => {
    // setInputSearch('');
    reset();
    setTimeout(() => handleSubmit(onSubmit)());
  }, [handleSubmit, onSubmit, reset]);
  //#endregion  //*======== Form Submit ===========

  const InputComponent: React.FC<object> = React.useCallback(() => {
    return (
      <Input
        {...inputComponentProps}
        id='search'
        // value={inputSearch}
        // onChange={(e) => setInputSearch(String(e.target.value))}
        label={null}
        placeholder={placeholder}
        helperText={helperText}
        leftIcon={HiOutlineSearch}
        onKeyDown={onEnter}
        rightNode={
          <button type='button' className='p-1' onClick={onClearSearch}>
            <HiOutlineXCircle className='text-xl text-typo-icons' />
          </button>
        }
      />
    );
  }, [inputComponentProps, onClearSearch, onEnter, placeholder]);

  const SearchBarComponent: React.FC<object> = React.useCallback(() => {
    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-3'>
          <InputComponent />
        </form>
      </FormProvider>
    );
  }, [InputComponent, handleSubmit, methods, onSubmit]);

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

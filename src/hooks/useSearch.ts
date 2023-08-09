import React from 'react';

import {
  exactMatchSubstring,
  generateCache,
  getSearchStringValueCastToArray,
  searchFunctionForReference,
} from '@/lib/search-string';

/**
 * only receive deps, no args
 * @param deps
 */
export default function useSearch<T>(pathToSearch: string, deps: Array<T>) {
  const data = deps;
  const [searchMethod, setSearchMethod] = React.useState<
    'fast' | 'detail' | 'exact'
  >('exact');
  const path = React.useMemo(() => pathToSearch, [pathToSearch]);

  // const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = React.useState<string[]>([]);

  const fastSearchCache = React.useMemo(() => {
    const cacheSearch = generateCache(data, path);
    return cacheSearch;
  }, [data, path]);

  const getCache = React.useMemo(() => {
    return fastSearchCache.get(searchTerm[0]);
  }, [fastSearchCache, searchTerm]);

  // collect the search terms
  const onSubmitHandler = React.useCallback((searchString: string) => {
    // e.preventDefault();
    const getInputValues = getSearchStringValueCastToArray(searchString);
    setSearchTerm(getInputValues);
  }, []);

  // filter data
  const processedData = React.useMemo(() => {
    if (searchTerm.length === 0) return data;
    if (searchMethod === 'fast') return getCache;
    if (searchMethod === 'detail')
      return searchFunctionForReference(data, searchTerm, path);
    return exactMatchSubstring(data, searchTerm, path);
  }, [searchTerm, data, searchMethod, getCache, path]);

  return {
    searchMethod,
    setSearchMethod,
    path,
    searchTerm,
    setSearchTerm,
    fastSearchCache,
    getCache,
    onSubmitHandler,
    processedData,
  };
}

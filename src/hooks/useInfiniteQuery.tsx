/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import axios from "axios";
import { get } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

// import CONFIG from "@/services/endpoint/config";

const CONFIG = {
  V: "",
  BASE_URL: "https://reqres.in/api",
};

// future foldering follow postman
export const NextAuthModules = {
  Login: "/login",
  User: "/users",
};

export type useInfiniteQueryCommonProps = {
  module: string;
  passedParams?: Record<string, any>;
  useInfiniteQueryOptions?:
    | Omit<
        UseInfiniteQueryOptions<any, unknown, any, any, string[]>,
        "queryKey" | "queryFn"
      >
    | undefined;
  additionalPath?: string;
};

export default function useInfiniteQueryCommon<T>({
  module,
  passedParams,
  useInfiniteQueryOptions = {},
  additionalPath = "",
}: useInfiniteQueryCommonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fetchSearchResults = React.useCallback(
    async ({ pageParam = 1 }) => {
      const toBeParams = {
        // take: CONFIG.take,
        // order: CONFIG.order,
        page: pageParam,
        // ...searchParams,
        // ...passedParams,
      };
      const url = `${CONFIG.BASE_URL}${module}?${paramBuilder(toBeParams)}`;
      const response = await axios.get(url);
      return response.data;
    },
    [additionalPath, module, passedParams, searchParams]
  );

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...restQueryResult
    // isError,
  } = useInfiniteQuery(
    [
      module,
      additionalPath,
      paramBuilder({
        ...searchParams,
        ...passedParams,
      }),
    ],
    fetchSearchResults,
    {
      getNextPageParam: (lastPage) => {
        console.log({ lastPage });
        // const { pagination } = lastPage as { pagination: Pagination };
        const currentPage = get(lastPage, "page", 1);
        const lastIndexPage = get(lastPage, "total_pages", 1);
        return currentPage < lastIndexPage ? currentPage + 1 : null;
      },
      ...useInfiniteQueryOptions,
    }
  );

  type FlatData<T> = T extends (infer U)[] ? U : any;
  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  ) as FlatData<T>[];

  return {
    ...restQueryResult,
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    flatData,
    infiniteScroll: {
      fetchNextPage: fetchNextPage,
      hasNextPage: hasNextPage || false,
      isFetchingNextPage: isFetchingNextPage,
    },
  };
}

/**
   * params in order, example:
  {
    search: '',
    order: 'DESC',
    page: 1,
    take: 10,
    supplier_id: 82
  }
  
   * search=&order=DESC&page=1&take=10&supplier_id=82
   */
export function paramBuilder(props: object) {
  return Object.entries(props)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
}

export interface Pagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

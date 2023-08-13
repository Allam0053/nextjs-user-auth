import {
  QueryClient as QueryClientv4,
  QueryClientProvider as QueryClientProviderv4,
  QueryOptions as QueryOptionsv4,
} from "@tanstack/react-query";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";

import { AuthProvider } from "@/hooks/useAuth";
import axios from "axios";

const defaultQueryFn = async ({ queryKey }: QueryOptionsv4) => {
  const { data } = await axios.get(`${queryKey?.[0]}`);
  return data;
};

const queryClientv4 = new QueryClientv4({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
export type TanStackReactQueryProveiderProps = {
  children: React.ReactElement;
};

export function TanStackReactQueryProveider({
  children,
}: TanStackReactQueryProveiderProps) {
  return (
    <QueryClientProviderv4 client={queryClientv4}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProviderv4>
  );
}

export default TanStackReactQueryProveider;

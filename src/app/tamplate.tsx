"use client";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";

import useAxiosLoadingProgress from "@/hooks/useAxiosLoadingProgress";
import TanStackReactQueryProveider from "@/components/providers/ReactQuery";

export default function Template({ children }: { children: React.ReactNode }) {
  const LoadingComponent = useAxiosLoadingProgress();
  React.useEffect(() => {
    axios.interceptors.request.use((config) => {
      return config;
    });

    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response.status === 401) {
          Cookies.remove("dataUser");
          Cookies.remove("token");
          window.location.reload();
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return (
    <>
      <TanStackReactQueryProveider>
        <>
          <LoadingComponent />
          {children}
        </>
      </TanStackReactQueryProveider>
    </>
  );
}

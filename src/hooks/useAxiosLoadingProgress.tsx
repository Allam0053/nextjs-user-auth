import axios from 'axios';
import { atom, useAtom } from 'jotai';
import React from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

export const fetchingOperationCounts = atom(0);
export const useFetchingOperationCounts = () =>
  useAtom(fetchingOperationCounts);

export default function useAxiosLoadingProgress() {
  // const [loading, setLoading] = useGlobalIsLoading();
  const isLoadingRef = React.useRef<{ value: boolean }>({ value: false });
  const loadingRef = React.useRef<LoadingBarRef>(null);
  const [fetchCounts, setFetchCounts] = useFetchingOperationCounts();
  const notify = React.useCallback(() => {
    setFetchCounts((prev) => prev + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const update = React.useCallback(() => {
    setFetchCounts((prev) => prev - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (fetchCounts === 0) {
      loadingRef?.current?.complete();
      isLoadingRef.current.value = false;
      return;
    }

    if (!isLoadingRef.current.value) {
      loadingRef?.current?.continuousStart();
      isLoadingRef.current.value = true;
      return;
    }
  }, [fetchCounts]);

  React.useEffect(() => {
    axios.interceptors.request.use((config) => {
      notify();
      return config;
    });

    axios.interceptors.response.use(
      function (response) {
        update();
        return response;
      },
      function (error) {
        update();
        throw error;
      }
    );
  }, [notify, update]);

  const Component = React.useCallback(
    (props: React.ComponentProps<typeof LoadingBar>) => {
      return (
        <LoadingBar
          color='linear-gradient(to right, #EB982F 50%, #E14E83 100%)'
          ref={loadingRef}
          height={3}
          {...props}
        />
      );
    },
    []
  );

  return Component;
}

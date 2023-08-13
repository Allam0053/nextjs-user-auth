"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { User } from "@/hooks/useUserColumns";

import Typography from "@/components/Typography";
import { get } from "lodash";
import { DialogContent, DialogRoot } from "@/components/Dialog";
import axios, { AxiosError } from "axios";
import API_ENDPOINT from "@/services/api-endpoint";
import { ApiError, ApiResponse } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import { ImSpinner2 } from "react-icons/im";
import { cn } from "@/lib/utils";

export type DetailUserModalProps = {
  tabState?: number;
  setTabState?: () => void;
};
export function DetailUserModal({
  tabState,
  setTabState,
}: DetailUserModalProps) {
  const fetcher = React.useCallback(async () => {
    // TODO: result hashFn itu harusnya dapat dari BE bukan manggil function hashFn
    const response = await axios.get(`${API_ENDPOINT.URL_USER}/${tabState}`);
    return response.data;
  }, [tabState]);
  const { data, isLoading } = useQuery<ApiResponse<User>, AxiosError<ApiError>>(
    ["users", tabState],
    fetcher
  );
  const user = get(data, "data", {});

  return (
    <DialogRoot
      open={tabState !== undefined && tabState > 0}
      onOpenChange={() => setTabState?.()}
    >
      <DialogContent
        isFullScreen
        className="z-[60] w-8/12 max-w-md"
        overlayClassName="z-[59]"
      >
        <div className="flex flex-col items-center gap-1 space-x-6">
          <Typography as="label" variant="h2" className="mb-4 block">
            Detail User
          </Typography>

          {isLoading && (
            <p
              className={cn(
                "text-[17px] font-medium",
                isLoading ? "" : "hidden"
              )}
            >
              <ImSpinner2 className="animate-spin" /> Loading...
            </p>
          )}
          {get(user, "avatar") && (
            <img
              className="mb-2 max-w-[120px] rounded-full"
              src={get(user, "avatar", "")}
              alt={get(user, "first_name", "")}
            />
          )}
          {Object.entries(user).map(([key, value], index) => (
            <div className="grid w-full grid-cols-2">
              <Typography as="label" variant="s3" className="block font-bold">
                {key}
              </Typography>
              <Typography as="label" variant="h6" className="block font-medium">
                {value}
              </Typography>
            </div>
          ))}
        </div>
      </DialogContent>
    </DialogRoot>
  );
}

"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { cn as clsxm } from "@/lib/utils";
import { User, useUsersColumn } from "@/hooks/useUserColumns";
import useInfiniteQueryCommon, {
  NextAuthModules,
} from "@/hooks/useInfiniteQuery";
import useSearchBar from "@/hooks/useSearchBar/master";

import Seo from "@/components/Seo";
import Layout, { Section, ShadowedBox } from "@/components/layout/Layout";
import TableVirtualized from "@/components/table/TableVirtualized";
import Typography from "@/components/Typography";
import RegisterModal from "@/app/components/RegisterModal";
import { useRouter } from "next/navigation";
import { get } from "lodash";
import { DetailUserModal } from "@/app/components/DetailUserModal";
export default function ClientComponent() {
  const router = useRouter();
  const { SearchBarComponent, query } = useSearchBar("Cari kode / nama...");

  const columns = useUsersColumn();

  const { isLoading, infiniteScroll, flatData } = useInfiniteQueryCommon<User>({
    module: NextAuthModules.User,
    passedParams: {
      search: query,
    },
  });

  const [userId, setUserId] = React.useState(0);
  const isSelectedFn = React.useCallback(
    (indexInFlatData?: number | string) => {
      // const selectedItemIndex = selectedItem?.id;
      const flatDataItemId = flatData?.[indexInFlatData as number]?.id;
      return userId === flatDataItemId;
    },
    [userId, flatData]
  );
  const isCanSelectedFn = React.useCallback(
    (indexInFlatData?: number | string): boolean => {
      const flatDataItemId = flatData?.[indexInFlatData as number]?.id;
      const dataDetailId = userId;
      return flatDataItemId !== dataDetailId;
    },
    [flatData, userId]
  );
  const onRowClick = React.useCallback(
    (_event: any, indexInFlatData?: number | string) => {
      const userId = get(flatData, `${indexInFlatData}.id`);
      if (!userId) return;
      setUserId(userId);
    },
    [flatData]
  );

  //#region  //*=========== User Selecting ===========
  //#endregion  //*======== Supplier Selecting ===========
  return (
    <ShadowedBox className="flex-1">
      <div className="flex h-[76px] w-full justify-between">
        <Typography variant="h6">User List</Typography>
        <div className="flex items-start gap-5">
          <SearchBarComponent />
          <RegisterModal />
          <DetailUserModal tabState={userId} setTabState={() => setUserId(0)} />
        </div>
      </div>

      <div
        className={clsxm("relative flex w-full flex-1 flex-col p-0")}
        ref={columns.ref}
      >
        <TableVirtualized
          isLoading={isLoading}
          data={flatData as User[]}
          columns={columns.column}
          onRowClick={onRowClick}
          isSelectedFn={isSelectedFn}
          isCanSelectedFn={isCanSelectedFn}
          columnResizeMode="onEnd"
          infiniteScroll={infiniteScroll}
        />
      </div>
    </ShadowedBox>
  );
}

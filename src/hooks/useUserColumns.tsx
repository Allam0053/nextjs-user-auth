import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useElementSize } from "usehooks-ts";

import { COLUMN_SIZE } from "@/lib/column";
import { generateSizeRecursiveColumn } from "@/lib/column-recursive";
import { get } from "lodash";
import { UserFirstNameLastNameCell } from "@/components/table/cell/UserCell";

export type User = {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
};

export function useUsersColumn() {
  const [ref, { width }] = useElementSize();

  const result = {
    column: React.useMemo<ColumnDef<User>[]>(() => {
      const colsWithoutSize: ColumnDef<User>[] = [
        {
          meta: {
            sizeScale: COLUMN_SIZE.AVATAR,
            align: "right",
          },
          accessorFn: (row) => get(row, "avatar", ""),
          id: "avatar",
          header: "Avatar",
          cell: ({ getValue }) => (
            <div className="flex justify-end">
              <img
                src={getValue() as string}
                alt="picture"
                className="w-auto"
              />
            </div>
          ),
        },
        {
          meta: {
            sizeScale: COLUMN_SIZE.NAME,
          },
          accessorFn: (row) =>
            `${get(row, "first_name", "")} ${get(row, "last_name", "")}`,
          id: "name",
          header: "Name",
          cell: ({ row }) =>
            UserFirstNameLastNameCell({
              first_name: get(row, "original.first_name", ""),
              last_name: get(row, "original.last_name", ""),
            }),
        },
        {
          meta: {
            sizeScale: COLUMN_SIZE.EMAIL,
          },
          accessorFn: (row) => get(row, "email", ""),
          id: "email",
          header: "Email",
        },
      ];
      return generateSizeRecursiveColumn(colsWithoutSize, width);
    }, [width]),
    ref: ref,
  };

  return result;
}

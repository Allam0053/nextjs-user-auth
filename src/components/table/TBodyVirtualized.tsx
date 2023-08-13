/* eslint-disable @typescript-eslint/no-explicit-any */
import { flexRender, RowData, Table } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import _ from "lodash";
import * as React from "react";

import { cn as clsxm } from "@/lib/utils";

type TBodyProps<T extends RowData> = {
  isLoading?: boolean;
  table: Table<T>;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  bodyPlaceholder?: React.ReactNode;
  onRowClick?: (event: React.MouseEvent, index?: number | string) => void;
  isSelectedFn?: (index?: number | string) => boolean;
  isCanSelectedFn?: (index?: number | string) => boolean;
} & React.ComponentPropsWithoutRef<"div">;

export default function TBody<T extends RowData>({
  className,
  isLoading = false,
  table,
  virtualizer,
  bodyPlaceholder,
  onRowClick,
  isSelectedFn,
  isCanSelectedFn,
  ...rest
}: TBodyProps<T>) {
  const rows = table.getRowModel().rows;
  const virtualizedItems = virtualizer.getVirtualItems();

  return (
    <tbody
      className={clsxm(
        "divide-y divide-gray-200 bg-white",
        // 'dark:divide-gray-800',
        className
      )}
      style={{
        height: `${virtualizer.getTotalSize()}px`,
        position: "relative",
      }}
      {...rest}
    >
      {isLoading && (
        <tr
          className={clsxm(
            "flex",
            "animate-pulse bg-gray-50",
            "dark:bg-gray-800"
          )}
        >
          <td
            colSpan={table.getAllColumns().length}
            className={clsxm(
              "whitespace-nowrap px-6 py-4 text-center text-xs text-gray-700",
              "dark:text-gray-100"
            )}
          >
            <span>Memuat data...</span>
          </td>
        </tr>
      )}
      {rows.length === 0 && !isLoading ? (
        <tr className={clsxm("flex", "bg-gray-50", "dark:bg-gray-800")}>
          <td
            colSpan={table.getAllColumns().length}
            className={clsxm(
              "whitespace-nowrap px-6 py-4 text-center text-xs text-gray-700",
              "dark:text-gray-100"
            )}
          >
            {bodyPlaceholder ? (
              bodyPlaceholder
            ) : (
              <span>Data tidak ditemukan</span>
            )}
          </td>
        </tr>
      ) : (
        virtualizedItems.map((virtualRow) => {
          const row = rows[virtualRow.index];
          return (
            <tr
              key={`virtualized-row-${row.id}`}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              className={clsxm(
                "flex",
                "absolute",
                virtualRow.index % 2 === 0 ? "bg-white" : "bg-gray-50",
                isSelectedFn && isSelectedFn(row.id) ? "bg-gray-200" : "",
                isCanSelectedFn !== undefined
                  ? isCanSelectedFn && isCanSelectedFn(row.id)
                    ? "cursor-pointer hover:bg-gray-100"
                    : "cursor-not-allowed bg-red-100"
                  : ""
                // virtualRow.index % 2 === 0
                //   ? 'dark:bg-dark'
                //   : 'dark:bg-gray-800'
              )}
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
              onClick={(e) => {
                onRowClick && onRowClick(e, row.id);
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={`row:${row.id};cell:${cell.id};`}
                  color="secondary"
                  className={clsx([
                    "whitespace-nowrap",
                    "truncate",
                    "px-2 py-4 pl-[34px]",
                    "text-xs text-gray-600",
                    {
                      "text-left":
                        _.get(cell, "column.columnDef.meta.align", "left") ===
                        "left",
                      "text-center":
                        _.get(
                          cell,
                          "column.columnDef.meta.align",
                          "" as "center"
                        ) === "center",
                      "text-right":
                        _.get(
                          cell,
                          "column.columnDef.meta.align",
                          "" as "right"
                        ) === "right",
                    },
                  ])}
                  title={(cell.getValue() ?? ("" as any)).toString() as string}
                  style={{
                    // width: cell.column.getSize(),
                    width:
                      cell.column.getSize() !== 0
                        ? cell.column.getSize()
                        : undefined,
                    maxWidth:
                      cell.column.getSize() !== 0
                        ? cell.column.getSize()
                        : undefined,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })
      )}
    </tbody>
  );
}

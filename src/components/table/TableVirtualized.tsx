/* eslint-disable @typescript-eslint/ban-types */
import {
  ColumnDef,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { get } from 'lodash';
import * as React from 'react';
import { useElementSize } from 'usehooks-ts';

import clsxm from '@/lib/clsxm';

import Filter from '@/components/table/Filter';
import TBodyVirtualized from '@/components/table/TBodyVirtualized';
import TFoot from '@/components/table/TFoot';
import THead from '@/components/table/THead';

export type TFootCustomProps<T extends RowData> = {
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export type ExpandableT<T> = T & {
  subRows?: T[];
};

export type TableProps<T extends object> = {
  data: ExpandableT<T>[];
  columns: ColumnDef<ExpandableT<T>>[];
  omitSort?: boolean;
  withFilter?: boolean;
  withFooter?: boolean;
  isLoading?: boolean;
  columnResizeMode?: 'onEnd' | 'onChange';
  bodyPlaceholder?: React.ReactNode;
  onRowClick?: (event: React.MouseEvent, index?: number | string) => void;
  isSelectedFn?: (index?: number | string) => boolean;
  isCanSelectedFn?: (index?: number | string) => boolean;
  CustomFooter?: ({ table }: TFootCustomProps<T>) => React.ReactNode;
  infiniteScroll?: {
    fetchNextPage: () => void;
    hasNextPage?: boolean;
    isFetchingNextPage: boolean;
  };
  isExpandableRows?: boolean;
  defaultSort?: SortingState;
} & React.ComponentPropsWithoutRef<'div'>;

/**
 * uncomment dark styles if you want to enable dark theme
 */

export default function TableVirtualized<T extends object>({
  className,
  columns,
  data,
  columnResizeMode = 'onEnd',
  omitSort = false,
  withFilter = false,
  withFooter = false,
  bodyPlaceholder,
  isLoading,
  onRowClick,
  isSelectedFn,
  isCanSelectedFn,
  CustomFooter,
  infiniteScroll,
  isExpandableRows = false,
  defaultSort,
  ...rest
}: TableProps<T>) {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>(defaultSort ?? []);

  const [grandParentRef, { height: tableGrandParentHeight }] = useElementSize();
  const [tableParentHeight, setTableParentHeight] = React.useState(100);
  React.useEffect(() => {
    if (typeof document !== undefined && tableGrandParentHeight) {
      setTableParentHeight(tableGrandParentHeight ?? 100);
    }
  }, [data, tableGrandParentHeight]);

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    state: {
      globalFilter,
      sorting,
      expanded,
    },
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => get(row, 'subRows', undefined),
  });

  const parentRef = React.useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    // horizontal: true,
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
  });

  /* ----------------------------- Infinite Scroll ---------------------------- */

  function handleScroll(event: any) {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const scrollThreshold = 100;

    if (
      scrollHeight - scrollTop <= clientHeight + scrollThreshold &&
      infiniteScroll?.hasNextPage &&
      !infiniteScroll?.isFetchingNextPage
    ) {
      infiniteScroll && infiniteScroll?.fetchNextPage();
    }
  }

  return (
    <div className={clsxm('flex w-full flex-1 flex-col', className)} {...rest}>
      {withFilter && <Filter table={table} />}
      <div
        className={clsxm(
          // '-mx-4 -my-2 mt-2 sm:-mx-6 lg:-mx-8',
          'flex w-full flex-1 flex-col py-2'
        )}
      >
        <div
          className='flex w-full flex-1 flex-col p-0 align-middle'
          ref={grandParentRef}
          test-id='table-grand-parent'
        >
          <div
            className={clsxm(
              'overflow-auto ring-1 ring-black ring-opacity-5 md:rounded-lg'
              // 'dark:ring-gray-800'
            )}
            onScroll={handleScroll}
            style={{
              height: tableParentHeight,
            }}
            ref={parentRef}
            test-id='table-parent'
          >
            <table
              className={clsxm(
                'min-w-full divide-y divide-gray-200 '
                // 'dark:divide-gray-800'
              )}
            >
              <THead
                table={table}
                omitSort={omitSort}
                columnResizeMode={columnResizeMode}
              />
              <TBodyVirtualized
                table={table}
                virtualizer={virtualizer}
                onRowClick={onRowClick}
                isSelectedFn={isSelectedFn}
                isCanSelectedFn={isCanSelectedFn}
                bodyPlaceholder={bodyPlaceholder}
                isLoading={isLoading}
              />

              {withFooter && <TFoot table={table} />}
              {CustomFooter && CustomFooter({ table })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

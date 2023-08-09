import { flexRender, RowData, Table } from '@tanstack/react-table';
import clsx from 'clsx';
import _ from 'lodash';
import * as React from 'react';
import { VscTriangleDown } from 'react-icons/vsc';

import clsxm from '@/lib/clsxm';

/**
 * uncomment dark styles if you want to enable dark theme
 */

type THeadProps<T extends RowData> = {
  omitSort: boolean;
  table: Table<T>;
  columnResizeMode?: 'onEnd' | 'onChange';
} & React.ComponentPropsWithoutRef<'div'>;

export default function THead<T extends RowData>({
  className,
  omitSort,
  table,
  columnResizeMode = 'onChange',
  ...rest
}: THeadProps<T>) {
  return (
    <thead
      className={clsxm([
        'sticky top-0 z-[1] border-b border-gray-200 bg-gray-50',
        // ' dark:border-gray-800 dark:bg-gray-700',
        className,
      ])}
      {...rest}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className='flex'>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              scope='col'
              className={clsxm([
                'group relative px-6 py-1',
                'bg-[#667080] text-left text-xs font-bold uppercase tracking-wider text-white',
                !omitSort && header.column.getCanSort() ? 'pr-4' : 'pr-[30px]',
              ])}
              style={{ width: header.getSize() }}
            >
              {header.isPlaceholder ? null : (
                <div
                  className={clsxm([
                    'relative flex items-center justify-between gap-2 py-1',
                    !omitSort && header.column.getCanSort()
                      ? 'cursor-pointer select-none'
                      : '',
                    {
                      'justify-start':
                        _.get(
                          header,
                          'column.columnDef.meta.align',
                          '' as 'left'
                        ) === 'left',
                      'justify-center':
                        _.get(
                          header,
                          'column.columnDef.meta.align',
                          '' as 'center'
                        ) === 'center',
                      'justify-end':
                        _.get(
                          header,
                          'column.columnDef.meta.align',
                          '' as 'right'
                        ) === 'right',
                    },
                  ])}
                  onClick={
                    omitSort
                      ? () => null
                      : header.column.getToggleSortingHandler()
                  }
                >
                  <p>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </p>
                  {!omitSort &&
                  header.column.getCanSort() &&
                  !header.column.getIsSorted() ? (
                    <VscTriangleDown
                      className={clsx(
                        'w-3 rotate-180 fill-gray-400 group-hover:fill-gray-700'
                      )}
                    />
                  ) : (
                    {
                      asc: (
                        <VscTriangleDown
                          className={clsxm(
                            'w-3 rotate-180 fill-gray-700'
                            // 'dark:fill-gray-200'
                          )}
                        />
                      ),
                      desc: (
                        <VscTriangleDown
                          className={clsxm(
                            'w-3 fill-gray-700'
                            // 'dark:fill-gray-200'
                          )}
                        />
                      ),
                    }[header.column.getIsSorted() as string] ?? null
                  )}
                </div>
              )}
              <div
                className={clsxm(
                  'absolute right-0 top-0 z-10 ml-2 h-full w-2 cursor-col-resize touch-none select-none bg-black bg-opacity-50',
                  header.column.getIsResizing() &&
                    'border-x-2 border-y-2 border-x-[#667080] border-y-red-100 bg-red-100 opacity-100'
                )}
                {...{
                  onMouseDown: header.getResizeHandler(),
                  onTouchStart: header.getResizeHandler(),
                  style: {
                    transform:
                      columnResizeMode === 'onEnd' &&
                      header.column.getIsResizing()
                        ? `translateX(${
                            table.getState().columnSizingInfo.deltaOffset
                          }px)`
                        : '',
                  },
                }}
              />
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

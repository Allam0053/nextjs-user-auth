import { flexRender, RowData, Table } from '@tanstack/react-table';
import _ from 'lodash';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

type TFootProps<T extends RowData> = {
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function TFoot<T extends RowData>({
  className,
  table,
  ...rest
}: TFootProps<T>) {
  return (
    <thead
      className={clsxm([
        'border-b border-gray-200 dark:border-gray-800',
        'bg-gray-50 dark:bg-gray-700',
        className,
      ])}
      {...rest}
    >
      {table.getFooterGroups().map((footerGroup) => (
        <tr key={footerGroup.id} className='flex'>
          {footerGroup.headers.map((footer) => (
            <td
              key={footer.id}
              scope='col'
              className={clsxm([
                'group px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-200',
                'pl-[30px]',
              ])}
              style={{
                // width: cell.column.getSize(),
                width:
                  footer.column.getSize() !== 0
                    ? footer.column.getSize()
                    : undefined,
                maxWidth:
                  footer.column.getSize() !== 0
                    ? footer.column.getSize()
                    : undefined,
              }}
            >
              {footer.isPlaceholder ? null : (
                <div
                  className={clsxm('relative flex items-center gap-2 py-1', {
                    'justify-start':
                      _.get(footer, 'column.columnDef.meta.align', 'left') ===
                      'left',
                    'justify-center':
                      _.get(
                        footer,
                        'column.columnDef.meta.align',
                        '' as 'center'
                      ) === 'center',
                    'justify-end':
                      _.get(
                        footer,
                        'column.columnDef.meta.align',
                        '' as 'right'
                      ) === 'right',
                  })}
                >
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </div>
              )}
            </td>
          ))}
        </tr>
      ))}
    </thead>
  );
}

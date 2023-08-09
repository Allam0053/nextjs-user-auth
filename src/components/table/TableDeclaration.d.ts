/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { Style } from '@react-pdf/types';
import { RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
  interface ColumnMeta<TData extends RowData, TValue> {
    index?: number;
    sizeScale?: number;
    sizePercent?: number | string;
    style?: Style;
    headerCellStyle?: Style;
    bodyCellStyle?: Style;
    align?: 'left' | 'center' | 'right';
  }
}

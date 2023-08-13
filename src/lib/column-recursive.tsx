import { ColumnDef } from "@tanstack/react-table";
type Options = {
  minSize?: number;
  maxSize?: number;
};

function getTotalSize(column: any): number {
  let totalSize = column.meta?.sizeScale ?? 0;
  if (column.columns) {
    totalSize += column.columns.reduce(
      (prev: number, cur: number) => prev + getTotalSize(cur),
      0
    );
  }
  return totalSize;
}

function getTotalSizeRecursive(columns: any): number {
  return columns.reduce((prev: number, cur: any) => {
    const curSize = getTotalSize(cur) || 0;
    return prev + curSize;
  }, 0);
}

export function generateSizeRecursiveColumn<T>(
  columns: ColumnDef<T>[],
  widthTableContainer: number,
  options?: Options
) {
  const widthTableContainerMinus7 = widthTableContainer - 12;

  // mendapatkan total size dari semua column termasuk child
  const totalSize = getTotalSizeRecursive(columns);

  const generateSizeRecursiveColumnRecursive = (
    columns: ColumnDef<T>[],
    options?: Options
  ) => {
    const calculateSize = (column: any) => {
      const calculatedSize = widthTableContainerMinus7
        ? (getTotalSize(column) * widthTableContainerMinus7) / totalSize
        : 200;
      if (calculatedSize < (options?.minSize ?? 0)) {
        return options?.minSize ?? 0;
      }
      if (calculatedSize > (options?.maxSize ?? 1920)) {
        return options?.maxSize ?? 1920;
      }
      return calculatedSize;
    };

    return columns.map((col: any) => {
      const mappedCol = { ...col, size: calculateSize(col) };
      if (col.columns) {
        mappedCol.columns = generateSizeRecursiveColumnRecursive(
          col.columns,
          options
        );
      }
      return mappedCol;
    });
  };

  return generateSizeRecursiveColumnRecursive(columns, options);
}

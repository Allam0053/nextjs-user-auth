/* eslint-disable @typescript-eslint/no-explicit-any */

import dayjs from 'dayjs';

export function defaultValueForm(entriedData: Record<any, any>) {
  return Object.fromEntries(
    Object.entries(entriedData).reduce(
      (prev: [string, any][], [key, value]) => {
        if (value === undefined) return prev;
        if (value === '') return prev;
        let valueToBeParsed: string | number | boolean = value;
        if (key === 'city_id') {
          valueToBeParsed = parseInt(value);
        }
        if (key === 'active') {
          valueToBeParsed = value === '0' ? false : true;
        }
        if (key === 'commision') {
          valueToBeParsed = parseInt(value);
        }
        prev.push([key, valueToBeParsed]);
        return prev;
      },
      []
    )
  ); // remove empty string
}

export function DateFormatter(inputDate: string) {
  // ({ getValue }) =>
  const outputDate =
    typeof inputDate === 'string'
      ? dayjs(inputDate as string, 'YYYY-MM-DD').format('DD-MM-YYYY')
      : '';
  return outputDate;
}

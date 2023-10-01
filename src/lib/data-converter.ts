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
export function extractDigitsFromString(inputString: string): string {
  const digitRegex = /\d/g;
  const digitsArray = inputString.match(digitRegex);

  if (digitsArray) {
    return digitsArray.join('');
  } else {
    return '';
  }
}

// const inputString = "abc123def456";
// const digits = extractDigitsFromString(inputString);
// console.log(digits); // Output: "123456"

export function isContainsNonDigitCharacters(inputString: string): boolean {
  const pattern = /[^0-9]/;
  return pattern.test(inputString);
}

export function isStringConvertableToNumber(inputString: string) {
  return isContainsNonDigitCharacters(inputString)
    ? false
    : !isNaN(parseInt(inputString));
}

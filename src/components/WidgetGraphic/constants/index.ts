export enum Currency {
  dollar = '$',
  euro = '€',
  yuan = '¥',
}

export const CURRENCY_LABEL = {
  [Currency.dollar]: 'Курс доллара',
  [Currency.euro]: 'Курс евро',
  [Currency.yuan]: 'Курс юаня',
} as const;

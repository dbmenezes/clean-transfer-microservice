
export interface Date {
  now: () => string
  isBefore: (date1,date2) => boolean
}

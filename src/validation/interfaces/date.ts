
export interface Date {
  now: () => string
  isBefore: (targetDate) => boolean
  isValidDate: (targetDate) => boolean
}


export interface Logger {
  info: (message) => void
  error: (message) => void
  warning: (message) => void
  debug: (message) => void
}

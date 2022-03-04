import { Logger } from '@/application/interfaces/logger'
import { createLogger } from 'winston'
export class Winston implements Logger {
  private readonly logger: any
  constructor () {
    this.logger = createLogger()
  }

  info (message): void {
    this.logger({
      level: 'info',
      message
    })
  }

  error (message): void {
    this.logger({
      level: 'error',
      message
    })
  }

  warning (message: any): void {
    this.logger({
      level: 'warning',
      message
    })
  }

  debug (message: any): void {
    this.logger({
      level: 'debug',
      message
    })
  }
}

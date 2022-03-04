import { Validation } from '@/presentation/interfaces'
import { ServerError } from '@/presentation/errors'
import { Date } from './interfaces/date'

export class DueDateValidation implements Validation {
  constructor (
    private readonly date: string,
    private readonly dateHelper: Date
  ) {}

  validate (input: any): Error {
    if (this.dateHelper.isBefore(this.date,new Date())) return new ServerError('Due Date Is outdated')
  }
}

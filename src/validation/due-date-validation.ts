import { Validation } from '@/presentation/interfaces'
import { ServerError } from '@/presentation/errors'
import { Date } from './interfaces/date'

export class DueDateValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly dateHelper: Date
  ) {}

  validate (input: any): Error {
    if (this.dateHelper.isBefore(input[this.fieldName],new Date())) return new ServerError('Due Date Is outdated')
  }
}

import { Validation } from '@/presentation/interfaces'
import { InvalidParamError } from '@/presentation/errors'
import { Date } from './interfaces/date'

export class DueDateValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly dateHelper: Date
  ) {}

  validate (input: any): Error {
    if (!this.dateHelper.isValidDate(input[this.fieldName])) return new InvalidParamError('Invalid date', ' Date should be in format dd/MM/yyyy HH:mm')
    if (this.dateHelper.isBefore(input[this.fieldName])) return new InvalidParamError('Due Date', 'is outdated')
  }
}

import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'
import { Validator } from './interfaces/validator'
import { ValidationTypes } from './models/validation-types'

export class ValidFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly validator: Validator,
    private readonly validationType: ValidationTypes) {}

  validate (input: any): Error {
    if (input[this.fieldName] && this.validator.validate(input[this.fieldName],this.validationType).error) {
      return new InvalidParamError(this.fieldName,` Param should be type ${this.validationType}`)
    }
  }
}

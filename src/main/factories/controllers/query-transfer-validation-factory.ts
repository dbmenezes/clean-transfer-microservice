import { ValidationComposite, RequiredFieldValidation } from '@/validation'
import { Validation } from '@/presentation/interfaces'

export const makeQueryTransferValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['internalId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}

import { ValidationComposite, RequiredFieldValidation, DueDateValidation } from '@/validation'
import { Validation } from '@/presentation/interfaces'
import { DateHelper } from '@/infra/utils/datefns'

export const makeAddTransferValidation = (): ValidationComposite => {
  const dateHelper = new DateHelper()
  const validations: Validation[] = []
  for (const field of ['originAccountId', 'destinationAccountId','amount']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new DueDateValidation('dueDate',dateHelper))
  return new ValidationComposite(validations)
}

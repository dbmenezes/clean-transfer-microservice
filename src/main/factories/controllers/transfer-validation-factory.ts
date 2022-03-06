import { ValidationComposite, RequiredFieldValidation, DueDateValidation, ValidFieldValidation } from '@/validation'
import { Validation } from '@/presentation/interfaces'
import { DateHelper } from '@/infra/utils/datefns'
import { JoiAdapter } from '@/infra/utils/joi-adapter'
import { ValidationTypes } from '@/validation/models/validation-types'

export const makeAddTransferValidation = (): ValidationComposite => {
  const dateHelper = new DateHelper()
  const validator = new JoiAdapter()
  const validations: Validation[] = []
  validations.push(new ValidFieldValidation('originAccountId',validator,ValidationTypes.STRING))
  validations.push(new ValidFieldValidation('destinationAccountId',validator,ValidationTypes.STRING))
  validations.push(new ValidFieldValidation('amount',validator,ValidationTypes.NUMBER2DECIMAL))
  for (const field of ['originAccountId', 'destinationAccountId','amount']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new DueDateValidation('dueDate',dateHelper))
  return new ValidationComposite(validations)
}

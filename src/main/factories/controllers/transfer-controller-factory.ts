import { CreateTransferController } from '@/presentation/controllers'
import { makeCreateFactory } from '../usecases/create-transfer-factory'
import { makeAddTransferValidation } from './transfer-validation-factory'

export const makeTransferController = (): CreateTransferController => {
  const validation = makeAddTransferValidation()
  const createTransfer = makeCreateFactory()

  return new CreateTransferController(validation,createTransfer)
}

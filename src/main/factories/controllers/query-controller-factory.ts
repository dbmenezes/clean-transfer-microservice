
import { QueryTransferController } from '@/presentation/controllers/query-transfer-controller'
import { makeQueryTransfer } from '../usecases/query-transfer-factory'
import { makeQueryTransferValidation } from './query-transfer-validation-factory'

export const makeQueryTransferController = (): QueryTransferController => {
  const validation = makeQueryTransferValidation()
  const queryTransfer = makeQueryTransfer()

  return new QueryTransferController(validation,queryTransfer)
}

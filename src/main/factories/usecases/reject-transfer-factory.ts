import { RejectTransferImplementation } from '@/application/reject-transfer-implementation'
import { RejectTransfer } from '@/domain/usecases/reject-transfer'
import { TransferMongoRepository } from '@/infra/db/mongodb/transfer-mongo-repository'

export const makeRejectTransfer = (): RejectTransfer => {
  const repository = new TransferMongoRepository()
  return new RejectTransferImplementation(repository)
}

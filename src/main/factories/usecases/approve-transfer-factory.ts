import { ApproveTransferImplementation } from '@/application/approve-transfer-implementation'
import { ApproveTransfer } from '@/domain/usecases/approve-transfer'
import { TransferMongoRepository } from '@/infra/db/mongodb/transfer-mongo-repository'

export const makeApproveTransfer = (): ApproveTransfer => {
  const repository = new TransferMongoRepository()

  return new ApproveTransferImplementation(repository)
}

import { QueryTransferImplementation } from '@/application/query-transfer-implementation'
import { TransferMongoRepository } from '@/infra/db/mongodb/transfer-mongo-repository'

export const makeQueryTransfer = (): QueryTransferImplementation => {
  const repository = new TransferMongoRepository()
  return new QueryTransferImplementation(repository)
}

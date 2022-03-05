import { ScheduleTransferImplementation } from '@/application/schedule-transfer-implementation'
import { ScheduleTransfer } from '@/domain/usecases/schedule-transfer'
import { TransferMongoRepository } from '@/infra/db/mongodb/transfer-mongo-repository'

export const makeScheduleTransfer = (): ScheduleTransfer => {
  const repository = new TransferMongoRepository()

  return new ScheduleTransferImplementation(repository)
}

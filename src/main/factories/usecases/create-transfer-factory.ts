import { CreateTransferImplementation } from '@/application/create-transfer-implementation'
import { CreateTransfer } from '@/domain/usecases/create-transfer'
import { TransferMongoRepository } from '@/infra/db/mongodb/transfer-mongo-repository'
import { KafkaBroker } from '@/infra/kafka'
import { DateHelper } from '@/infra/utils/dayjs'

export const makeCreateFactory = (): CreateTransfer => {
  const broker = new KafkaBroker()
  const repository = new TransferMongoRepository()
  const date = new DateHelper()

  return new CreateTransferImplementation(repository,broker,date)
}

import { CreateTransferImplementation } from '@/application/create-transfer-implementation'
import { CreateTransfer } from '@/domain/usecases/create-transfer'
import { TransferMongoRepository } from '@/infra/db/mongodb/transfer-mongo-repository'
import { KafkaAdapter } from '@/infra/kafka/kafka-adapter'
import { DateHelper } from '@/infra/utils/datefns'

export const makeCreateFactory = (): CreateTransfer => {
  const broker = new KafkaAdapter()
  const repository = new TransferMongoRepository()
  const date = new DateHelper()

  return new CreateTransferImplementation(repository,broker,date)
}

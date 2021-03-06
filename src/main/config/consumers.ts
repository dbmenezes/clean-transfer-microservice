import { KafkaIntegration } from '@/infra/kafka'
import { DateHelper } from '@/infra/utils/datefns'
import { MockConsumer } from '@/presentation/consumers/mock-consumer'
import { makeUpdateTransferConsumer } from '../factories/consumers/update-transfer-consumer-factory'

export default async (): Promise<void> => {
  const createdConsumer = makeUpdateTransferConsumer()
  await createdConsumer.registerConsumer()
  await new MockConsumer().registerConsumer(KafkaIntegration,new DateHelper())
}

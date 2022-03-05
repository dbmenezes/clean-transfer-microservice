import { BrokerTopics } from '@/domain/topics/broker-topics'
import { KafkaIntegration } from '@/infra/kafka'

export class MockConsumer {
  async registerConsumer (): Promise<void> {
    const consumer = await KafkaIntegration.createConsumer(
      {
        topic: BrokerTopics.LIQUIDATE_CREATED,
        groupId: 'liquidated-CRETEAD-group-id'
      }
    )

    await consumer.run({
      eachMessage: async (callback: any): Promise<void> => {
        const { message } = callback
        console.log('SENDING ',message)

        await KafkaIntegration.send({
          topic: BrokerTopics.LIQUIDATE_UPDATED,
          message: 'Mock updated'
        })
      }
    })
  }
}

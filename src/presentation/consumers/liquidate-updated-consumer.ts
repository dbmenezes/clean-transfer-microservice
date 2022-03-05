import { BrokerTopics } from '@/domain/topics/broker-topics'
import { ApproveTransfer } from '@/domain/usecases/approve-transfer'
import { KafkaIntegration } from '@/infra/kafka'

export class LiquidateUpdatedConsumer {
  constructor (
    private readonly approveTransfer: ApproveTransfer
  ) {}

  async registerConsumer (): Promise<void> {
    const consumer = await KafkaIntegration.createConsumer(
      {
        topic: BrokerTopics.LIQUIDATE_UPDATED,
        groupId: 'updated-group-id'
      }
    )

    await consumer.run({
      eachMessage: async (callback: any): Promise<void> => {
        const { message } = callback

        try {
          const updatedMessage = JSON.parse(message.value.toString())
          console.log('RECIEVED UPDATED MESSAGE',updatedMessage)
          await this.approveTransfer.approve(updatedMessage)
        } catch (error) {
          console.log('ERRO CONSUMER',error)
        }
      }
    })
  }
}

import { TransferStatus } from '@/domain/models/transfer-status'
import { BrokerTopics } from '@/domain/topics/broker-topics'
import { Date } from '@/validation/interfaces/date'
import { v4 as uuidv4 } from 'uuid'
export class MockConsumer {
  async registerConsumer (broker: any,date: Date): Promise<void> {
    const consumer = await broker.createConsumer(
      {
        topic: BrokerTopics.LIQUIDATE_CREATED,
        groupId: 'liquidated-CRETEAD-group-id'
      }
    )

    await consumer.run({
      eachMessage: async (callback: any): Promise<void> => {
        const { message } = callback
        const parsedMessage = JSON.parse(message.value.toString())
        const now = date.now()
        let status = null
        if (date.isBefore(now,parsedMessage.dueDate)) {
          status = TransferStatus.SCHEDULED
        } else {
          const statusArray = [TransferStatus.APPROVED,TransferStatus.REJECTED]
          const randomIdx = Math.floor(Math.random() * statusArray.length)
          status = statusArray[randomIdx]
        }
        const payload = {
          externalId: uuidv4(),
          internalId: parsedMessage.id,
          status
        }

        await broker.send({
          topic: BrokerTopics.LIQUIDATE_UPDATED,
          message: JSON.stringify(payload)
        })
      }
    })
  }
}

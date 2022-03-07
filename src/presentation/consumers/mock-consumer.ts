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
        let status = null
        let expectedOn = null
        if (date.isBefore(parsedMessage.dueDate)) {
          status = TransferStatus.SCHEDULED
          expectedOn = parsedMessage.dueDate
        } else {
          const statusArray = [TransferStatus.APPROVED,TransferStatus.REJECTED]
          const randomIdx = Math.floor(Math.random() * statusArray.length)
          console.log('RANDOMIDX',randomIdx)
          status = statusArray[randomIdx]
          expectedOn = date.now()
        }
        const payload = {
          externalId: uuidv4(),
          internalId: parsedMessage.id,
          status,
          expectedOn
        }

        await broker.send({
          topic: BrokerTopics.LIQUIDATE_UPDATED,
          message: JSON.stringify(payload)
        })
      }
    })
  }
}

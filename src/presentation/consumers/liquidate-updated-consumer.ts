import { TransferStatus } from '@/domain/models/transfer-status'
import { BrokerTopics } from '@/domain/topics/broker-topics'
import { ApproveTransfer } from '@/domain/usecases/approve-transfer'
import { RejectTransfer } from '@/domain/usecases/reject-transfer'
import { ScheduleTransfer } from '@/domain/usecases/schedule-transfer'

export class LiquidateUpdatedConsumer {
  constructor (
    private readonly approveTransfer: ApproveTransfer,
    private readonly rejectTransfer: RejectTransfer,
    private readonly scheduleTransfer: ScheduleTransfer,
    private readonly broker: any
  ) {}

  async registerConsumer (): Promise<void> {
    const consumer = await this.broker.createConsumer(
      {
        topic: BrokerTopics.LIQUIDATE_UPDATED,
        groupId: 'updated-group-id'
      }
    )

    await consumer.run({
      eachMessage: async (callback: any): Promise<void> => {
        const { message } = callback

        try {
          const updatedMessage = JSON.parse(JSON.parse(message.value.toString()))
          switch (updatedMessage.status) {
            case (TransferStatus.APPROVED):
              await this.approveTransfer.approve(updatedMessage)
              break
            case (TransferStatus.REJECTED):
              await this.rejectTransfer.reject(updatedMessage)
              break
            case (TransferStatus.SCHEDULED):
              await this.scheduleTransfer.schedule(updatedMessage)
              break
            default:
              console.log('STATUS NOT FOUND')
          }
        } catch (error) {
          console.log('ERRO CONSUMER',error)
        }
      }
    })
  }
}

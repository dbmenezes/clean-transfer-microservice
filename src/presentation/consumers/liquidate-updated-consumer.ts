import { TransferStatus } from '@/domain/models/transfer-status'
import { ApproveTransfer } from '@/domain/usecases/approve-transfer'

export class LiquidateUpdatedConsumer {
  constructor (
    private readonly approveTransfer: ApproveTransfer
  ) {}

  async handle (message: any): Promise<void> {
    switch (message.status) {
      case (TransferStatus.APPROVED): {
        await this.approveTransfer.approve(message)
      }
    }
  }
}

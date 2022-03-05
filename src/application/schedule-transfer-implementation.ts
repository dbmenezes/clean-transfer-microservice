import { ScheduleTransfer } from '@/domain/usecases/schedule-transfer'
import { TransferRepository } from './interfaces/transfer-repository'

export class ScheduleTransferImplementation implements ScheduleTransfer {
  constructor (
    private readonly repository: TransferRepository
  ) {}

  async schedule (createTransfer: any): Promise<string> {
    const { externalId,internalId,status } = createTransfer
    const result = await this.repository.update({ internalId: internalId },{ status: status, externalId: externalId })
    return result
  }
}

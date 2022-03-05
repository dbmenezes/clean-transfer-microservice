import { ApproveTransfer } from '@/domain/usecases/approve-transfer'
import { TransferRepository } from './interfaces/transfer-repository'

export class ApproveTransferImplementation implements ApproveTransfer {
  constructor (
    private readonly repository: TransferRepository
  ) {}

  async approve (createTransfer: any): Promise<string> {
    const { externalId,internalId,status } = JSON.parse(createTransfer)
    const result = await this.repository.update({ internalId: internalId },{ status: status, externalId: externalId })
    return result
  }
}

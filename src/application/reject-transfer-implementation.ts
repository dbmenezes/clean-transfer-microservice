import { RejectTransfer } from '@/domain/usecases/reject-transfer'
import { TransferRepository } from './interfaces/transfer-repository'

export class RejectTransferImplementation implements RejectTransfer {
  constructor (
    private readonly repository: TransferRepository
  ) {}

  async reject (createTransfer: any): Promise<string> {
    const { externalId,internalId,status } = JSON.parse(createTransfer)
    const result = await this.repository.update({ internalId: internalId },{ status: status, externalId: externalId })
    return result
  }
}

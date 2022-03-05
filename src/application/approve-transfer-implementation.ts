import { UpdateTransferModel } from '@/domain/models/update-transfer-model'
import { ApproveTransfer } from '@/domain/usecases/approve-transfer'
import { TransferRepository } from './interfaces/transfer-repository'

export class ApproveTransferImplementation implements ApproveTransfer {
  constructor (
    private readonly repository: TransferRepository
  ) {}

  async approve (createTransfer: UpdateTransferModel): Promise<string> {
    const result = await this.repository.update(createTransfer.internalId,{ status: createTransfer.status,externalId: createTransfer.externalId })
    return result
  }
}

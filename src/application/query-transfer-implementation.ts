import { Transfer } from '@/domain/models/transfer'
import { QueryTransfer } from '@/domain/usecases/query-transfer'
import { TransferRepository } from './interfaces/transfer-repository'

export class QueryTransferImplementation implements QueryTransfer {
  constructor (
    private readonly repository: TransferRepository
  ) {}

  async query (id: string): Promise<Transfer> {
    return await this.repository.findByInternalId(id)
  }
}

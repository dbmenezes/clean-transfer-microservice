import { Transfer } from '@/domain/models/transfer'

export interface TransferRepository{
  add: (createTranfer: Transfer) => Promise<string>
  update: (filter,query) => Promise<string>
  find: () => Promise<any>
  findByInternalId: (internalId: string) => Promise<Transfer>
}

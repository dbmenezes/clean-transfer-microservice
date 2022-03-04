import { Transfer } from '@/domain/models/transfer'

export interface TransferRepository{
  add: (createTranfer: Transfer) => Promise<string>
  find: () => Promise<any>
}

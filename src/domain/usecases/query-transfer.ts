import { Transfer } from '../models/transfer'

export interface QueryTransfer{
  query: (id: string) => Promise<Transfer>
}

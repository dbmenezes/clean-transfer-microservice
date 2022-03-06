import { TransferStatus } from './transfer-status'

export type Transfer = {
  originAccountId: string
  destinationAccountId: string
  dueDate?: string
  amount: number
  status: TransferStatus
  externalId?: string
  internalId?: string
}

import { TransferStatus } from './transfer-status'

export type Transfer = {
  originAccountId: string
  destinationAccountId: string
  dueDate?: string
  amount: string
  status: TransferStatus
  externalId?: string
  internalId?: string
}

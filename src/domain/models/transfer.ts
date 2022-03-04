import { TransferStatus } from './transfer-status'

export type Transfer = {
  originAccountId: string
  destinationAccountId: string
  dueDate?: Date
  amount: string
  status: TransferStatus
}

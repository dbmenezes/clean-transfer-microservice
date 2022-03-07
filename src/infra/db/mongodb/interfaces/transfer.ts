import { TransferStatus } from '@/domain/models/transfer-status'
import { Document } from 'mongoose'

export default interface ITransfer extends Document {
  originAccountId: string
  destinationAccountId: string
  dueDate?: Date
  amount: string
  status: TransferStatus
  expectedDate: string
}

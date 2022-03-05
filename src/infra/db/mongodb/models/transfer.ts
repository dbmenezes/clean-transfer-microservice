import mongoose, { Schema } from 'mongoose'

import ITransfer from '../interfaces/transfer'

const TransferSchema: Schema = new Schema(
  {
    originAccountId: { type: String, required: true },
    destinationAccountId: { type: String, required: true },
    dueDate: { type: String, required: true } ,
    correlationId: { type: String, required: true },
    status: { type: String, required: true },
    liquidationId: { type: String, required: false }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<ITransfer>('Transfer', TransferSchema)

import { TransferRepository } from '@/application/interfaces/transfer-repository'
import { CreateTransferModel } from '@/domain/models/create-transfer-model'
import { TransferStatus } from '@/domain/models/transfer-status'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import Transfer from './models/transfer'

export class TransferMongoRepository implements TransferRepository {
  async add (createTranfer: CreateTransferModel): Promise<string> {
    const { originAccountId,destinationAccountId, dueDate } = createTranfer
    const internalId = uuidv4()

    const transfer = new Transfer({
      _id: new mongoose.Types.ObjectId(),
      originAccountId,
      destinationAccountId,
      dueDate,
      internalId,
      status: TransferStatus.CREATED
    })

    await transfer.save()

    return internalId
  }

  async find (): Promise<any> {
    return await Transfer.find()
  }

  async update (internalId,data): Promise<string> {
    await Transfer.updateOne({ internalId },data)

    return 'Transfer updated'
  }
}

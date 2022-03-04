import { CreateTransferModel } from '../models/create-transfer-model'

export interface CreateTransfer {
  create: (object: CreateTransferModel) => Promise<string>
}

import { UpdateTransferModel } from '../models/update-transfer-model'

export interface RejectTransfer {
  reject: (transfer: UpdateTransferModel) => Promise<string>
}

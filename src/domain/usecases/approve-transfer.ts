import { UpdateTransferModel } from '../models/update-transfer-model'

export interface ApproveTransfer {
  approve: (transfer: UpdateTransferModel) => Promise<string>
}

import { UpdateTransferModel } from '../models/update-transfer-model'

export interface ScheduleTransfer {
  schedule: (transfer: UpdateTransferModel) => Promise<string>
}

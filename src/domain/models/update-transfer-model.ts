import { TransferStatus } from './transfer-status'

export type UpdateTransferModel = {
  internalId: string
  externalId: string
  status: TransferStatus
}

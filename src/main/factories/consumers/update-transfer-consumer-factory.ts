import { LiquidateUpdatedConsumer } from '@/presentation/consumers/liquidate-updated-consumer'
import { makeApproveTransfer } from '../usecases/approve-transfer-factory'

export const makeUpdateTransferConsumer = (): LiquidateUpdatedConsumer => {
  const approveTransfer = makeApproveTransfer()

  return new LiquidateUpdatedConsumer(approveTransfer)
}

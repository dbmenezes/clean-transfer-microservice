import { KafkaIntegration } from '@/infra/kafka'
import { LiquidateUpdatedConsumer } from '@/presentation/consumers/liquidate-updated-consumer'
import { makeApproveTransfer } from '../usecases/approve-transfer-factory'
import { makeRejectTransfer } from '../usecases/reject-transfer-factory'
import { makeScheduleTransfer } from '../usecases/schedule-transfer-factory'

export const makeUpdateTransferConsumer = (): LiquidateUpdatedConsumer => {
  const approveTransfer = makeApproveTransfer()
  const rejectTransfer = makeRejectTransfer()
  const scheduleTransfer = makeScheduleTransfer()

  return new LiquidateUpdatedConsumer(approveTransfer,rejectTransfer,scheduleTransfer,KafkaIntegration)
}

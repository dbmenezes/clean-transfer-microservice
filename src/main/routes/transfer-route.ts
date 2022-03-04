import { adaptRoute } from '@/main/adapters'
import { Router } from 'express'
import { makeTransferController } from '../factories/controllers/transfer-controller-factory'

export default (router: Router): void => {
  router.post('/transfer', adaptRoute(makeTransferController()))
}

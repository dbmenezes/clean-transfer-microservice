import { adaptRoute } from '@/main/adapters'
import { Router } from 'express'
import { makeQueryTransferController } from '../factories/controllers/query-controller-factory'
import { makeTransferController } from '../factories/controllers/transfer-controller-factory'

export default (router: Router): void => {
  router.post('/transfer', adaptRoute(makeTransferController()))
  router.get('/transfer/:internalId',adaptRoute(makeQueryTransferController()))
}

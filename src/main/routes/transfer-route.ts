import { adaptRoute } from '@/main/adapters'
import { makeSignUpController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/transfer', adaptRoute(makeSignUpController()))
}

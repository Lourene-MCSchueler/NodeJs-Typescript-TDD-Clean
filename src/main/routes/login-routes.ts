/* eslint-disable @typescript-eslint/no-misused-promises */
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeLoginController } from '@/main/factories/controllers/login/login/login-controller-factory'
import { makeSignupController } from '@/main/factories/controllers/login/signup/signup-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
}

import { makeSignupValidation } from './signup-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { SignUpController } from '@/presentation/controllers/login-signup/signup/signup-controller'
import { Controller } from '@/presentation/protocols'

export const makeSignupController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignupValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}

import { DbAddAccount } from "../../data/use-cases/add-account/db-add-account";
import { BCryptAdapter } from "../../infra/criptography/bcrypt-adapter";
import { AccountMongoRepository } from "../../infra/database/mongodb/account-repository/account";
import { SignUpController } from "../../presentation/controllers/sign-up/sign-up";
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter";

export const makeSignUp = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BCryptAdapter()
  const addAccountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(encrypter, addAccountRepository)

  return new SignUpController(emailValidator, dbAddAccount)
}
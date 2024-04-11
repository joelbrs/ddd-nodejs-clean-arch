import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  Encrypter,
  AddAccountRepository,
} from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly dbAccountRepository: AddAccountRepository
  ) {}

  async add({ password, ...model }: AddAccountModel): Promise<AccountModel> {
    const account = {
      ...model,
      password: await this.encrypter.encrypt(password),
    };

    return await this.dbAccountRepository.add(account);
  }
}

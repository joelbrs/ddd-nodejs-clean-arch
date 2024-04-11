import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  Encrypter,
} from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async add({ password }: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(password);
    return Promise.resolve({} as AccountModel);
  }
}

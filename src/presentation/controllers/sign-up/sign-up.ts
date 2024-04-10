import { MissingParamError, InvalidParamError} from "../../errors";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  AddAccount
} from './sign-up-protocols';

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator, private readonly addAccount: AddAccount) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "password_confirmation",
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { email, password, password_confirmation, name } = httpRequest.body;

      if (password !== password_confirmation) {
        return badRequest(new InvalidParamError("password_confirmation"));
      }

      const isValid = this.emailValidator.isValid(email);

      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }
      const account = await this.addAccount.add({email,password,name})
      return ok(account)
    } catch {
      return serverError();
    }
  }
}

import { AddAccount } from "../../domain/use-cases/add-account";
import { MissingParamError, InvalidParamError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helper";
import {
  HttpRequest,
  HttpResponse,
  EmailValidator,
  Controller,
} from "../protocols";

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator, private readonly addAccount: AddAccount) {}

  handle(httpRequest: HttpRequest): HttpResponse {
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
      const account = this.addAccount.add({email,password,name})
      return {body: account, statusCode: 201 }
    } catch {
      return serverError();
    }
  }
}

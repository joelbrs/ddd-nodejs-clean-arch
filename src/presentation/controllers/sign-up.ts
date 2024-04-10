import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError("Name"));
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError("Email"));
    }
    return { body: {}, statusCode: 200 };
  }
}

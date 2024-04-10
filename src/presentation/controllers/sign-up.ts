import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse | void {
    if (!httpRequest.body.name) {
      return { statusCode: 400, body: new Error("Name is required.") };
    }

    if (!httpRequest.body.email) {
      return { statusCode: 400, body: new Error("Email is required.") };
    }
  }
}

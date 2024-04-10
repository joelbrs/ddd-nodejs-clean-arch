export class MissingParamError extends Error {
  constructor(param: string) {
    super(`Missing params: ${param}`);
    this.name = "MissingParamError";
  }
}

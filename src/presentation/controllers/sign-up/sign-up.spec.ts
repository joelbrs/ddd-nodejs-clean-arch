import { AddAccount, AddAccountModel, AccountModel, EmailValidator } from "./sign-up-protocols";
import { InvalidParamError, MissingParamError, ServerError } from "../../errors";
import { SignUpController } from "./sign-up";

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(_: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add (_: AddAccountModel): AccountModel {
      const account = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }

      return account
    }
  }

  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount()

  const sut = new SignUpController(emailValidatorStub, addAccountStub);
  return { sut, emailValidatorStub, addAccountStub };
};

describe("SignUp Controller", () => {
  it("should return 400 if no name is provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: "any_email@mail.com",
        password: "any_password",
        password_confirmation: "any_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  it("should return 400 if no email is provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        password_confirmation: "any_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  it("should return 400 if no password is provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password_confirmation: "any_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  it("should return 400 if no password_confirmation is provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("password_confirmation")
    );
  });

  it("should return 400 if an invalid email is provided", () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        name: "any_name",
        email: "invalid_email@mail.com",
        password: "any_password",
        password_confirmation: "any_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  it("should return 400 if password confirmation fails", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        email: "invalid_email@mail.com",
        password: "any_password",
        password_confirmation: "invalid_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError("password_confirmation")
    );
  });

  it("should call EmailValidator with correct email", () => {
    const { sut, emailValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        password_confirmation: "any_password",
      },
    };

    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com");
  });

  it("should return 500 if EmailValidator throws", () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        password_confirmation: "any_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it('should call AddAccount with correct values', () => {
    const {sut, addAccountStub} = makeSut()

    const addSpy = jest.spyOn(addAccountStub, 'add')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        password_confirmation: 'any_password'
      }
    }

    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    })
  })

  it("should return 500 if AddAccount throws", () => {
    const { sut, addAccountStub } = makeSut();

    jest.spyOn(addAccountStub, "add").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        password_confirmation: "any_password",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it('should returns 200 if valid data is provided', () => {
    const {sut} = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        password_confirmation: 'any_password'
      }
    }

    const {body, statusCode} = sut.handle(httpRequest)
    expect(statusCode).toBe(200)
    expect(body).toEqual({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
      id: 'valid_id'
    })
  })
});
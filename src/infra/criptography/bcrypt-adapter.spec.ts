import bcrypt from "bcrypt";
import { BCryptAdapter } from "./bcrypt-adapter";

const makeSut = () => {
  const BCRYPT_SALT = 12;
  const sut = new BCryptAdapter(BCRYPT_SALT);

  return { sut };
};

describe("BCrypt Adapter", () => {
  it("should call bcrypt with correct value", async () => {
    const { sut } = makeSut();

    const hashSpy = jest.spyOn(bcrypt, "hash");

    await sut.encrypt("any_value");
    expect(hashSpy).toHaveBeenCalledWith("any_value", 12);
  });
});

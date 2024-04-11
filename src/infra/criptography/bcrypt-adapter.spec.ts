import bcrypt from "bcrypt";
import { BCryptAdapter } from "./bcrypt-adapter";

const BCRYPT_SALT = 12;

const makeSut = () => {
  const sut = new BCryptAdapter(BCRYPT_SALT);

  return { sut };
};

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return Promise.resolve("hashed_value");
  },
}));

describe("BCrypt Adapter", () => {
  it("should call bcrypt with correct value", async () => {
    const { sut } = makeSut();

    const hashSpy = jest.spyOn(bcrypt, "hash");

    await sut.encrypt("any_value");
    expect(hashSpy).toHaveBeenCalledWith("any_value", BCRYPT_SALT);
  });

  it("should return a hash on success", async () => {
    const { sut } = makeSut();

    const hash = await sut.encrypt("any_value");
    expect(hash).toBe("hashed_value");
  });
});

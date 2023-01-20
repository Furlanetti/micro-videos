import InvalidUuidError from "../errors/invalid-uuid.error";
import { validate } from "uuid";
import UniqueEntityId from "./unique-entity-id.vo";

describe("UniqueEntityId Unit test", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

    expect(() => new UniqueEntityId("fake-id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "600e02f9-684a-42e1-8985-07e847276813";
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    const vo = new UniqueEntityId(uuid);

    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "600e02f9-684a-42e1-8985-07e847276813";
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    const vo = new UniqueEntityId(uuid);

    expect(validate(vo.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});

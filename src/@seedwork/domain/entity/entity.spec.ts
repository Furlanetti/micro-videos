import UniqueEntityId from "@seedwork/domain/value-objects/unique-entity-id.vo";
import Entity from "./entity";
import { validate as uuidValidate } from "uuid";

class Stub extends Entity<{ prop1: string; prop2: number }> {}

describe("Entity Unit test", () => {
  it("should set props and id", () => {
    const arrange = { prop1: "value", prop2: 2 };
    const entity = new Stub(arrange);
    expect(entity.props).toStrictEqual(arrange);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).not.toBeNull();
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it("should accept a valid uuid", () => {
    const arrange = { prop1: "value", prop2: 2 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new Stub(arrange, uniqueEntityId);

    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(uniqueEntityId.value);
  });

  it("should convert a entity tot a Javascript object", () => {
    const arrange = { prop1: "value", prop2: 2 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new Stub(arrange, uniqueEntityId);

    expect(entity.toJSON()).toStrictEqual({ id: entity.id, ...arrange });
  });
});

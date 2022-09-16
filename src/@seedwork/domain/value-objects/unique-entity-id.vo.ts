import InvalidUuidError from "@seedwork/errors/invalid-uuid.error";
import { v4 as uuid, validate as uuidValidate } from "uuid";
import ValueObject from "./value-object";

export default class UniqueEntityId extends ValueObject<string> {
  constructor(public readonly id?: string) {
    super(id || uuid());
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.value);

    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}

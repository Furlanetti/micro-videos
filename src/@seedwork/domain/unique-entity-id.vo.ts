import InvalidUuidError from "../errors/invalid-uuid.error";
import { v4 as uuid, validate as uuidValidate } from "uuid";

export default class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id || uuid();
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this.id);

    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}

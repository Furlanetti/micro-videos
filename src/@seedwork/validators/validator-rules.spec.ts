import ValidationError from "@seedwork/errors/validation-error";
import ValidatorRules from "./validator-rules";

describe("ValidatorRules", () => {
  it("values method", () => {
    const validator = ValidatorRules.values("some value", "field");

    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field");
  });

  it("required validation rules", () => {
    const arrange = [
      { value: null, property: "field", messageError: "The field is required" },
      {
        value: undefined,
        property: "field",
        messageError: "The field is required",
      },
      { value: "", property: "field", messageError: "The field is required" },
    ];

    arrange.forEach((item) => {
      expect(() =>
        ValidatorRules.values(item.value, item.property).required()
      ).toThrow(new ValidationError(item.messageError));
    });

    const validArrange = [
      {
        value: "test",
        property: "field",
        messageError: "The field is required",
      },
      {
        value: 5,
        property: "field",
        messageError: "The field is required",
      },
      {
        value: false,
        property: "field",
        messageError: "The field is required",
      },
    ];

    validArrange.forEach((item) => {
      expect(() =>
        ValidatorRules.values(item.value, item.property).required()
      ).not.toThrow();
    });
  });
});

import ValidationError from "@seedwork/errors/validation-error";
import ValidatorRules from "./validator-rules";

type Values = {
  value: any;
  property: any;
};

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: any;
  params?: any[];
};

function assertIsInvalid({
  value,
  property,
  rule,
  error,
  params = [],
}: ExpectedRule) {
  expect(() => {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule];
    method.apply(validator, params);
  }).toThrow(error);
}

function assertIsValid({
  value,
  property,
  rule,
  error,
  params = [],
}: ExpectedRule) {
  expect(() => {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule];
    method.apply(validator, params);
  }).not.toThrow(error);
}

describe("ValidatorRules", () => {
  it("values method", () => {
    const validator = ValidatorRules.values("some value", "field");

    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field");
  });

  it("required validation rules", () => {
    const arrange: Values[] = [
      { value: null, property: "field" },
      {
        value: undefined,
        property: "field",
      },
      { value: "", property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "required",
        error: new ValidationError("The field is required"),
      });
    });

    const validArrange: Values[] = [
      {
        value: "test",
        property: "field",
      },
      {
        value: 5,
        property: "field",
      },
      {
        value: false,
        property: "field",
      },
    ];

    validArrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "required",
        error: new ValidationError("The field is required"),
      });
    });
  });

  it("string validation rules", () => {
    const arrange: Values[] = [
      { value: 5, property: "field" },
      {
        value: {},
        property: "field",
      },
      { value: false, property: "field" },
    ];

    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "string",
        error: new ValidationError("The field must be a string"),
      });
    });

    const validArrange: Values[] = [
      {
        value: "test",
        property: "field",
      },
    ];

    validArrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "string",
        error: new ValidationError("The field must be a string"),
      });
    });
  });

  it("maxLength validation rules", () => {
    const arrange: Values[] = [{ value: "123456", property: "field" }];

    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error: new ValidationError("The field must be less or equal than 5"),
        params: [5],
      });
    });

    const validArrange: Values[] = [
      {
        value: "12345",
        property: "field",
      },
    ];

    validArrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "string",
        error: new ValidationError("The field must be less or equal than 5"),
        params: [5],
      });
    });
  });
});

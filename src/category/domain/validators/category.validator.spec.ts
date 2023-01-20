import CategoryValidatorFactory, {
  CategoryRules,
  CategoryValidator,
} from "./category.validator";

describe("CategoryValidator tests", () => {
  let validator: CategoryValidator;

  beforeEach(() => (validator = CategoryValidatorFactory.create()));

  test("invalidation cases for name field", () => {
    let isValid = validator.validate(null);

    expect(isValid).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name should not be empty",
      "name must be a string",
      "name must be shorter than or equal to 255 characters",
    ]);

    isValid = validator.validate({ name: "" });

    expect(isValid).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name should not be empty",
    ]);

    isValid = validator.validate({ name: 5 as any });

    expect(isValid).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name must be a string",
      "name must be shorter than or equal to 255 characters",
    ]);

    isValid = validator.validate({ name: "t".repeat(256) });

    expect(isValid).toBeFalsy();
    expect(validator.errors["name"]).toStrictEqual([
      "name must be shorter than or equal to 255 characters",
    ]);
  });

  test("valid cases for fields", () => {
    let obj: any = { name: "some value" };
    let isValid = validator.validate(obj);
    expect(isValid).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(new CategoryRules(obj));

    obj = { name: "some value", description: null };
    isValid = validator.validate(obj);
    expect(isValid).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(new CategoryRules(obj));

    obj = { name: "some value", description: undefined };
    isValid = validator.validate(obj);
    expect(isValid).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(new CategoryRules(obj));

    obj = { name: "some value", is_active: true };
    isValid = validator.validate(obj);
    expect(isValid).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(new CategoryRules(obj));

    obj = { name: "some value", is_active: false };
    isValid = validator.validate(obj);
    expect(isValid).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(new CategoryRules(obj));
  });
});

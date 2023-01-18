import ValidationError from "../../../@seedwork/errors/validation-error";
import Category from "./category";

describe("Category Integration Tests", () => {
  describe("Create method", () => {
    it("should a invalid category using name property", () => {
      expect(() => new Category({ name: null })).toThrow(
        new ValidationError("The name is required")
      );

      expect(() => new Category({ name: "" })).toThrow(
        new ValidationError("The name is required")
      );

      expect(() => new Category({ name: 5 as any })).toThrow(
        new ValidationError("The name must be a string")
      );

      expect(() => new Category({ name: "t".repeat(256) })).toThrow(
        new ValidationError("The name must be less or equal than 255")
      );
    });

    it("should a invalid category using description property", () => {
      expect(
        () => new Category({ name: "valid name", description: 5 as any })
      ).toThrow(new ValidationError("The description must be a string"));
    });

    it("should a invalid category using description property", () => {
      expect(
        () => new Category({ name: "valid name", is_active: 5 as any })
      ).toThrow(new ValidationError("The is_active must be a boolean"));

      expect(
        () => new Category({ name: "valid name", is_active: "" as any })
      ).toThrow(new ValidationError("The is_active must be a boolean"));
    });
  });

  describe("Update method", () => {
    it("should a invalid category using name property", () => {
      const category = new Category({ name: "valid name" });

      expect(() => category.update(null, null)).toThrow(
        new ValidationError("The name is required")
      );
      expect(() => category.update("", null)).toThrow(
        new ValidationError("The name is required")
      );
      expect(() => category.update(5 as any, null)).toThrow(
        new ValidationError("The name must be a string")
      );
      expect(() => category.update("t".repeat(256), null)).toThrow(
        new ValidationError("The name must be less or equal than 255")
      );
    });

    it("should a invalid category using description property", () => {
      const category = new Category({ name: "valid name" });

      expect(
        () => category.update("valid name", 5 as any )
      ).toThrow(new ValidationError("The description must be a string"));
    });
  });
});

import UniqueEntityId from "@seedwork/domain/value-objects/unique-entity-id.vo";
import Category from "./category";

describe("Category test", () => {
  it("constructor", () => {
    let category = new Category({ name: "Movie" });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      description: "description",
      is_active: false,
      created_at,
    });
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "description",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  test("id field", () => {
    let category = new Category({ name: "Movie" });

    expect(category.id).not.toBeNull();

    category = new Category({ name: "Movie" }, null);

    expect(category.id).not.toBeNull();

    category = new Category({ name: "Movie" }, undefined);

    expect(category.id).not.toBeNull();

    category = new Category({ name: "Movie" }, new UniqueEntityId());

    expect(category.id).not.toBeNull();
  });

  test("getter of name field", () => {
    const category = new Category({ name: "Movie" });

    expect(category.name).toBe("Movie");
  });

  test("getter and setter of description field", () => {
    const category_null = new Category({
      name: "Movie",
    });

    expect(category_null.description).toBeNull();

    const category = new Category({
      name: "Movie",
      description: "some description",
    });

    expect(category.description).toBe("some description");

    category["description"] = "other description";
    expect(category.description).toBe("other description");

    category["description"] = undefined;
    expect(category.description).toBeNull();
  });

  test("getter and setter of is_active", () => {
    let category = new Category({ name: "Movie" });

    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.is_active).toBeFalsy();

    category = new Category({ name: "Movie", is_active: true });
    expect(category.is_active).toBeTruthy();
  });

  test("getter of created_at", () => {
    let category = new Category({ name: "Movie" });

    expect(category.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    category = new Category({ name: "Movie", created_at });
    expect(category.created_at).toBe(created_at);
  });

  test("update name and description", () => {
    let category = new Category({ name: "Movie" });

    category.update("New name", "New description");
    expect(category.name).toBe("New name");
    expect(category.description).toBe("New description");

    category = new Category({
      name: "Old name",
      description: "Old description",
    });

    category.update("New name", "New description");
    expect(category.name).toBe("New name");
    expect(category.description).toBe("New description");
  });

  test("activate should change is_active to true", () => {
    let category = new Category({ name: "Movie", is_active: false });

    category.activate();
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: true });

    category.activate();
    expect(category.is_active).toBeTruthy();
  });

  test("deactivate should change is_active to false", () => {
    let category = new Category({ name: "Movie", is_active: false });

    category.deactivate();
    expect(category.is_active).toBeFalsy();

    category = new Category({ name: "Movie", is_active: true });

    category.deactivate();
    expect(category.is_active).toBeFalsy;
  });
});

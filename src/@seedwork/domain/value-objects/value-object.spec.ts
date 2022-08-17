import ValueObject from "./value-object";

class Stub extends ValueObject {}

describe("ValueObject Unit test", () => {
  it("should set value ", () => {
    let vo = new Stub("test");
    expect(vo.value).toBe("test");

    vo = new Stub({ prop: "value" });
    expect(vo.value).toStrictEqual({ prop: "value" });
  });
});

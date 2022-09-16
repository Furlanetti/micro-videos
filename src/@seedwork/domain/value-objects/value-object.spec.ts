import ValueObject from "./value-object";

class Stub extends ValueObject {}

describe("ValueObject Unit test", () => {
  it("should set value ", () => {
    let vo = new Stub("test");
    expect(vo.value).toBe("test");

    vo = new Stub({ prop: "value" });
    expect(vo.value).toStrictEqual({ prop: "value" });
  });

  it("should convert to string", () => {
    const date = new Date();
    let arrange = [
      { received: "", expected: "" },
      { received: "fake test", expected: "fake test" },
      { received: 0, expected: "0" },
      { received: 1, expected: "1" },
      { received: 5, expected: "5" },
      { received: true, expected: "true" },
      { received: false, expected: "false" },
      { received: date, expected: date.toString() },
      {
        received: { prop1: "value" },
        expected: JSON.stringify({ prop1: "value" }),
      },
    ];

    arrange.forEach((value) => {
      const vo = new Stub(value.received);
      expect(vo + "").toBe(value.expected);
    });
  });

  it("should be a immutable object", () => {
    const obj = {
      prop1: "value1",
      deep: { prop2: "value2", prop3: new Date() },
    };
    const vo = new Stub(obj);

    expect(() => {
      (vo as any).value.prop1 = "aa";
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    );

    expect(() => {
      (vo as any).value.deep.prop2 = "aa";
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    );

    expect(vo.value.deep.prop3).toBeInstanceOf(Date);
  });
});

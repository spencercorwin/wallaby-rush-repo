import { stringy } from "../stringy";

describe("stringy", () => {
  test("stringy does a thing", () => {
    expect(stringy("this")).toEqual("thisthis");
  });
});

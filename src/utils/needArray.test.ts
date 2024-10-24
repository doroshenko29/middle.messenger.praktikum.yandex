import { assert } from "chai";
import needArray from "./needArray";

describe("Ожидаем на выходе массив", () => {
  it("если передали строку", () => {
    assert.isArray(needArray("mocha"));
  });
  it("если передали массив", () => {
    assert.isArray(needArray(["test"]));
  });
}); 

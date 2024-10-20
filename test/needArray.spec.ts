import { assert } from "chai";
import needArray from "../src/utils/needArray";

describe("Typescript + Babel usage suite", () => {
    it("should return string correctly", () => {
      assert.isArray(needArray("mocha"));
      assert.isArray(needArray(["test"]));
    });
  }); 

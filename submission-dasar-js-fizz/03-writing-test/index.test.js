import { it } from "node:test";
import assert from "node:assert";
import { sum } from "./index.js";

it("should add correctly", () => {
  const a = 1;
  const b = 2;

  const actual = sum(a, b);

  const expected = 3;

  assert.equal(actual, expected);
});

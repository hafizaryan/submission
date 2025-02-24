import { it } from "node:test";
import assert from "node:assert";
import sum from "./index.js";

it("should add correctly", () => {
  const actual = sum(1, 2);
  assert.equal(actual, 3);
});

it("should return 0 if the first parameter is not a number", () => {
  const actual = sum("1", 2);
  assert.equal(actual, 0);
});

it("should return 0 if the second parameter is not a number", () => {
  const actual = sum(1, "2");
  assert.equal(actual, 0);
});

it("should return 0 if any number is negative", () => {
  const actual = sum(-1, 2);
  assert.equal(actual, 0);
});

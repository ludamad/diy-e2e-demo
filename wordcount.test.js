import { test } from "node:test";
import assert from "node:assert/strict";
import { count, longest } from "./wordcount.js";

test("count of empty string is 0", () => {
  assert.equal(count(""), 0);
});

test("count of one word is 1", () => {
  assert.equal(count("hello"), 1);
});

test("count of whitespace-only input is 0", () => {
  assert.equal(count("   "), 0);
  assert.equal(count("\n\t "), 0);
});

test("count ignores repeated spaces", () => {
  assert.equal(count("a  b"), 2);
});

test("count ignores leading and trailing spaces", () => {
  assert.equal(count("  a b "), 2);
});

test("count treats newlines and tabs as separators", () => {
  assert.equal(count("a\nb"), 2);
  assert.equal(count("a\tb"), 2);
  assert.equal(count("a \n\t b"), 2);
});

test("longest of empty or whitespace-only input is empty", () => {
  assert.equal(longest(""), "");
  assert.equal(longest("   "), "");
});

test("longest ignores repeated spaces", () => {
  assert.equal(longest("a  bb"), "bb");
});

test("longest treats newlines and tabs as separators", () => {
  assert.equal(longest("a\nbbb"), "bbb");
  assert.equal(longest("a\tbbb"), "bbb");
});

test("longest keeps the first word on a tie", () => {
  assert.equal(longest("ab  cd"), "ab");
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { count, longest } from "./wordcount.js";

test("count: single spaces", () => {
  assert.equal(count("a b c"), 3);
});

test("count: empty and blank text have no words", () => {
  assert.equal(count(""), 0);
  assert.equal(count("   "), 0);
  assert.equal(count("\t\n"), 0);
});

test("count: runs of spaces are one separator", () => {
  assert.equal(count("a   b"), 2);
  assert.equal(count("  a b  "), 2);
});

test("count: tabs and newlines separate words", () => {
  assert.equal(count("a\tb"), 2);
  assert.equal(count("a\nb"), 2);
  assert.equal(count("one\r\ntwo\r\nthree"), 3);
  assert.equal(count("a \t\n b"), 2);
});

test("longest: single spaces", () => {
  assert.equal(longest("a bbb cc"), "bbb");
});

test("longest: empty and blank text have no word", () => {
  assert.equal(longest(""), "");
  assert.equal(longest("   \t\n"), "");
});

test("longest: runs of whitespace never produce an empty word", () => {
  assert.equal(longest("a    bb"), "bb");
  assert.equal(longest("   hello   "), "hello");
});

test("longest: tabs and newlines separate words", () => {
  assert.equal(longest("ab\tabcd\nabc"), "abcd");
});

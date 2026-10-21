import { test } from "node:test";
import assert from "node:assert/strict";
import { count, longest } from "../wordcount.js";

test("count of empty text is 0", () => {
  assert.equal(count(""), 0);
});

test("count of plain words", () => {
  assert.equal(count("one two three"), 3);
});

test("count treats a run of spaces as one gap", () => {
  assert.equal(count("a  b"), 2);
});

test("count treats newlines and tabs as gaps", () => {
  assert.equal(count("a\nb"), 2);
  assert.equal(count("a\tb"), 2);
  assert.equal(count("a\r\nb\n\nc"), 3);
});

test("count ignores leading, trailing and whitespace-only text", () => {
  assert.equal(count("  a   b  \n"), 2);
  assert.equal(count("   "), 0);
  assert.equal(count("\n\t\n"), 0);
});

test("longest of empty or blank text is empty", () => {
  assert.equal(longest(""), "");
  assert.equal(longest(" \n\t "), "");
});

test("longest picks the longest word across any spacing", () => {
  assert.equal(longest("a  bbb\tcc"), "bbb");
  assert.equal(longest("a\nbcd  ef"), "bcd");
});

test("longest never returns a word containing whitespace", () => {
  assert.equal(longest("hello\nworld\n"), "hello");
  assert.ok(!/\s/.test(longest("x\ty\nzzz\r\nww")));
});

test("longest keeps the first of equal-length words", () => {
  assert.equal(longest("ab\ncd"), "ab");
});

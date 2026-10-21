import { test } from "node:test";
import assert from "node:assert/strict";
import { count, longest } from "./wordcount.js";

test("count keeps the existing cases", () => {
  assert.equal(count(""), 0);
  assert.equal(count("hello"), 1);
  assert.equal(count("hello world"), 2);
});

test("count ignores repeated spaces between words", () => {
  assert.equal(count("a  b"), 2);
});

test("count ignores leading and trailing spaces", () => {
  assert.equal(count(" a "), 1);
});

test("count of only spaces is zero", () => {
  assert.equal(count("  "), 0);
});

test("count splits on newlines", () => {
  assert.equal(count("hello\nworld"), 2);
});

test("count splits on tabs", () => {
  assert.equal(count("a\tb"), 2);
});

test("count treats mixed whitespace runs as one separator", () => {
  assert.equal(count(" \t a \n\n b\t\tc \r\n"), 3);
});

test("count keeps punctuation as part of a word", () => {
  assert.equal(count("hi, there!"), 2);
});

test("count throws on undefined input", () => {
  assert.throws(() => count(undefined), TypeError);
});

test("longest of empty text is empty", () => {
  assert.equal(longest(""), "");
});

test("longest of only spaces is empty", () => {
  assert.equal(longest("   \t\n"), "");
});

test("longest returns the single word", () => {
  assert.equal(longest("hello"), "hello");
});

test("longest ignores repeated spaces", () => {
  assert.equal(longest("a    bbb  cc"), "bbb");
});

test("longest splits on newlines and tabs", () => {
  assert.equal(longest("hi\nthere\tyou"), "there");
});

test("longest returns the first of equally long words", () => {
  assert.equal(longest("ab  cd ef"), "ab");
});

test("longest keeps punctuation as part of a word", () => {
  assert.equal(longest("hi, there!"), "there!");
});

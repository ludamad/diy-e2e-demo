import { test } from "node:test";
import assert from "node:assert/strict";
import { count, longest } from "./wordcount.js";

// A word is a run of non-whitespace characters. Runs of any whitespace
// (spaces, tabs, newlines) separate words; leading and trailing whitespace
// adds nothing.

test("count of empty and blank text is 0", () => {
  assert.equal(count(""), 0);
  assert.equal(count(" "), 0);
  assert.equal(count("  "), 0);
  assert.equal(count("\t\n "), 0);
});

test("count ignores leading and trailing spaces", () => {
  assert.equal(count(" a"), 1);
  assert.equal(count("a "), 1);
  assert.equal(count("a b "), 2);
  assert.equal(count("  a b  "), 2);
});

test("count treats a run of spaces as one separator", () => {
  assert.equal(count("a  b"), 2);
  assert.equal(count("a     b     c"), 3);
});

test("count splits on tabs and newlines", () => {
  assert.equal(count("a\tb"), 2);
  assert.equal(count("a\nb"), 2);
  assert.equal(count("a\r\nb"), 2);
  assert.equal(count("one\t two\n\nthree"), 3);
});

test("count counts a single word as 1", () => {
  assert.equal(count("hello"), 1);
});

test("count counts non-letter runs as words, unchanged from before", () => {
  // Pins the definition: a word is any non-whitespace run, not only letters.
  assert.equal(count("- -"), 2);
  assert.equal(count("hello, world!"), 2);
});

test("longest of empty and blank text is empty string", () => {
  assert.equal(longest(""), "");
  assert.equal(longest("   "), "");
  assert.equal(longest("\n\t"), "");
});

test("longest ignores repeated and surrounding whitespace", () => {
  assert.equal(longest("  ab   c  "), "ab");
  assert.equal(longest("a    bbbb"), "bbbb");
});

test("longest splits on newlines and tabs", () => {
  assert.equal(longest("a\nbbbb cc"), "bbbb");
  assert.equal(longest("aaaa\tbb"), "aaaa");
});

test("longest returns the first of equally long words", () => {
  assert.equal(longest("ab cd ef"), "ab");
  assert.equal(longest("ab\ncd"), "ab");
});

test("longest keeps punctuation inside the word", () => {
  assert.equal(longest("x-yyy"), "x-yyy");
  assert.equal(longest("hi, world!"), "world!");
});

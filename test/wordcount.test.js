import { test } from "node:test";
import assert from "node:assert/strict";
import { count, longest } from "../wordcount.js";

test("count ignores runs of spaces", () => {
  assert.equal(count("a  b"), 2);
  assert.equal(count("a     b"), 2);
});

test("count ignores leading and trailing spaces", () => {
  assert.equal(count(" a b "), 2);
  assert.equal(count("   "), 0);
});

test("count treats tabs and newlines as separators", () => {
  assert.equal(count("a\tb"), 2);
  assert.equal(count("a\nb"), 2);
  assert.equal(count("a\r\n\tb \n c"), 3);
});

test("count of empty or blank text is 0", () => {
  assert.equal(count(""), 0);
  assert.equal(count(" \t\n"), 0);
});

test("longest ignores runs of spaces", () => {
  assert.equal(longest("a    bb"), "bb");
  assert.equal(longest("   ccc  "), "ccc");
});

test("longest treats tabs and newlines as separators", () => {
  assert.equal(longest("a\tbbb"), "bbb");
  assert.equal(longest("aaa\nb"), "aaa");
});

test("longest of blank text is empty", () => {
  assert.equal(longest(""), "");
  assert.equal(longest(" \t\n "), "");
});

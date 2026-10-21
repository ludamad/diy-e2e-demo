import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { count, longest } from "../wordcount.js";

test("count of empty and blank text is zero", () => {
  assert.equal(count(""), 0);
  assert.equal(count("   "), 0);
  assert.equal(count(" \t\n "), 0);
});

test("count ignores leading, trailing and repeated spaces", () => {
  assert.equal(count("one"), 1);
  assert.equal(count("one two"), 2);
  assert.equal(count("  one two  "), 2);
  assert.equal(count("one    two"), 2);
});

test("count treats tabs, newlines and carriage returns as separators", () => {
  assert.equal(count("one\ttwo"), 2);
  assert.equal(count("one\ntwo"), 2);
  assert.equal(count("one\r\ntwo\r\n"), 2);
  assert.equal(count("one \t\n two"), 2);
});

test("count treats non-breaking spaces as separators", () => {
  assert.equal(count("one\u00a0two"), 2);
});

test("longest is the longest run of non-space text", () => {
  assert.equal(longest(""), "");
  assert.equal(longest("   \t\n"), "");
  assert.equal(longest("a\tbbb\nc"), "bbb");
  assert.equal(longest("  a   bbb  cc  "), "bbb");
  assert.equal(longest("one two"), "one");
});

test("the command line counts words in a file with any spacing", () => {
  const cli = fileURLToPath(new URL("../src/cli/index.js", import.meta.url));
  const file = join(mkdtempSync(join(tmpdir(), "textkit-")), "notes.txt");
  writeFileSync(file, "one\ttwo\n\n  three  ");
  const out = execFileSync(process.execPath, [cli, "count", file], { encoding: "utf8" });
  assert.equal(out, '3 words, the longest "three"\n');
});

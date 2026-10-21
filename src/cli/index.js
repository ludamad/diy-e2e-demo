#!/usr/bin/env node
// textkit: count, wrap, tabulate and tokenize text from the command line.

import { readFile } from "node:fs/promises";
import { count, longest } from "../../wordcount.js";
import { wrap } from "../format/wrap.js";
import { table } from "../format/table.js";
import { parse } from "../parse/csv.js";
import { frequencies } from "../parse/tokens.js";
import { parseArgs, usage } from "./args.js";

const commands = {
  count: {
    help: "how many words, and the longest",
    spec: {},
    run: (text) => `${count(text)} words, the longest "${longest(text)}"`,
  },
  wrap: {
    help: "wrap paragraphs to a width",
    spec: { width: { type: "number", short: "w", default: 72, help: "columns" } },
    run: (text, flags) => wrap(text, flags.width),
  },
  table: {
    help: "draw CSV as a table",
    spec: { separator: { type: "string", short: "s", default: ",", help: "field separator" } },
    run: (text, flags) => {
      const [header, ...rows] = parse(text, { separator: flags.separator });
      return table(header ?? [], rows);
    },
  },
  top: {
    help: "the most common words",
    spec: { n: { type: "number", short: "n", default: 10, help: "how many" } },
    run: (text, flags) =>
      table(
        ["word", "count"],
        frequencies(text).slice(0, flags.n),
      ),
  },
};

async function main(argv) {
  const [name, ...rest] = argv;
  const cmd = commands[name];
  if (!cmd) {
    const list = Object.entries(commands).map(([n, c]) => `  ${n.padEnd(6)} ${c.help}`);
    console.error(`usage: textkit COMMAND [flags] [files]\n${list.join("\n")}`);
    return 2;
  }
  let args;
  try {
    args = parseArgs(rest, cmd.spec);
  } catch (e) {
    console.error(`${e.message}\n${usage("textkit " + name, cmd.spec)}`);
    return 2;
  }
  const inputs = args.positional.length ? args.positional : ["/dev/stdin"];
  const text = (await Promise.all(inputs.map((f) => readFile(f, "utf8")))).join("\n");
  console.log(cmd.run(text, args.flags));
  return 0;
}

process.exitCode = await main(process.argv.slice(2));

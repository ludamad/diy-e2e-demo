// Reading a command line: flags (--name value, --name=value, -n), booleans,
// and the positional arguments left over.

// parseArgs reads argv against spec, an object of flag name to
// { type: "string" | "number" | "boolean", short, default }.
export function parseArgs(argv, spec) {
  const flags = {};
  const positional = [];
  const byShort = Object.fromEntries(
    Object.entries(spec)
      .filter(([, s]) => s.short)
      .map(([name, s]) => [s.short, name]),
  );
  for (const [name, s] of Object.entries(spec)) {
    if ("default" in s) flags[name] = s.default;
    else if (s.type === "boolean") flags[name] = false;
  }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--") {
      positional.push(...argv.slice(i + 1));
      break;
    }
    let name, inline;
    if (a.startsWith("--")) {
      [name, inline] = a.slice(2).split(/=(.*)/s, 2);
    } else if (a.startsWith("-") && a.length === 2) {
      name = byShort[a[1]];
      if (!name) throw new Error(`unknown flag ${a}`);
    } else {
      positional.push(a);
      continue;
    }
    const s = spec[name];
    if (!s) throw new Error(`unknown flag --${name}`);
    if (s.type === "boolean") {
      flags[name] = inline === undefined ? true : inline !== "false";
      continue;
    }
    const v = inline ?? argv[++i];
    if (v === undefined) throw new Error(`--${name} needs a value`);
    flags[name] = s.type === "number" ? toNumber(name, v) : v;
  }
  return { flags, positional };
}

function toNumber(name, v) {
  const n = Number(v);
  if (Number.isNaN(n)) throw new Error(`--${name} wants a number, not ${v}`);
  return n;
}

// usage describes spec as help text, a line for each flag.
export function usage(command, spec) {
  const lines = Object.entries(spec).map(([name, s]) => {
    const short = s.short ? `-${s.short}, ` : "    ";
    const arg = s.type === "boolean" ? "" : ` ${s.type.toUpperCase()}`;
    const def = "default" in s ? ` (default ${s.default})` : "";
    return `  ${short}--${name}${arg}${def}${s.help ? "  " + s.help : ""}`;
  });
  return `usage: ${command} [flags] [files]\n${lines.join("\n")}`;
}

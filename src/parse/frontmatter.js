// Front matter: a block of "key: value" lines between --- fences at the top
// of a text file, as static site generators use.

// split returns a file's front matter as an object and the text after it.
// A file without front matter has an empty object and all its text.
export function split(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: text };
  return { data: parseBlock(m[1]), body: text.slice(m[0].length) };
}

function parseBlock(block) {
  const data = {};
  let list = null;
  for (const raw of block.split(/\r?\n/)) {
    const line = raw.replace(/\s+#.*$/, "");
    if (line.trim() === "") continue;
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && list) {
      list.push(value(item[1]));
      continue;
    }
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) throw new SyntaxError(`front matter: cannot read "${raw}"`);
    if (kv[2] === "") {
      list = data[kv[1]] = [];
    } else {
      list = null;
      data[kv[1]] = value(kv[2]);
    }
  }
  return data;
}

function value(s) {
  s = s.trim();
  if (/^(['"]).*\1$/.test(s)) return s.slice(1, -1);
  if (s === "true" || s === "false") return s === "true";
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  if (/^\[.*\]$/.test(s)) return s.slice(1, -1).split(",").map((x) => value(x)).filter((x) => x !== "");
  return s;
}

// join writes data back as front matter above body.
export function join(data, body) {
  const lines = Object.entries(data).map(([k, v]) =>
    Array.isArray(v) ? `${k}:\n${v.map((x) => `  - ${x}`).join("\n")}` : `${k}: ${v}`,
  );
  return `---\n${lines.join("\n")}\n---\n${body}`;
}

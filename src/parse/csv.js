// Reading and writing CSV, as RFC 4180 describes it: commas, quoted
// fields, doubled quotes inside them, and line breaks inside quotes.

// parse reads CSV text into rows of strings.
export function parse(text, { separator = "," } = {}) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        field += ch;
      }
    } else if (ch === '"' && field === "") {
      quoted = true;
    } else if (ch === separator) {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += ch;
    }
  }
  if (quoted) throw new SyntaxError("unterminated quoted field");
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

// records reads CSV with a header row into objects keyed by its names.
export function records(text, options) {
  const [header, ...rows] = parse(text, options);
  if (!header) return [];
  return rows.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

// stringify writes rows as CSV, quoting the fields that need it.
export function stringify(rows, { separator = "," } = {}) {
  const needs = new RegExp(`["\\r\\n${separator}]`);
  const field = (v) => {
    const s = String(v ?? "");
    return needs.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
  };
  return rows.map((r) => r.map(field).join(separator)).join("\n");
}

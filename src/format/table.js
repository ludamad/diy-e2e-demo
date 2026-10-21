// Drawing rows as a plain-text table, columns sized to their widest cell.

import { pad, displayWidth } from "./align.js";

// table draws rows (arrays of cells) with a header row, a rule under it,
// and columns aligned as aligns says ("left" when not given). Numbers are
// right-aligned unless told otherwise.
export function table(header, rows, aligns = []) {
  const all = [header, ...rows].map((r) => r.map((c) => String(c ?? "")));
  const cols = Math.max(...all.map((r) => r.length));
  const widths = [];
  for (let c = 0; c < cols; c++) {
    widths.push(Math.max(...all.map((r) => displayWidth(r[c] ?? ""))));
  }
  const alignOf = (c) => aligns[c] ?? (rows.every((r) => typeof r[c] === "number") ? "right" : "left");
  const line = (r) =>
    widths
      .map((w, c) => pad(r[c] ?? "", w, alignOf(c)))
      .join("  ")
      .trimEnd();
  const rule = widths.map((w) => "-".repeat(w)).join("  ");
  return [line(all[0]), rule, ...all.slice(1).map(line)].join("\n");
}

// columns lays words out in as many columns as fit in width, filled
// down then across, like ls.
export function columns(words, width = 80, gap = 2) {
  if (words.length === 0) return "";
  const w = Math.max(...words.map(displayWidth)) + gap;
  const per = Math.max(1, Math.floor((width + gap) / w));
  const rows = Math.ceil(words.length / per);
  const out = [];
  for (let r = 0; r < rows; r++) {
    let line = "";
    for (let c = 0; c < per; c++) {
      const word = words[c * rows + r];
      if (word === undefined) break;
      line += pad(word, w);
    }
    out.push(line.trimEnd());
  }
  return out.join("\n");
}

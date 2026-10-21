// Aligning text in a fixed width: left, right, centre, and justified.

// pad fits s to width, aligned as align says: "left", "right" or "centre".
// Text longer than width is returned as it is.
export function pad(s, width, align = "left", fill = " ") {
  const gap = width - displayWidth(s);
  if (gap <= 0) return s;
  switch (align) {
    case "left":
      return s + fill.repeat(gap);
    case "right":
      return fill.repeat(gap) + s;
    case "centre": {
      const left = Math.floor(gap / 2);
      return fill.repeat(left) + s + fill.repeat(gap - left);
    }
    default:
      throw new Error(`unknown alignment ${align}`);
  }
}

// justify spreads the words of line across width by widening the gaps
// between them, the leftmost gaps first.
export function justify(line, width) {
  const words = line.trim().split(/\s+/);
  if (words.length < 2) return pad(line.trim(), width);
  const letters = words.reduce((n, w) => n + displayWidth(w), 0);
  const gaps = words.length - 1;
  const spaces = width - letters;
  if (spaces < gaps) return words.join(" ");
  const each = Math.floor(spaces / gaps);
  let extra = spaces - each * gaps;
  let out = words[0];
  for (const w of words.slice(1)) {
    out += " ".repeat(each + (extra-- > 0 ? 1 : 0)) + w;
  }
  return out;
}

// displayWidth is how many columns s takes in a terminal: wide East Asian
// characters take two, combining marks none.
export function displayWidth(s) {
  let n = 0;
  for (const ch of s) {
    const cp = ch.codePointAt(0);
    if (/\p{Mn}/u.test(ch)) continue;
    n += isWide(cp) ? 2 : 1;
  }
  return n;
}

function isWide(cp) {
  return (
    (cp >= 0x1100 && cp <= 0x115f) ||
    (cp >= 0x2e80 && cp <= 0xa4cf) ||
    (cp >= 0xac00 && cp <= 0xd7a3) ||
    (cp >= 0xf900 && cp <= 0xfaff) ||
    (cp >= 0xfe30 && cp <= 0xfe4f) ||
    (cp >= 0xff00 && cp <= 0xff60) ||
    (cp >= 0xffe0 && cp <= 0xffe6) ||
    (cp >= 0x1f300 && cp <= 0x1faff)
  );
}

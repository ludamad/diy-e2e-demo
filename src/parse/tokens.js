// Splitting text into tokens: words, numbers, punctuation and space, each
// with where it starts, for tools that need more than a word count.

const patterns = [
  ["space", /^\s+/],
  ["number", /^-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/i],
  ["word", /^[\p{L}\p{M}][\p{L}\p{M}\p{N}'’-]*/u],
  ["punct", /^[^\s\p{L}\p{N}]/u],
];

// tokenize returns the tokens of text in order: { kind, text, at }.
export function tokenize(text) {
  const out = [];
  let at = 0;
  while (at < text.length) {
    const rest = text.slice(at);
    let matched = false;
    for (const [kind, re] of patterns) {
      const m = rest.match(re);
      if (m) {
        out.push({ kind, text: m[0], at });
        at += m[0].length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      out.push({ kind: "other", text: rest[0], at });
      at++;
    }
  }
  return out;
}

// sentences splits text at full stops, question and exclamation marks
// followed by space, keeping the mark with its sentence.
export function sentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// frequencies counts each word of text, ignoring case, most common first.
export function frequencies(text) {
  const counts = new Map();
  for (const t of tokenize(text)) {
    if (t.kind !== "word") continue;
    const w = t.text.toLowerCase();
    counts.set(w, (counts.get(w) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

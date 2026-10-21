// Counts words in text.

// count returns how many words text has: runs of letters between spaces.
export function count(text) {
  if (text === "") return 0;
  return text.split(" ").length;
}

// longest returns the longest word in text, or "" if it has none.
export function longest(text) {
  let best = "";
  for (const w of text.split(" ")) {
    if (w.length > best.length) best = w;
  }
  return best;
}

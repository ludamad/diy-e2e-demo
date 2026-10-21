// Counts words in text.

// words returns the words in text: runs of non-whitespace, with any run of whitespace between them.
function words(text) {
  return text.trim().split(/\s+/).filter((w) => w !== "");
}

// count returns how many words text has: runs of letters between whitespace.
export function count(text) {
  return words(text).length;
}

// longest returns the longest word in text, or "" if it has none.
export function longest(text) {
  let best = "";
  for (const w of words(text)) {
    if (w.length > best.length) best = w;
  }
  return best;
}

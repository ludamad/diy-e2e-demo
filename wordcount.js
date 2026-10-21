// Counts words in text.

// words splits text into words: runs of non-whitespace characters, so runs of
// spaces, tabs and newlines all separate words. Empty pieces are dropped.
function words(text) {
  return text.split(/\s+/).filter((w) => w !== "");
}

// count returns how many words text has.
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

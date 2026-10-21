// Counts words in text.

// words returns the words in text: runs of non-whitespace characters.
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

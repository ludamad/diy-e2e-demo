// Counts words in text.

// count returns how many words text has: runs of characters between whitespace.
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

// words returns the words of text, split at any run of whitespace.
function words(text) {
  return text.split(/\s+/).filter(Boolean);
}

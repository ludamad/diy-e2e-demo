// Counts words in text.

// words returns the words in text: runs of non-space characters. Any run of
// spaces, tabs or newlines separates them, so blank text has none.
function words(text) {
  return text.match(/\S+/g) ?? [];
}

// count returns how many words text has: runs of letters between spaces.
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

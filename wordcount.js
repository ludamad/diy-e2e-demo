// Counts words in text.

// words returns the words of text: runs of non-space characters, with any
// run of spaces, tabs or newlines between them.
function words(text) {
  return text.split(/\s+/).filter(Boolean);
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

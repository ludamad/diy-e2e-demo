// Wrapping text to a width, by words, keeping paragraphs apart.

// wrap breaks text into lines no longer than width, at spaces. A word
// longer than width gets a line of its own. Blank lines between paragraphs
// are kept.
export function wrap(text, width = 72) {
  if (width < 1) throw new RangeError("width must be at least 1");
  return text
    .split(/\n\s*\n/)
    .map((para) => wrapParagraph(para.replace(/\s+/g, " ").trim(), width))
    .join("\n\n");
}

function wrapParagraph(para, width) {
  if (para === "") return "";
  const lines = [];
  let line = "";
  for (const word of para.split(" ")) {
    if (line === "") {
      line = word;
    } else if (line.length + 1 + word.length <= width) {
      line += " " + word;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line !== "") lines.push(line);
  return lines.join("\n");
}

// indent puts prefix before every line of text that is not blank.
export function indent(text, prefix = "  ") {
  return text
    .split("\n")
    .map((l) => (l.trim() === "" ? l : prefix + l))
    .join("\n");
}

// dedent removes the indentation every non-blank line of text shares.
export function dedent(text) {
  const lines = text.split("\n");
  let common = Infinity;
  for (const l of lines) {
    if (l.trim() === "") continue;
    common = Math.min(common, l.length - l.trimStart().length);
  }
  if (common === Infinity) return text;
  return lines.map((l) => l.slice(common)).join("\n");
}

// hangingIndent wraps text so the first line starts at the margin and the
// rest are indented by hang spaces.
export function hangingIndent(text, width = 72, hang = 4) {
  const [first, ...rest] = wrap(text, width - hang).split("\n");
  return [first, ...rest.map((l) => (l === "" ? l : " ".repeat(hang) + l))].join("\n");
}

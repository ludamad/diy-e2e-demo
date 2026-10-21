# textkit

Small text tools, without dependencies: count words, wrap and align
paragraphs, draw tables, read CSV and front matter, and split text into
tokens. Each module stands alone.

    node src/cli/index.js count notes.txt
    node src/cli/index.js wrap -w 60 essay.txt
    node src/cli/index.js table data.csv
    node src/cli/index.js top -n 5 essay.txt

| Module | What it does |
| --- | --- |
| `wordcount.js` | `count` and `longest` words |
| `src/format/wrap.js` | wrap, indent and dedent |
| `src/format/align.js` | pad, justify, display width |
| `src/format/table.js` | tables and columns |
| `src/parse/csv.js` | CSV in and out |
| `src/parse/tokens.js` | tokens, sentences, word frequencies |
| `src/parse/frontmatter.js` | front matter in and out |
| `src/cli/` | the `textkit` command |

Run the tests with `npm test`.

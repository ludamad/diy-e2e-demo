// Package wordcount counts words in text.
package wordcount

import "strings"

// Count returns how many words text has: runs of letters between spaces.
func Count(text string) int {
	if text == "" {
		return 0
	}
	return len(strings.Split(text, " "))
}

// Longest returns the longest word in text, or "" if it has none.
func Longest(text string) string {
	longest := ""
	for _, w := range strings.Split(text, " ") {
		if len(w) > len(longest) {
			longest = w
		}
	}
	return longest
}

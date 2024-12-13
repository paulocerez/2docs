export function escapeCodeSnippet(snippet: string): string {
	return snippet
	  .replace(/\\/g, '\\\\') // Escape backslashes
	  .replace(/"/g, '\\"')   // Escape double quotes
	  .replace(/\n/g, '\\n')  // Replace newlines with \n
	  .replace(/\r/g, '\\r')  // Replace carriage returns with \r
	  .replace(/\t/g, '\\t')  // Replace tabs with \t
	  .replace(/\f/g, '\\f')  // Replace form feeds with \f
	  .replace(/`/g, '\\`');  // Escape backticks
  }
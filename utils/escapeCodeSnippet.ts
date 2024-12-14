export function escapeCodeSnippet(snippet: string): string {
	if (!snippet) return '';
  
	// Remove any existing code block markers if present
	let code = snippet.replace(/^```(\w+)?\n/, '').replace(/\n```$/, '');
  
	// Preserve the code structure by wrapping it in code block markers
	const escapedCode = code
	  .replace(/\\/g, '\\\\')     // Escape backslashes
	  .replace(/"/g, '\\"')       // Escape double quotes
	  .replace(/\t/g, '    ')     // Replace tabs with spaces (more readable)
	  .replace(/\f/g, '\\f')      // Replace form feeds
	  .replace(/`/g, '\\`')       // Escape backticks
	  .replace(/\n/g, '\\n')      // Preserve newlines
	  .replace(/\r/g, '\\r');     // Handle carriage returns
  
	// Return the code with markdown code block syntax
	return `\`\`\`typescript\n${escapedCode}\n\`\`\``;
  }

  export function prepareCodeForDisplay(snippet: string): string {
	if (!snippet) return '';
  
	// Remove code block markers if present
	let code = snippet.replace(/^```(\w+)?\n/, '').replace(/\n```$/, '');
  
	// Unescape the necessary characters
	return code
	  .replace(/\\n/g, '\n')      // Restore newlines
	  .replace(/\\r/g, '\r')      // Restore carriage returns
	  .replace(/\\t/g, '    ')    // Replace tab markers with spaces
	  .replace(/\\\\/g, '\\')     // Restore backslashes
	  .replace(/\\"/g, '"')       // Restore quotes
	  .replace(/\\`/g, '`')       // Restore backticks
	  .replace(/\\f/g, '\f');     // Restore form feeds
  }
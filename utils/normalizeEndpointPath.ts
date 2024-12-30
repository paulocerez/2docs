/**
 * Normalizes an API endpoint path by removing base URL, API version,
 * variable placeholders, and standardizing slashes.
 * 
 * @param path - The original API endpoint path
 * @returns The normalized path
 */
export function normalizePath(path: string): string {
	return path
	  .replace(/^https?:\/\/[^\/]+\/[^\/]+\/[^\/]+/, '') // Remove base URL and API version
	  .replace(/^\/api\//, '')                           // Remove '/api/' prefix if it exists
	  .replace(/\{\{.*?\}\}/g, '')                      // Remove {{variable}}
	  .replace(/\{.*?\}/g, '')                          // Remove {variable}
	  .replace(/YOUR_[A-Z_]+/g, '')                     // Remove YOUR_XXX placeholders
	  .replace(/\/+/g, '/')                             // Normalize multiple slashes
	  .replace(/\/$/, '')                               // Remove trailing slash
	  .replace(/^\//, '')                               // Remove leading slash
	  .replace(/\/+/g, '/');                            // Final cleanup of multiple slashes
  }

/**
 * Normalizes an array of paths or a single path.
 * 
 * @param paths - A single path string or an array of path strings
 * @returns An array of normalized paths
 */
export function normalizeStepPaths(paths: string | string[]): string[] {
    return Array.isArray(paths) 
        ? paths.map(normalizePath) 
        : [normalizePath(paths)];
}
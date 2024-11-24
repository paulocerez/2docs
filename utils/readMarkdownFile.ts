import path from "path";
import fs from "fs";

export function readMarkdownFile(filePath: string): string {
    try {
        const fullPath = path.resolve(filePath);
        return fs.readFileSync(fullPath, 'utf8');
    } catch (error) {
        console.error(`Error reading markdown file ${filePath}:`, error);
        throw error;
    }
}
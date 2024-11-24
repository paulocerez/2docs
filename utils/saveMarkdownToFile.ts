import path from "path";
import fs from "fs/promises";

export async function saveMarkdownToFile(markdown: string, url: string) {
    try {
        const filename = `${encodeURIComponent(url)}_${Date.now()}.md`;
        const filePath = path.join(process.cwd(), 'markdown', filename);

        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, markdown, 'utf8');

        console.log(`Markdown saved to ${filePath}`);
        return filePath;
    } catch (error) {
        console.error("Error saving markdown to file:", error);
        throw error;
    }
}
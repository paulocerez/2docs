import { readMarkdownFile } from "@/utils/readMarkdownFile";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";

const openai = new OpenAI({
    apiKey: 'sk-quqi68yuMO7hTugSdbymcy5bXtCXoObAoi3AEhMg-9T3BlbkFJ2oBryA186fEjaazV1IvbvxzYSKpzgU0Mt8qbZlW6MA',
});

export async function identifyEndpoints(markdown: string): Promise<string[]> {
    const messages: ChatCompletionMessageParam[] = [
        {
            role: "system",
            content: `You are an AI assistant specialized in analyzing API endpoint information, particularly for the Notion API. Given a snippet of text potentially describing an API endpoint, extract and structure the following information:

            1. HTTP method (GET, POST, PUT, PATCH, DELETE)
            2. Endpoint path
            3. Specific operation (e.g., "Filter a database", "Sort a database", "Query a database")
            4. A brief summary of the endpoint's purpose
            5. A more detailed description (if available)
            6. Request body structure (if available)

            Return the information in a JSON format with the following structure:
            {
                "method": "HTTP_METHOD",
                "path": "/endpoint/path",
                "operation": "Specific operation name",
                "summary": "Brief summary",
                "description": "More detailed description (if available)",
                "requestBody": "Sample request body structure (if available)"
            }

            For endpoints like '/v1/databases/:id/query' that can perform multiple operations, create separate entries for each operation (e.g., one for filtering, one for sorting).
            
            Return only the JSON object, without any additional formatting or markdown syntax.
            If the provided text does not contain valid endpoint information, return null.`
        },
        {
            role: "user",
            content: markdown
        }
    ];

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            temperature: 0.3,
            stream: false,
        });

        const content = completion.choices[0].message.content;
        if (!content) {
            throw new Error("Failed to identify endpoints");
        }

        const cleanedContent = content.replace(/```json\n|\n```/g, '').trim();
        return JSON.parse(cleanedContent);
    } catch (error) {
        console.error("Error in OpenAI API call:", error);
        throw error;
    }
}

export async function identifyEndpointsFromFile(filePath: string): Promise<string[]> {
    try {
        const markdown = await readMarkdownFile(filePath);
        return identifyEndpoints(markdown);
    } catch (error) {
        console.error("Error reading or processing file:", error);
        throw error;
    }
}

// Main execution
async function main() {
    try {
        const endpoints = await identifyEndpointsFromFile("./markdown/notion-markdown.md");
        console.log(JSON.stringify(endpoints, null, 2));
		console.log(endpoints.length);
    } catch (error) {
        console.error("Error in main execution:", error);
    }
}

main();
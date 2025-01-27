import { InsertApiEndpoint } from "@/db/schema/apis";

export function parseMarkdownForEndpoints(markdown: string): Omit<InsertApiEndpoint, 'id' | 'apiDocumentationId'>[] {
  const endpoints: Omit<InsertApiEndpoint, 'id' | 'apiDocumentationId'>[] = [];
  const lines = markdown.split('\n');
  let currentEndpoint: Partial<Omit<InsertApiEndpoint, 'id' | 'apiDocumentationId'>> = {};

  for (const line of lines) {
    if (line.startsWith('##')) {
      if (Object.keys(currentEndpoint).length > 0) {
        endpoints.push(currentEndpoint as Omit<InsertApiEndpoint, 'id' | 'apiDocumentationId'>);
        currentEndpoint = {};
      }
      const [method, path] = line.substring(2).trim().split(' ');
      currentEndpoint.method = method;
      currentEndpoint.path = path;
    } else if (line.startsWith('Summary:')) {
      currentEndpoint.summary = line.substring('Summary:'.length).trim();
    } else if (line.startsWith('Description:')) {
      currentEndpoint.description = line.substring('Description:'.length).trim();
    } else if (line.startsWith('Parameters:')) {
      currentEndpoint.parameters = line.substring('Parameters:'.length).trim();
    } else if (line.startsWith('Request Body:')) {
      currentEndpoint.requestBody = line.substring('Request Body:'.length).trim();
    } else if (line.startsWith('Responses:')) {
      currentEndpoint.responses = line.substring('Responses:'.length).trim();
    }
  }

  if (Object.keys(currentEndpoint).length > 0) {
    endpoints.push(currentEndpoint as Omit<InsertApiEndpoint, 'id' | 'apiDocumentationId'>);
  }

  return endpoints;
}
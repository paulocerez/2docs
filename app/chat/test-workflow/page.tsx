"use client";

import { Workflow } from "@/components/workflow/Workflow";
import { WorkflowStepProps } from "@/components/workflow/workflow-step";

const mockWorkflowSteps: WorkflowStepProps[] = [
  {
    id: "1",
    title: "Fetch Notion Entries",
    endpoint: "databases/{database_id}/query",
    order: 1,
    codeSnippet: `
  async function getNotionEntries(): Promise<NotionPage[]> {
	const response = await notion.databases.query({
	  database_id: databaseId,
	  filter: {
		property: "SendToMochi",
		checkbox: {
		  equals: true,
		},
	  },
	});
	return response.results as NotionPage[];
  }`,
    inputMapping:
      '{"filter": {"property": "SendToMochi", "checkbox": {"equals": true}}}',
    outputMapping: '{"results": [{"id": "page_id", "properties": {...}}]}',
  },
  {
    id: "2",
    title: "Extract Card Data",
    endpoint: "internal/extract-data",
    order: 2,
    codeSnippet: `
  function extractCardData(entry: NotionPage): { front: string; back: string } {
	const front = entry.properties.Front.title[0].plain_text;
	const back = entry.properties.Back.rich_text[0].plain_text;
	return { front, back };
  }`,
    inputMapping: '{"entry": {"properties": {"Front": {...}, "Back": {...}}}}',
    outputMapping:
      '{"front": "Card Front Content", "back": "Card Back Content"}',
  },
  {
    id: "3",
    title: "Create Mochi Card",
    endpoint: "cards",
    order: 3,
    codeSnippet: `
  async function createMochiCard(front: string, back: string): Promise<any> {
	const url = \`\${mochiBaseUrl}/cards\`;
	const headers = {
	  "Content-Type": "application/json",
	  Authorization: \`Basic \${Buffer.from(mochiApiKey + ":").toString("base64")}\`,
	};
	const data = {
	  content: \`# \${front}\n---\n\${back}\`,
	  "deck-id": mochiDeckId,
	  "template-id": "YDELNZSu",
	};
	const response = await axios.post(url, data, { headers });
	return response.data;
  }`,
    dataFlow: {
      input:
        '{"content": "# Front\\n---\\nBack", "deck-id": "deck_id", "template-id": "YDELNZSu"}',
      output: '{"id": "card_id", "content": "# Front\\n---\\nBack", ...}',
    },
  },
  {
    id: "4",
    title: "Update Notion Entry",
    endpoint: "pages/{page_id}",
    order: 4,
    codeSnippet: `
  async function updateNotionEntry(pageId: string): Promise<void> {
	await notion.pages.update({
	  page_id: pageId,
	  properties: {
		SendToMochi: { checkbox: false },
	  },
	});
  }`,
    dataFlow: {
      input:
        '{"page_id": "page_id", "properties": {"SendToMochi": {"checkbox": false}}}',
      output:
        '{"id": "page_id", "properties": {"SendToMochi": {"checkbox": false}, ...}}',
    },
  },
];

const sampleVariables = [
  {
    id: "var1",
    name: "user-id",
    defaultValue: "12345",
    description: "The unique identifier for the user",
  },
  {
    id: "var2",
    name: "api-key",
    description: "API key for external service authentication",
  },
  {
    id: "var3",
    name: "max-recommendations",
    defaultValue: "5",
    description: "Maximum number of recommendations to generate",
  },
];

const workflow = {
  title: "Sample Workflow",
  steps: mockWorkflowSteps,
  variables: sampleVariables,
};

export default function WorkflowPage() {
  return (
    <div className="min-h-screen py-12">
      <Workflow initialWorkflow={workflow} />
    </div>
  );
}

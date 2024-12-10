import { describe, expect, it, vi } from "vitest";
import { generateWorkflow } from "./generateWorkflow";


describe('generateWorkflow', () => {
  it('should generate a workflow based on API info and prompt', async () => {
    // mock getApiInfoWithEndpoints query
    vi.mock('./path-to-getApiInfoWithEndpoints', () => ({
      getApiInfoWithEndpoints: vi.fn().mockResolvedValue({
        name: 'Test API',
        baseUrl: 'https://api.test.com',
        version: '1.0',
        endpoints: [
          {
            path: '/users',
            method: 'GET',
            summary: 'Get users',
          },
          {
            path: '/users',
            method: 'POST',
            summary: 'Create user',
          },
        ],
      }),
    }));

    // Mock the generateChatCompletion function
    vi.spyOn(chatCompletionModule, 'generateChatCompletion').mockResolvedValue(`
\`\`\`json
{
  "variables": [
    {
      "id": "userId",
      "name": "User ID",
      "defaultValue": "",
      "description": "The ID of the user to fetch or create"
    }
  ],
  "steps": [
    {
      "id": "step1",
      "apiName": "Test API",
      "endpoint": "/users",
      "method": "GET",
      "order": 1,
      "description": "Fetch user details",
      "inputMapping": "{ \"userId\": \"$.variables.userId\" }",
      "outputMapping": "{ \"user\": \"$.response\" }"
    }
  ]
}
\`\`\`
    `);

    const result = await generateWorkflow(
      'Fetch user details',
      ['test-api-doc-id'],
      'test-user-id',
      'Test Workflow'
    );

    expect(result).toEqual({
      title: 'Test Workflow',
      variables: [
        {
          id: 'userId',
          name: 'User ID',
          defaultValue: '',
          description: 'The ID of the user to fetch or create',
        },
      ],
      steps: [
        {
          id: 'step1',
          apiName: 'Test API',
          endpoint: '/users',
          method: 'GET',
          order: 1,
          description: 'Fetch user details',
          inputMapping: '{ "userId": "$.variables.userId" }',
          outputMapping: '{ "user": "$.response" }',
        },
      ],
    });
  });

  // Add more tests for error cases, different prompts, etc.
});

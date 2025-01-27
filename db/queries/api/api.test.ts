import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db } from "@/db/db";
import { apiDocumentations, apiEndpoints } from "@/db/schema/apis";
import { eq } from 'drizzle-orm';
import { getApiInfoWithEndpoints } from './api';

describe('getApiInfoWithEndpoints', () => {
  beforeEach(async () => {
    await db.insert(apiDocumentations).values({
      id: 'test-api-doc-id',
      name: 'Test API',
      baseUrl: 'https://api.test.com',
      version: '1.0',
      content: 'Test API content',
      createdBy: 'test-user-id',
    });

    await db.insert(apiEndpoints).values([
      {
        id: 'test-endpoint-1',
        apiDocumentationId: 'test-api-doc-id',
        path: '/users',
        method: 'GET',
        summary: 'Get users',
      },
      {
        id: 'test-endpoint-2',
        apiDocumentationId: 'test-api-doc-id',
        path: '/users',
        method: 'POST',
        summary: 'Create user',
      },
    ]);
  });

  afterEach(async () => {
    await db.delete(apiEndpoints).where(eq(apiEndpoints.apiDocumentationId, 'test-api-doc-id'));
    await db.delete(apiDocumentations).where(eq(apiDocumentations.id, 'test-api-doc-id'));
  });

  it('should return API info with endpoints', async () => {
    const result = await getApiInfoWithEndpoints('test-api-doc-id');

    expect(result).toEqual({
      name: 'Test API',
      baseUrl: 'https://api.test.com',
      version: '1.0',
      endpoints: [
        {
          path: '/users',
          method: 'GET',
          summary: 'Get users',
          operation: null,
          description: null,
          parameters: null,
          requestBody: null,
          responses: null,
        },
        {
          path: '/users',
          method: 'POST',
          summary: 'Create user',
          operation: null,
          description: null,
          parameters: null,
          requestBody: null,
          responses: null,
        },
      ],
    });
  });

  it('should throw an error for non-existent API doc', async () => {
    await expect(getApiInfoWithEndpoints('non-existent-id')).rejects.toThrow('No API documentation found for id: non-existent-id');
  });
});

import { eq } from "drizzle-orm";
import { db } from "../../db";
import { apiDocumentations, apiEndpoints, InsertApiDocumentation, InsertApiEndpoint, InsertVectorEmbedding, vectorEmbeddings } from "../../schema/apis";

// API DOCUMENTATION
export async function createApiDocumentation(data: InsertApiDocumentation) {
	const [result] = await db.insert(apiDocumentations).values(data).returning();
	return result;
  }

export async function getApiDocumentation(id: string) {
	return await db.select().from(apiDocumentations).where(eq(apiDocumentations.id, id));
}

export async function getApiDocumentationByUrl(url: string) {
	return await db.select().from(apiDocumentations).where(eq(apiDocumentations.baseUrl, url)).limit(1);
  }

export async function getApiEndpoints() {
	return await db.select().from(apiEndpoints);
}

export async function getApiDocumentations() {
	return await db.select().from(apiDocumentations);
}

  

// API ENDPOINT
export async function createApiEndpoint(data: InsertApiEndpoint) {
	const [result] = await db.insert(apiEndpoints).values(data).returning();
	return result;
}

export async function getApiInfoWithEndpoints(apiDocId: string) {
	const result = await db
	  .select({
		apiDoc: apiDocumentations,
		endpoints: apiEndpoints,
	  })
	  .from(apiDocumentations)
	  .leftJoin(apiEndpoints, eq(apiDocumentations.id, apiEndpoints.apiDocumentationId))
	  .where(eq(apiDocumentations.id, apiDocId));
  
	if (result.length === 0) {
	  throw new Error(`No API documentation found for id: ${apiDocId}`);
	}
  
	const apiDoc = result[0].apiDoc;
	const endpoints = result.map(r => r.endpoints).filter(e => e !== null);
  
	return {
		id: apiDoc.id,
		name: apiDoc.name,
		baseUrl: apiDoc.baseUrl,
		version: apiDoc.version,
		endpoints: endpoints.map(endpoint => ({
			id: endpoint.id,
			path: endpoint.path,
			method: endpoint.method,
			operation: endpoint.operation,
			summary: endpoint.summary,
			description: endpoint.description,
			parameters: endpoint.parameters,
			requestBody: endpoint.requestBody,
			responses: endpoint.responses,
	  })),
	};
  }

// VECTOR EMBEDDING
export async function createVectorEmbedding(data: InsertVectorEmbedding) {
	return await db.insert(vectorEmbeddings).values(data).returning();
}

export async function getVectorEmbeddings(apiEndpointId: string) {
	return await db.select().from(vectorEmbeddings).where(eq(vectorEmbeddings.apiEndpointId, apiEndpointId));
}

export async function getVectorEmbedding(id: string) {
	return await db.select().from(vectorEmbeddings).where(eq(vectorEmbeddings.id, id));
}

export async function getApiEndpointsWithEmbeddings(apiDocId: string) {
	return await db
  .select({
	endpoint: apiEndpoints,
	embedding: vectorEmbeddings,
  })
  .from(apiEndpoints)
  .where(eq(apiEndpoints.apiDocumentationId, apiDocId))
  .leftJoin(vectorEmbeddings, eq(apiEndpoints.id, vectorEmbeddings.apiEndpointId));
}

export async function getPublicApiDocumentations() {
	return await db.select().from(apiDocumentations).where(eq(apiDocumentations.isPublic, true));
}

export async function getApiDocumentationsPerUser(userId: string) {
	return await db.select().from(apiDocumentations).where(eq(apiDocumentations.createdBy, userId));
}
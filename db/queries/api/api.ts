import { eq, sql } from "drizzle-orm";
import { db } from "../../db";
import { apiDocumentations, apiEndpoints, InsertApiDocumentation, InsertApiEndpoint } from "../../schema/apis";

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

export async function getPublicApiDocumentations() {  
	return await db.select({ name: apiDocumentations.name, baseUrl: apiDocumentations.baseUrl, version: apiDocumentations.version, lastScrapedAt: apiDocumentations.lastScrapedAt }).from(apiDocumentations).where(sql`${apiDocumentations.isPublic} = true`);
  }
  

export async function getApiDocumentationsPerUser(userId: string) {
	return await db.select().from(apiDocumentations).where(eq(apiDocumentations.createdBy, userId));
}
import { eq } from "drizzle-orm";
import { db } from "../db";
import { apiDocumentations, apiEndpoints, InsertApiDocumentation, InsertApiEndpoint, InsertVectorEmbedding, vectorEmbeddings } from "../schema/apis";

// API DOCUMENTATION
export async function createApiDocumentation(data: InsertApiDocumentation) {
	const [result] = await db.insert(apiDocumentations).values(data).returning();
	return result;
  }


// API ENDPOINT
export async function createApiEndpoint(data: InsertApiEndpoint) {
	const [result] = await db.insert(apiEndpoints).values(data).returning();
	return result;
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
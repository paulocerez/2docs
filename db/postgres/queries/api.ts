import { eq } from "drizzle-orm";
import { db } from "../db";
import { apiEndpoints, vectorEmbeddings } from "../schema/apis";

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
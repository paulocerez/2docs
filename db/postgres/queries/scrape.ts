import { db } from "../db";
import { apiDocumentations, InsertApiDocumentation } from "../schema/api";

export async function createApiDocumentation(data: InsertApiDocumentation) {
	const [result] = await db.insert(apiDocumentations).values(data).returning();
	return result;
  }
import { db } from "../db";
import { apiDocumentations, InsertApiDocumentation } from "../schema/apis";
import { faker } from "@faker-js/faker";

async function insertApiDocumentation(count: number) {
	const batchSize = 5;
	const totalBatches = Math.ceil(count / batchSize);

	console.log(`Inserting ${count} API documentation records...`);

	for (let i = 0; i < totalBatches; i++) {
		const batch: InsertApiDocumentation[] = [];
		for (let j = 0; j < batchSize; j++) {
			const apiDoc: InsertApiDocumentation = {
				name: faker.lorem.word(),
				baseUrl: faker.internet.url(),
				version: "1.0.0",
				content: faker.lorem.paragraph(),
				createdBy: 'be4d08d3-b464-49a3-87e2-ba3b85f543de',
				id: faker.string.uuid(),
			}
			batch.push(apiDoc);
		}
		try {
			await db.insert(apiDocumentations).values(batch);
			console.log(`Inserted batch ${i + 1} of ${totalBatches}`);
		} catch (error) {
			console.error("Batch insert error:", error);
			throw error;
		}
	}
	console.log(`Inserted ${count} API documents`);
} 

async function main() {
	try {
	  await insertApiDocumentation(20);
	  console.log("Insertion complete!");
	  process.exit(0);
	} catch (error) {
	  console.error("Error during insertion:", error);
	  process.exit(1);
	}
  }
  
  main();
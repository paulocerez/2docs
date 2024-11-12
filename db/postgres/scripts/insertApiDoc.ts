import { db } from "../db";
import { apiDocumentations, InsertApiDocumentation } from "../schema/apis";
import { faker } from "@faker-js/faker";

async function insertApiDocumentation(count: number) {
	const batchSize = 1;
	const totalBatches = Math.ceil(count / batchSize);

	console.log(`Inserting ${count} API documentation records...`);

	for (let i = 0; i < totalBatches; i++) {
		const batch: InsertApiDocumentation[] = [];
		for (let j = 0; j < batchSize; j++) {
			const apiDoc: InsertApiDocumentation = {
				name: faker.lorem.word(),
				baseUrl: faker.internet.url(),
				version: faker.lorem.word(),
				content: faker.lorem.paragraph(),
				createdBy: faker.string.uuid(),
			}
			batch.push(apiDoc);
		}
		await db.insert(apiDocumentations).values(batch);
		console.log(`Inserted batch ${i + 1} of ${totalBatches}`);
	}
	console.log(`Inserted ${count} API documents`);
} 

async function main() {
	try {
	  await insertApiDocumentation(1);
	  console.log("Insertion complete!");
	  process.exit(0);
	} catch (error) {
	  console.error("Error during insertion:", error);
	  process.exit(1);
	}
  }
  
  main();
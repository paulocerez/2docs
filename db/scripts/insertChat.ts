import { db } from "../db";
import { faker } from "@faker-js/faker";
import { chats, InsertChat } from "../schema/chats";

async function insertChat(count: number) {
	const batchSize = 50;
	const totalBatches = Math.ceil(count / batchSize);

	console.log(`Inserting ${count} Chat records...`);

	for (let i = 0; i < totalBatches; i++) {
		const batch: InsertChat[] = [];
		for (let j = 0; j < batchSize; j++) {
			const chat: InsertChat = {
				userId: '509e523f-bcf6-45ad-bb74-99f08ad63b0d',
				prompt: faker.lorem.sentence(),
				title: faker.lorem.sentence(),
			}
			batch.push(chat);
		}
		try {
			await db.insert(chats).values(batch);
			console.log(`Inserted batch ${i + 1} of ${totalBatches}`);
		} catch (error) {
			console.error("Batch insert error:", error);
			throw error;
		}
	}
	console.log(`Inserted ${count} chats`);
} 

async function main() {
	try {
	  await insertChat(500);
	  console.log("Insertion complete!");
	  process.exit(0);
	} catch (error) {
	  console.error("Error during insertion:", error);
	  process.exit(1);
	}
  }
  
  main();
import { db } from "../db";
import { faker } from "@faker-js/faker";
import { chats, InsertChat } from "../schema/chats";

async function insertChat(count: number) {
	const batchSize = 1;
	const totalBatches = Math.ceil(count / batchSize);

	console.log(`Inserting ${count} Chat records...`);

	for (let i = 0; i < totalBatches; i++) {
		const batch: InsertChat[] = [];
		for (let j = 0; j < batchSize; j++) {
			const chat: InsertChat = {
				userId: faker.string.uuid(),
				prompt: faker.lorem.sentence(),
				title: faker.lorem.sentence(),
			}
			batch.push(chat);
		}
		await db.insert(chats).values(batch);
		console.log(`Inserted batch ${i + 1} of ${totalBatches}`);
	}
	console.log(`Inserted ${count} chats`);
} 

async function main() {
	try {
	  await insertChat(1);
	  console.log("Insertion complete!");
	  process.exit(0);
	} catch (error) {
	  console.error("Error during insertion:", error);
	  process.exit(1);
	}
  }
  
  main();
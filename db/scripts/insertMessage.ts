import { db } from "../db";
import { faker } from "@faker-js/faker";
import { InsertMessage, messages } from "../schema/chats";

async function insertMessage(count: number) {
	const batchSize = 100;
	const totalBatches = Math.ceil(count / batchSize);

	console.log(`Inserting ${count} message records...`);

	for (let i = 0; i < totalBatches; i++) {
		const batch: InsertMessage[] = [];
		for (let j = 0; j < batchSize; j++) {
			const message: InsertMessage = {
				chatId: '01c5b43c-c090-4b04-80ae-df44aef65bd3',
				content: faker.lorem.sentence(),
				role: faker.helpers.arrayElement(['user', 'assistant']),
			}
			batch.push(message);
		}
		try {
			await db.insert(messages).values(batch);
			console.log(`Inserted batch ${i + 1} of ${totalBatches}`);
		} catch (error) {
			console.error("Batch insert error:", error);
			throw error;
		}
	}
	console.log(`Inserted ${count} messages`);
} 

async function main() {
	try {
	  await insertMessage(5000);
	  console.log("Insertion complete!");
	  process.exit(0);
	} catch (error) {
	  console.error("Error during insertion:", error);
	  process.exit(1);
	}
  }
  
  main();
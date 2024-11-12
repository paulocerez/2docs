import client from "./db";

const COLLECTION_NAME = "api-docs";

export const initializeCollection = async () => {
	await client.createCollection(COLLECTION_NAME, {
		vectors: {
			size: 1536,
			distance: "Cosine",
		},
	});
}
import client from "./db";

export const initializeCollection = async (apiId: string) => {
	await client.createCollection(`api_${apiId}`, {
		vectors: {
			size: 1536,
			distance: "Cosine",
		},
	});
}

export const getCollection = async (apiId: string) => {
	return client.getCollection(`api_${apiId}`);
}

export const listCollections = async () => {
	return client.getCollections();
}
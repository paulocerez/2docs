import client from "./db";

const collectionName = (name: string, apiId: string) => {
	return `api_${name}_${apiId}`;
}

export const initializeCollection = async (name: string, apiId: string) => {
	await client.createCollection(collectionName(name, apiId), {
		vectors: {
			size: 1536,
			distance: "Cosine",
		},
	});
}

export const getCollection = async (name: string, apiId: string) => {
	return client.getCollection(collectionName(name, apiId));
}

export const listCollections = async () => {
	return client.getCollections();
}
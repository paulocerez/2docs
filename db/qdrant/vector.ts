import client from "./db";
interface Vector {
  id: string;
  vector: number[];
  payload: Record<string, any>;
}

export const upsertVectors = async (apiId: string, vectors: Vector[]) => {
	const collectionName = `api_${apiId}`;
	await client.upsert(collectionName, {
	  wait: true,
	  points: vectors,
	});
  };
  
  export const searchVectors = async (apiId: string, vector: number[], limit: number = 10) => {
	const collectionName = `api_${apiId}`;
	return client.search(collectionName, {
	  vector,
	  limit,
	});
  };

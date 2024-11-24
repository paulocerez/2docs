import client from "./db";
interface Vector {
  id: string;
  vector: number[];
  payload: Record<string, any>;
}

export const upsertVectors = async (name: string, apiId: string, vectors: Vector[]) => {
	const collectionName = `api_${name}_${apiId}`;
	await client.upsert(collectionName, {
	  wait: true,
	  points: vectors,
	});
  };
  
  export const searchVectors = async (name: string, apiId: string, vector: number[], limit: number = 10) => {
	const collectionName = `api_${name}_${apiId}`;
	return client.search(collectionName, {
	  vector,
	  limit,
	});
  };

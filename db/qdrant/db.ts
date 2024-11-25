import { QdrantClient } from "@qdrant/js-client-rest";

// const isProduction = process.env.NODE_ENV === "production";

let client: QdrantClient;

// if (isProduction) {
  client = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
  });

// } else {
//   client = new QdrantClient({ 
//     host: "localhost", 
//     port: 6333 
//   });
// }

export default client;
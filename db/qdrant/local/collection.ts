import client from "./local";

export const initializeCollection = async () => {
    await client.createCollection("test-collection", {
        vectors: { size: 4, distance: "Dot" },
    });
};

initializeCollection();
import client from "./local";

async function localQuery() {
    let searchResult = await client.query(
        "test-collection", {
    query: [0.2, 0.1, 0.9, 0.7],
	filter: {
		must: [
			{ key: "city", match: { value: "London" } }
		]
	},
	with_payload: true,
        limit: 3
    });

    console.debug(searchResult.points);
}

localQuery();

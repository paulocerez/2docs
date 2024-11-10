export default function extractNameFromUrl(url: string) {
	return url.split("/")[2];
}

// console.log(extractNameFromUrl("https://www.google.com/"));
// console.log(extractNameFromUrl("https://developers.notion.com/"));
// console.log(extractNameFromUrl("https://developers.hubspot.com/beta-docs/reference/api"));
// console.log(extractNameFromUrl("https://api.qdrant.tech/api-reference"));


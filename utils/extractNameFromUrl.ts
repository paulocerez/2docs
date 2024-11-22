export default function extractNameFromUrl(url: string) {
  if (!url) return "";

  if (url.includes("postman")) {
    return url.split("/")[3];
  }

  if (url.includes("developers")) {
    return url.split("/")[2].split(".")[1];
  }

  return url.split("/")[2];
}

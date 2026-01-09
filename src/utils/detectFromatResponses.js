export function getBodyViewType(contentType) {
  console.log(contentType);
  if (!contentType) return "text";

  if (contentType.includes("application/json")) return "json";
  if (contentType.includes("text/html")) return "html";
  if (contentType.includes("text/plain")) return "text";
  if (
    contentType.includes("application/xml") ||
    contentType.includes("text/xml") ||
    contentType.includes("xml")
  )
    return "xml";

  if (contentType.startsWith("image/") && !contentType.includes("xml")) {
    return "image";
  }

  if (
    contentType === "application/pdf" ||
    contentType.includes("octet-stream")
  ) {
    return "binary";
  }

  return "text";
}

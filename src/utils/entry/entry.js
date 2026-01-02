import { nanoid } from "nanoid";

const getResponseHeaders = (response) => {
  const headers = {};

  for (const [key, value] of response.headers.entries()) {
    headers[key] = value;
  }
  return headers;
};

async function readRawBody(response) {
  const contentType = response.headers.get("content-type");

  const isBinary =
    contentType &&
    (contentType.includes("image/") ||
      contentType.includes("application/pdf") ||
      contentType.includes("application/octet-stream"));

  let raw;

  if (isBinary) {
    raw = await response.arrayBuffer();
  } else {
    raw = await response.text();
  }

  return {
    raw,
    contentType,
  };
}

export const generateEntry = async (time, content, response, error) => {
  const body = response ? await readRawBody(response) : null;

  return {
    id: nanoid(),
    isPinned: false,
    request: {
      method: content.type,
      inputUrl: content.url.inputUrl,
      headers: content.headers || [],
      queryParams: content.url.queryParams,
      finalUrl: content.url.finalUrl,
      body: content.body,
      timestap: Date.now(),
    },
    response: response
      ? {
          status: response.status || 0,
          statusText: response.statusText || "",
          headers: getResponseHeaders(response),
          body,
          time: time,
        }
      : null,
    error,
  };
};

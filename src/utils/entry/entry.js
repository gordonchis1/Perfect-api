const getResponseHeaders = (response) => {
  const headers = {};

  for (const [key, value] of Object.entries(response.headers)) {
    headers[key] = value;
  }
  return headers;
};

const arrayBufferToBase64 = (buffer) => {
  const blob = new Blob([buffer]);
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result.toString().split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

async function readRawBody(response) {
  const contentType = response.headers["content-type"];

  const isBinary =
    contentType &&
    ((contentType.includes("image/") && !contentType.includes("xml")) ||
      contentType.includes("application/pdf") ||
      contentType.includes("application/octet-stream"));

  let raw;

  if (isBinary) {
    const buffer = await response.arrayBuffer();
    const blob = await arrayBufferToBase64(buffer);

    raw = blob;
  } else if (contentType?.includes("application/json")) {
    raw = JSON.parse(response.data);
  } else {
    raw = response.data;
  }

  return {
    raw,
    contentType,
  };
}

export const generateEntry = async (time, content, response, error, id) => {
  const body = response ? await readRawBody(response) : null;

  return {
    id,
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
          cookies: response.cookies,
        }
      : null,
    error,
  };
};

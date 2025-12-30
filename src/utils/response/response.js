const parseReponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return await response.json();
  }

  if (contentType.includes("text/")) {
    return await response.text();
  }

  return await response.arrayBuffer();
};

export const generateResponse = async (time, response, url, queryParams) => {
  const parsedResponse = (await parseReponse(response)) || undefined;
  console.log(parsedResponse);

  return {
    time,
    status: response.status || 0,
    response: parsedResponse,
    headers:
      response === undefined
        ? {}
        : Object.fromEntries(response.headers.entries()),
    url,
    queryParams,
    isPinned: false,
    inputUrl: url,
  };
};

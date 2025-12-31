import { nanoid } from "nanoid";

export const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return await response.json();
  }

  if (contentType.includes("text/")) {
    return await response.text();
  }

  return await response.arrayBuffer();
};

export const generateResponse = async (
  content,
  time,
  url,
  queryParams,
  parsedResponse
) => {
  console.log(content);

  return {
    id: nanoid(),
    isPinned: false,
    request: {
      method: "GET",
      url: url,
      headers: [],
      queryParams: [],
      finalUrl: "",
      body: { type: "json", raw: "" },
      timestap: Date.now(),
    },
    response: {
      status: 202,
      statusText: "",
      headers: {},
      body: { raw: "", contentType: "json" },
      time: time,
    },
    error: {
      type: "",
      message: "",
    },
  };
};

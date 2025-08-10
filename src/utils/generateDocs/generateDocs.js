const title = (format, title) => {
  switch (format) {
    case "markdown":
      return `# ${title}`;
  }
};

const baseUrl = (format, url) => {
  let baseUrl;
  try {
    const urlObject = new URL(url);
    baseUrl = urlObject.origin + "/";
  } catch {
    baseUrl = "undefined";
  }

  switch (format) {
    case "markdown":
      return `**Base URL**: \`${baseUrl}\``;
  }
};

const subtitle = (format, url) => {
  switch (format) {
    case "markdown":
      return `## ${url}`;
  }
};

const methodType = (format, method) => {
  switch (format) {
    case "markdown":
      return `- 🔧 **HTTP Method**: ${method}`;
  }
};

const description = (format, description) => {
  switch (format) {
    case "markdown":
      return `### Descripcion \n\n ${description || "Agrega una descripcion"}`;
  }
};
const headers = (format, headers) => {
  const parseHeaders = JSON.stringify(headers, null, 2);

  switch (format) {
    case "markdown":
      if (headers.length !== 0) {
        return `- 📬 **Headers:**\n\n    \`\`\`json\n${parseHeaders
          .split("\n")
          .map((line) => "    " + line)
          .join("\n")}\n    \`\`\``;
      }
      return "";
  }
};
const queryParams = (format, queryParams) => {
  let formatParams = ``;

  queryParams.forEach((param) => {
    if (param.isActive) {
      formatParams += `  - **${param.key}**: ${param.value}\n`;
    }
  });

  switch (format) {
    case "markdown":
      if (queryParams.length !== 0) {
        return `- 🔎 **Query params**\n${formatParams}`;
      }
      return "";
  }
};

const response = (format, response) => {
  let parsedResponse = "";

  try {
    parsedResponse = JSON.stringify(response, null, 2);
  } catch {
    parsedResponse = String(response);
  }

  switch (format) {
    case "markdown":
      return `- **✅ Respuesta**  \n  \`\`\`json\n${parsedResponse
        .split("\n")
        .map((line) => "    " + line)
        .join("\n")} 
 \`\`\``;
  }
};

export const generateDocsStructure = (responseData, fileData) => {
  // Retener la ultima descripcion
  return {
    name: fileData.name,
    url: responseData.url,
    description: "",
    headers: responseData?.headers || [],
    method: fileData.type,
    queryParams: responseData?.queryParams || [],
    config: {},
  };
};

export const generateDocs = (content, lastReponse) => {
  return `
${title("markdown", content.name)}

${baseUrl("markdown", content.url)}

---

${subtitle("markdown", content.url)}

${description("markdown", content.description)}

${methodType("markdown", content.method)}

${headers("markdown", content.headers)}

${queryParams("markdown", content.queryParams)}

${response("markdown", lastReponse)}
  `;
};

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

const description = (format, description = "Agreaga una descripcion") => {
  switch (format) {
    case "markdown":
      return `### Descripcion \n\n ${description}`;
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
      return `- **✅ Respuesta**  \n \`\`\`json\n${parsedResponse
        .split("\n")
        .map((line) => "    " + line)
        .join("\n")}\n    \`\`\``;
  }
};

export const generateDocs = (content) => {
  return `
${title("markdown", content.name)}
  \n
${baseUrl("markdown", content.url)}
  \n
---
  \n
${subtitle("markdown", content.url)}
  \n
${description("markdown", content.description)}
  \n
${methodType("markdown", content.method)}
  \n
${headers("markdown", content.headers)}
  \n
${queryParams("markdown", content.queryParams)}
  \n
${response("markdown", content.response)}
  `;
};

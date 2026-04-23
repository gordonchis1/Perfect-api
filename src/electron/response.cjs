
const getResponseHeaders = (response) => {
    const headers = {};

    for (const [key, value] of Object.entries(response.headers.toJSON())) {
        headers[key] = value;
    }
    return headers;
};

const arrayBufferToBase64 = (buffer) => {
    return Buffer.from(buffer).toString('base64');
};

async function readRawBody(response) {
    const contentType = response?.headers?.['content-type'] || '';

    const isBinary =
        (contentType.includes("image/") && !contentType.includes("xml")) ||
        contentType.includes("application/pdf") ||
        contentType.includes("application/octet-stream");

    let raw;

    if (isBinary) {
        raw = arrayBufferToBase64(response.data);

        return {
            raw,
            contentType,
            type: "binary",
        };
    }

    const text =
        typeof response.data === "string"
            ? response.data
            : Buffer.from(response.data).toString("utf-8");

    const isJson =
        contentType.includes("application/json")

    if (isJson) {
        try {
            raw = JSON.parse(text);
            return {
                raw,
                contentType,
                type: "json",
            };
        } catch (e) {
            raw = text;
            return {
                raw,
                contentType,
                type: "text",
            };
        }
    }
    raw = text;

    const isHtml = contentType.includes("text/html");

    return {
        raw,
        contentType,
        type: isHtml ? "html" : "text",
    };
}

const generateResponse = async (response, error, time, cookies) => {
    const body = response ? await readRawBody(response) : null;

    return {
        response: response
            ? {
                cookies,
                status: response.status || 0,
                statusText: response.statusText || "",
                headers: getResponseHeaders(response),
                body,
                time
            }
            : null,
        error,
    };
}

exports.generateResponse = generateResponse 

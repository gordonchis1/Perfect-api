export const detectFormat = (response) => {
  try {
    if (
      typeof response === "object" &&
      response !== null &&
      (Array.isArray(response) ||
        Object.prototype.toString.call(response) === "[object Object]")
    ) {
      return "json";
    }
  } catch {
    // No es JSON válido
  }

  const isProbablyHTML = /<\/?[a-z][\s\S]*>/i.test(String(response).trim());

  if (isProbablyHTML) {
    const doc = new DOMParser().parseFromString(response, "text/html");

    const hasElements = Array.from(doc.body.childNodes).some(
      (node) => node.nodeType === 1
    );

    if (hasElements) {
      return "html";
    }
  }

  return "text";
};

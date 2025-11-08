export function isImageUrl(url) {
  return /\.(png|jpe?g|gif|webp|svg|bmp|ico)$/i.test(url);
}

export function replaceImageSize(url, width, height) {
  if (typeof url !== "string") return url;

  const patrones = [
    { regex: /\{w\}x\{h\}/gi, reemplazo: `${width}x${height}` },
    {
      regex: /=[wh](\d+)(-[wh](\d+))?/gi,
      reemplazo: `=w${width}-h${height}`,
    },
    { regex: /=s\d+/gi, reemplazo: `=s${Math.max(width, height)}` },
    { regex: /__w-\d+__/gi, reemplazo: `__w-${width}__` },
    { regex: /\{width\}x\{height\}/gi, reemplazo: `${width}x${height}` },
    { regex: /\{w\}/gi, reemplazo: `${width}` },
    { regex: /\{h\}/gi, reemplazo: `${height}` },
  ];

  let nuevaURL = url;
  for (const { regex, reemplazo } of patrones) {
    nuevaURL = nuevaURL.replace(regex, reemplazo);
  }

  return nuevaURL;
}

export const findLinks = (json) => {
  const links = [];
  const search = (obj) => {
    if (typeof obj === "string") {
      const urlRegex = /(https?:\/\/[^\s"']+)/g;
      const found = obj.match(urlRegex);
      if (found) links.push(...found);
    } else if (Array.isArray(obj)) {
      for (let item of obj) search(item);
    } else if (typeof obj === "object" && obj !== null) {
      for (const key in obj) search(obj[key]);
    }
  };

  search(json);

  return links;
};

import { useEffect, useState } from "react";
import { replaceImageSize } from "../utils/findLinks";

export default function useGetMediaInfo(ref, type, url) {
  const [info, setInfo] = useState({
    width: 0,
    height: 0,
    supportDynamicSize: false,
    duration: null,
    size: "",
    aspectRatio: "",
  });

  useEffect(() => {
    if (!ref?.current || type !== "img") return;
    const domMedia = ref.current;

    const handleLoad = async () => {
      let size = info.size;
      try {
        const response = await fetch(domMedia.src, { method: "HEAD" });
        const length = response.headers.get("Content-Length");
        if (length) size = `${(length / 1024).toFixed(2)} KB`;
      } catch (e) {
        console.error(e);
      }

      const width = domMedia.naturalWidth;
      const height = domMedia.naturalHeight;

      const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
      const divisor = gcd(width, height);
      const ratioW = width / divisor;
      const ratioH = height / divisor;

      setInfo({
        ...info,
        width,
        height,
        supportDynamicSize:
          url !== replaceImageSize(url, 200, 200) ? true : false,
        duration: null,
        size,
        aspectRatio: `${ratioW}:${ratioH}`,
      });
    };

    if (domMedia.complete) {
      handleLoad();
    } else {
      domMedia.addEventListener("load", handleLoad);
    }

    return () => {
      domMedia.removeEventListener("load", handleLoad);
    };
  }, [ref, type, url]);

  return info;
}

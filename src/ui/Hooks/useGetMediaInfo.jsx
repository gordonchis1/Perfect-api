import { useEffect, useState } from "react";
import { replaceImageSize } from "../utils/findLinks";
import { formatDuration } from "../utils/formatTime";

const getAspectRatio = (width, height) => {
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  const ratioW = width / divisor;
  const ratioH = height / divisor;

  return [ratioW, ratioH];
};

const getFileSize = async (url) => {
  try {
    const response = await fetch(replaceImageSize(url, 800, 800), {
      method: "HEAD",
    });
    const length = response.headers.get("Content-Length");
    if (length) return `${(length / 1024).toFixed(2)} KB`;
  } catch (error) {
    console.error(error);
  }
};

export default function useGetMediaInfo(ref, type, url, idx) {
  const [info, setInfo] = useState({
    width: 0,
    height: 0,
    supportDynamicSize: false,
    duration: null,
    size: "",
    aspectRatio: "",
  });

  useEffect(() => {
    if (!ref?.current) return;
    const domMedia = ref.current;

    if (type == "img") {
      const handleLoadImage = async () => {
        let size = await getFileSize(url);

        const width = domMedia.naturalWidth;
        const height = domMedia.naturalHeight;

        const [ratioW, ratioH] = getAspectRatio(width, height);

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
        handleLoadImage();
      } else {
        domMedia.addEventListener("load", handleLoadImage);
      }

      return () => {
        domMedia.removeEventListener("load", handleLoadImage);
      };
    }

    if (type == "vid") {
      const handleLoadVideo = async () => {
        const size = await getFileSize(url);
        const width = domMedia.videoWidth;
        const height = domMedia.videoHeight;
        const [ratioW, ratioH] = getAspectRatio(width, height);
        setInfo({
          ...info,
          width,
          height,
          aspectRatio: `${ratioW}:${ratioH}`,
          size,
          duration: formatDuration(domMedia.duration),
        });
      };

      if (domMedia.readyState >= 1) handleLoadVideo();
      else domMedia.addEventListener("loadedmetadata", handleLoadVideo);

      return () => {
        domMedia.removeEventListener("loadedmetadata", handleLoadVideo);
      };
    }
  }, [idx, url]);

  return info;
}

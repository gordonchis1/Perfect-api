import { useEffect, useRef, useState } from "react";
import "./WorkspacePreviewJsonStringComponent.css";

const defaultPreviewImageState = {
  x: 0,
  y: 0,
  show: false,
};

export default function WorkspacePreviewJsonStringComponent({ value, rest }) {
  const stringImageCotnainer = useRef(null);
  const [previewImage, setPreviewImage] = useState(defaultPreviewImageState);
  const previewImageContainer = useRef(null);

  const processImgUrl = (url, width, height) => {
    const w = width.toString();
    const h = height.toString();

    if (url.includes("{w}") && url.includes("{h}")) {
      return url.replace("{w}", w).replace("{h}", h);
    }

    if (url.includes("?")) {
      const urlObj = new URL(url);
      if (urlObj.searchParams.has("w") || urlObj.searchParams.has("width")) {
        urlObj.searchParams.set("w", w);
        urlObj.searchParams.set("width", w);
      }
      if (urlObj.searchParams.has("h") || urlObj.searchParams.has("height")) {
        urlObj.searchParams.set("h", h);
        urlObj.searchParams.set("height", h);
      }
      return urlObj.toString();
    }

    const resizeRegex = /\/resize\/\d+x\d+\//;
    if (resizeRegex.test(url)) {
      return url.replace(resizeRegex, `/resize/${w}x${h}/`);
    }

    if (!url.includes("?")) {
      return `${url}?w=${w}&h=${h}`;
    }

    return url;
  };

  const handleOnMouseEnter = () => {
    const onMouseMove = (event) => {
      const { clientY, clientX } = event;
      setPreviewImage({ show: true, x: clientX, y: clientY });
    };

    document.addEventListener("mousemove", onMouseMove);

    const onMouseLeave = () => {
      setPreviewImage(defaultPreviewImageState);
      document.removeEventListener("mousemove", onMouseMove);
      stringImageCotnainer.current.removeEventListener(
        "mouseleave",
        onMouseLeave
      );
    };

    stringImageCotnainer.current.addEventListener("mouseleave", onMouseLeave);
  };

  return (
    <div
      className="json-preview_string-image-component-container"
      onMouseEnter={handleOnMouseEnter}
      ref={stringImageCotnainer}
    >
      {previewImage.show && (
        <div
          className="string-image_image-preview-container"
          ref={previewImageContainer}
          style={{
            left: `${
              previewImage.x - previewImageContainer.current?.clientWidth / 2
            }px`,
            top: `${previewImage.y + 17}px`,
          }}
        >
          <img
            src={processImgUrl(value, 100, 100)}
            alt={value}
            className="image-preview_image"
          />
          <span>Image preview</span>
        </div>
      )}

      <span {...rest}>"{value}"</span>
      <img src={processImgUrl(value, 40, 40)} height={"40"} width={"40"} />
    </div>
  );
}

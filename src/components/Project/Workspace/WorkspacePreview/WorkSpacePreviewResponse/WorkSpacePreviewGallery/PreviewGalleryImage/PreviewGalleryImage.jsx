import { useEffect, useRef, useState } from "react";
import "./PreviewGalleryImage.css";
import PreviewGalleryImageHover from "./PreviewGalleryImageHover/PreviewGalleryImageHover";

export default function PreviewGalleryImage({ img }) {
  const imgRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [size, setSize] = useState({ width: null, height: null });

  useEffect(() => {
    const domImg = imgRef.current;
    if (!domImg) return;

    const handleLoad = () => {
      setSize({ width: domImg.naturalWidth, height: domImg.naturalHeight });
    };

    if (domImg.complete) {
      handleLoad();
    } else {
      domImg.addEventListener("load", handleLoad);
    }

    return () => domImg.removeEventListener("load", handleLoad);
  }, [img]);

  return (
    <button
      key={img}
      className="gallery-container_button"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img src={img} className="gallery-container_img" ref={imgRef}></img>
      {isHover && <PreviewGalleryImageHover img={img} size={size} />}
    </button>
  );
}

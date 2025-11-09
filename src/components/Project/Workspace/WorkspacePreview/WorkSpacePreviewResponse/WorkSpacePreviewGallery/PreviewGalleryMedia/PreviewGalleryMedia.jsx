import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import PreviewGalleryImage from "../PreviewGalleryImage/PreviewGalleryImage";
import PreviewGalleryVideo from "../PreviewGalleryVideo/PreviewGalleryVideo";
import "./PreviewGalleryMedia.css";
import PreviewGalleryImageHover from "./PreviewGalleryImageHover/PreviewGalleryImageHover";
import { formatDuration } from "../../../../../../../utils/formatTime";

export default function PreviewGalleryMedia({ media }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [size, setSize] = useState({
    width: null,
    height: null,
    duration: null,
  });
  const imgRef = useRef(null);
  const vidRef = useRef(null);

  const handleOnMouseEnter = () => {
    const domImg = imgRef.current;
    const domVid = vidRef.current;

    if (media.type === "img") {
      setSize({
        width: domImg.naturalWidth,
        height: domImg.naturalHeight,
        duration: null,
      });
    } else {
      setSize({
        width: domVid.videoWidth,
        height: domVid.videoHeight,
        duration: formatDuration(domVid.duration),
      });
    }

    setIsHover(true);
  };

  return (
    <>
      {isOpen && (
        <div className="gallery-img-view_wrapper">
          <div className="img-view_container">
            <header className="img-view_header">
              <div className="img-view_header-url">{media.url}</div>
              <button
                onClick={() => setIsOpen(false)}
                className="img-view_close-button"
              >
                <X size={40} />
              </button>
            </header>
            <div className="img-view_image-container">
              <img src={media.url} />
            </div>
            <div className="img-view_options-container"></div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(true)}
        className="gallery-container_button"
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={() => setIsHover(false)}
      >
        {media.type === "img" ? (
          <PreviewGalleryImage
            url={media.url}
            key={media.url}
            imgRef={imgRef}
          />
        ) : (
          <PreviewGalleryVideo
            url={media.url}
            key={media.url}
            vidRef={vidRef}
          />
        )}
        {isHover && <PreviewGalleryImageHover img={media.url} size={size} />}
      </button>
    </>
  );
}

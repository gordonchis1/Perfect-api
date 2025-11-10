import "./PreviewGalleryView.css";
import { useState } from "react";
import GalleryViewHeader from "./GalleryViewHeader/GalleryViewHeader";

export default function PreviewGalleryView({
  media,
  setIsOpen,
  currentIdx,
  mediaArr,
}) {
  const [idx, setIdx] = useState(currentIdx);

  return (
    <div className="gallery-img-view_wrapper">
      <div className="img-view_container">
        <GalleryViewHeader
          idx={idx}
          mediaArr={mediaArr}
          setIsOpen={setIsOpen}
        />
        <div className="img-view_image-container">
          <button
            onClick={() => {
              if (idx - 1 < 0) return;
              setIdx(idx - 1);
            }}
          >
            prev
          </button>
          {mediaArr[idx].type == "img" ? (
            <img src={mediaArr[idx].url} className="img-view_img" />
          ) : (
            <video
              controls={true}
              src={mediaArr[idx].url}
              autoPlay={true}
              loop
              className="img-view_video"
            />
          )}
          <button
            onClick={() => {
              if (idx + 1 > mediaArr.length - 1) return;
              setIdx(idx + 1);
            }}
          >
            next
          </button>
        </div>
        <div className="img-view_options-container"></div>
      </div>
    </div>
  );
}

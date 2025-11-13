import "./PreviewGalleryView.css";
import { useRef, useState } from "react";
import GalleryViewHeader from "./GalleryViewHeader/GalleryViewHeader";
import { replaceImageSize } from "../../../../../../../../utils/findLinks";
import GalleryViewOptions from "./GalleryViewOptions/GalleryViewOptions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GalleryViewControl from "./GalleryViewControl/GalleryViewControl";
import useGetMediaInfo from "../../../../../../../../Hooks/useGetMediaInfo";

export default function PreviewGalleryView({
  setIsOpen,
  currentIdx,
  mediaArr,
}) {
  const [idx, setIdx] = useState(currentIdx);
  const mediaRef = useRef(null);
  const info = useGetMediaInfo(
    mediaRef,
    mediaArr[currentIdx].type,
    mediaArr[currentIdx].url,
    idx
  );

  return (
    <div className="gallery-img-view_wrapper">
      <div className="img-view_container">
        <GalleryViewHeader
          idx={idx}
          mediaArr={mediaArr}
          setIsOpen={setIsOpen}
        />
        <div className="img-view_image-container">
          <GalleryViewControl
            onClick={() => {
              if (idx - 1 < 0) return;
              setIdx(idx - 1);
            }}
            icon={<ChevronLeft size={50} />}
            type={"prev"}
            idx={idx}
            mediaArr={mediaArr}
          />
          {mediaArr[idx].type == "img" ? (
            <img
              src={replaceImageSize(mediaArr[idx].url, 800, 800)}
              className="img-view_img"
              ref={mediaRef}
            />
          ) : (
            <video
              ref={mediaRef}
              controls={true}
              src={mediaArr[idx].url}
              autoPlay={true}
              loop
              className="img-view_video"
            />
          )}
          <GalleryViewControl
            icon={<ChevronRight size={50} />}
            onClick={() => {
              if (idx + 1 > mediaArr.length - 1) return;
              setIdx(idx + 1);
            }}
            type={"next"}
            mediaArr={mediaArr}
            idx={idx}
          />
        </div>
        <GalleryViewOptions
          info={info}
          type={mediaArr[idx].type}
          url={mediaArr[idx].url}
          mediaArr={mediaArr}
          idx={idx}
        />
      </div>
    </div>
  );
}

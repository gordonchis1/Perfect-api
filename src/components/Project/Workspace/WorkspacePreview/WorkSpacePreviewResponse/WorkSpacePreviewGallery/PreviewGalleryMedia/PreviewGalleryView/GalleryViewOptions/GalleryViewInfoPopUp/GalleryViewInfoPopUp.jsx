import { useRef } from "react";
import "./GalleryViewInfoPopUp.css";
import useClickAway from "../../../../../../../../../../Hooks/useClickAway";
import { replaceImageSize } from "../../../../../../../../../../utils/findLinks";
import GalleryInfoProp from "./GalleryInfoProp/GalleryInfoProp";
import GalleryInfoCode from "./GalleryInfoCode/GalleryInfoCode";

export default function GalleryViewInfoPopUp({
  infoIsOpen,
  setInfoIsOpen,
  url,
  media,
  info,
}) {
  const containerRef = useRef(null);
  useClickAway(containerRef, () => setInfoIsOpen(false));

  return (
    <>
      {infoIsOpen && (
        <div className="gallery-view_info-wrapper">
          <div className="gallery-view_info-container" ref={containerRef}>
            <div className="gallery-view-info_img-preview">
              {media.type == "img" ? (
                <img src={replaceImageSize(url, 100, 100)} />
              ) : (
                <video loop src={media.url} autoPlay={true}></video>
              )}
            </div>
            <div className="view-info_props-container">
              <GalleryInfoProp propKey={"URL"} propValue={url} />
              <GalleryInfoProp
                propKey={"Width"}
                propValue={`${info.width}px`}
              />
              <GalleryInfoProp
                propKey={"Height"}
                propValue={`${info.height}px`}
              />
              <GalleryInfoProp
                propKey={"Aspect Ratio"}
                propValue={info.aspectRatio}
              />
              <GalleryInfoProp propKey={"Size"} propValue={info.size} />
              <GalleryInfoProp
                propKey={"Dynamic size support"}
                propValue={String(info.supportDynamicSize)}
              />
              {info.duration && (
                <GalleryInfoProp
                  propKey={"Duration"}
                  propValue={info.duration}
                />
              )}
              <GalleryInfoCode url={url} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

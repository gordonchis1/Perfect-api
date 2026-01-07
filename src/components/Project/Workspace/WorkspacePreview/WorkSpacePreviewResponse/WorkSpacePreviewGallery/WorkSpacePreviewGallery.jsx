import { useEffect, useState } from "react";
import {
  findLinks,
  isImageUrl,
  isVideoUrl,
} from "../../../../../../utils/findLinks";
import "./WorkSpacePreviewGallery.css";
import PreviewGalleryMedia from "./PreviewGalleryMedia/PreviewGalleryMedia";
import useCurrentEntry from "../../../../../../Hooks/useCurrentEntry";

export default function WorkSpacePreviewGallery() {
  const [media, setMedia] = useState([]);
  const currentEntry = useCurrentEntry();

  useEffect(() => {
    const response = currentEntry?.response?.body?.raw || "{}";

    const links = findLinks(response);

    const mediaArr = [];

    links.forEach((link) => {
      if (isImageUrl(link)) {
        mediaArr.push({ url: link, type: "img" });
      } else if (isVideoUrl(link)) mediaArr.push({ url: link, type: "vid" });
    });

    setMedia(Array.from(new Set(mediaArr)));
  }, [currentEntry]);

  return (
    <div className="workspace-preview_gallery-container custom-scroll-bar">
      {media.length != 0 ? (
        media.map((mediaElement, index) => {
          return (
            <PreviewGalleryMedia
              media={mediaElement}
              key={media.url}
              mediaArr={media}
              currentIdx={index}
            />
          );
        })
      ) : (
        <div className="workspace-preview_gallery-no-media">
          <h1>No media in the response</h1>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import useWorkspacePreviewContext from "../../../../../../Hooks/useWorkspacePreviewContext";
import {
  findLinks,
  isImageUrl,
  isVideoUrl,
} from "../../../../../../utils/findLinks";
import "./WorkSpacePreviewGallery.css";
import PreviewGalleryMedia from "./PreviewGalleryMedia/PreviewGalleryMedia";

export default function WorkSpacePreviewGallery() {
  const [workspacePreviewContext] = useWorkspacePreviewContext();
  const [media, setMedia] = useState(undefined);

  useEffect(() => {
    const response =
      workspacePreviewContext.responses[
        workspacePreviewContext.currentResponseIdx
      ];

    const links = findLinks(response);

    const mediaArr = [];

    links.forEach((link) => {
      if (isImageUrl(link)) {
        mediaArr.push({ url: link, type: "img" });
      } else if (isVideoUrl(link)) mediaArr.push({ url: link, type: "vid" });
    });

    setMedia(Array.from(new Set(mediaArr)));
  }, [workspacePreviewContext.currentResponseIdx, workspacePreviewContext]);

  return (
    <div className="workspace-preview_gallery-container custom-scroll-bar">
      {media !== undefined &&
        media.map((mediaElement, index) => {
          return (
            <PreviewGalleryMedia
              media={mediaElement}
              key={media.url}
              mediaArr={media}
              currentIdx={index}
            />
          );
        })}
    </div>
  );
}

import { useEffect, useState } from "react";
import useWorkspacePreviewContext from "../../../../../../Hooks/useWorkspacePreviewContext";
import {
  findLinks,
  isImageUrl,
  isVideoUrl,
} from "../../../../../../utils/findLinks";
import "./WorkSpacePreviewGallery.css";
import { replaceImageSize } from "../../../../../../utils/findLinks";
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
        mediaArr.push({ url: replaceImageSize(link, 200, 200), type: "img" });
      } else if (isVideoUrl(link)) mediaArr.push({ url: link, type: "vid" });
    });

    setMedia(mediaArr);
  }, [workspacePreviewContext.currentResponseIdx, workspacePreviewContext]);

  return (
    <div className="workspace-preview_gallery-container custom-scroll-bar">
      {media !== undefined &&
        media.map((mediaElement) => {
          return <PreviewGalleryMedia media={mediaElement} key={media.url} />;
        })}
    </div>
  );
}

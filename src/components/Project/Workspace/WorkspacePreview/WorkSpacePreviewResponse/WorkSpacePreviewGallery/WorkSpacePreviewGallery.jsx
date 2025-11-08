import { useEffect, useState } from "react";
import useWorkspacePreviewContext from "../../../../../../Hooks/useWorkspacePreviewContext";
import { findLinks } from "../../../../../../utils/findLinks";
import "./WorkSpacePreviewGallery.css";
import {
  isImageUrl,
  replaceImageSize,
} from "../../../../../../utils/findLinks";
import PreviewGalleryImage from "./PreviewGalleryImage/PreviewGalleryImage";

export default function WorkSpacePreviewGallery() {
  const [workspacePreviewContext] = useWorkspacePreviewContext();
  const [images, setImages] = useState(undefined);

  useEffect(() => {
    const response =
      workspacePreviewContext.responses[
        workspacePreviewContext.currentResponseIdx
      ];

    const links = findLinks(response);

    const imgs = [];

    links.forEach((link) => {
      if (isImageUrl(link)) {
        imgs.push(replaceImageSize(link, 200, 200));
      }
    });

    setImages(imgs);
  }, [workspacePreviewContext]);

  return (
    <div className="workspace-preview_gallery-container custom-scroll-bar">
      {images !== undefined &&
        images.map((img) => {
          return <PreviewGalleryImage img={img} key={img} />;
        })}
    </div>
  );
}

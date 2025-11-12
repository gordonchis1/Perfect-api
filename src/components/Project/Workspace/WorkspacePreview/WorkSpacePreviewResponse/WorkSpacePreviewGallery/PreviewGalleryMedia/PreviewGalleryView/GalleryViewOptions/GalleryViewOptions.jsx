import { fetch } from "@tauri-apps/plugin-http";
import "./GalleryViewOptions.css";
import { Download, Info } from "lucide-react";
import GalleryViewOption from "./GalleryViewOption/GalleryViewOption";
import { replaceImageSize } from "../../../../../../../../../utils/findLinks";
import { useState } from "react";

export default function GalleryViewOptions({ url }) {
  const [infoIsOpen, setInfoIsOpen] = useState(false);

  const handleDownloadMedia = async () => {
    try {
      const response = await fetch(replaceImageSize(url, 800, 800), {
        mode: "cors",
      });
      const blob = await response.blob();

      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = url;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch {
      console.log("Error downloading the image");
    }
  };

  return (
    <>
      {infoIsOpen && <div className="gallery-view_info-wrapper"></div>}
      <div className="img-view_options-wrapper">
        <div className="img-view_options-container">
          <GalleryViewOption
            icon={<Download size={30} />}
            onClick={handleDownloadMedia}
          />
          <GalleryViewOption
            icon={<Info size={30} onClick={() => setInfoIsOpen(true)} />}
          />
        </div>
      </div>
    </>
  );
}

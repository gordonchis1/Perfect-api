import { X } from "lucide-react";
import "./GalleryViewHeader.css";

export default function GalleryViewHeader({ mediaArr, idx, setIsOpen }) {
  return (
    <header className="img-view_header">
      <div className="img-view_header-count">
        {mediaArr.length}/{idx + 1}
      </div>
      <div className="img-view_header-url">{mediaArr[idx].url}</div>
      <button
        onClick={() => setIsOpen(false)}
        className="img-view_close-button"
      >
        <X size={40} />
      </button>
    </header>
  );
}

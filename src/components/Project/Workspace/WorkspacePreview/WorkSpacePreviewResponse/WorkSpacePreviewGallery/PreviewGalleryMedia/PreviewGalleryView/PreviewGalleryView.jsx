import { X } from "lucide-react";
import "./PreviewGalleryView.css";

export default function PreviewGalleryView({ media, setIsOpen }) {
  return (
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
          {media.type == "img" ? (
            <img src={media.url} />
          ) : (
            <video controls={true} src={media.url} autoPlay={true} loop />
          )}
        </div>
        <div className="img-view_options-container"></div>
      </div>
    </div>
  );
}

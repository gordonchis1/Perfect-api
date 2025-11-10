import "./PreviewGalleryImage.css";

export default function PreviewGalleryImage({ url, imgRef, onClick }) {
  return (
    <img
      src={url}
      className="gallery-container_img"
      ref={imgRef}
      onClick={onClick}
    ></img>
  );
}
